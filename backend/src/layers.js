import express from 'express';

import multer from 'multer';
import fs from 'fs';

import connection from '../db_connection.js';

import request from 'request-promise-native';

const router = express.Router();

// router.get('/:layerName', (req, res)=>{
//     const data = fs.readFileSync(`./data/labeling_data/${req.params.layerName}.json`,'utf-8');

//     return res.json(JSON.parse(data));
// });


async function getLayergroupId(uuid,layergroup_name){
    const query = {
        name: 'get-layergroup-id',
        text: `
            SELECT layergroup_id FROM public.layergroups WHERE layergroup_name = $1 AND layergroup_owner = $2;`,
        values: [layergroup_name, uuid]
    };
    try{
        const res = await connection.query(query);
        return res.rows[0].layergroup_id;
    }
    catch(err){
        console.log(`Get Layergroup ID error \nID : ${uuid}\nLayergroup Name : ${layergroup_name}`);
        throw err;
    }   
}

async function addLayer(layergroup_id, uuid, layer){
    const query = {
        name: 'add-layer',
        text: `
            INSERT INTO public.layers(
            layer_name, 
            layer_description, 
            layer_owner, 
            layer_feature_type, 
            layer_time,
            layer_layergroup)
            VALUES ($1, $2, $3, $4, TO_TIMESTAMP($5, 'YYYY-MM-DD'), $6)
            RETURNING layer_id;`,
        values: [
            layer.layerName,
            layer.layerDescription,
            uuid,
            layer.featureType,
            layer.date,
            layergroup_id
        ]
    };
    try{
        const res = await connection.query(query);
        return res.rows[0].layer_id;
    }
    catch(err){
        console.log('Add Layer Error');
        console.log(`ID : ${uuid}\nLayergroup Name : ${layergroup_id}\nLayer\n`);
        console.log(layer);
        throw err;
    }
}

async function addFeature(layer_id, feature){
    const query = {
        name: 'add-feature',
        text: `
            INSERT INTO public.features(
            layer_id, information, geometry_data)
            VALUES ($1,$2, ST_GeomFromGeoJSON($3));`,
        values: [layer_id,JSON.stringify(feature.properties),JSON.stringify(feature.geometry)]
    };
    try{       
        await connection.query(query);
    }
    catch(err){
        console.log('Add Feature Error');
        console.log(`ID : ${layer_id}\nFeature\n`);
        console.log(feature);
        throw err;
    }    
}

async function addImage(layer_id, image_dir){
    const query = {
        name: 'add-image',
        text: `
            INSERT INTO public.images(layer_id, blob)
            VALUES ($1, $2);`,
        values: [layer_id,image_dir]
    };
    try{       
        await connection.query(query);
    }
    catch(err){
        console.log('Add Feature Error');
        console.log(`ID : ${layer_id}\nFeature\n`);
        console.log(feature);
        throw err;
    }    
}

async function addWFS(layer_name, layer_id){
    var headers = {
        'Content-type': 'text/xml'
    };
    
    var dataString = `
    <featureType>
    <name>${layer_id}</name>
    <nativeName>${process.env.NATIVE_NAME}</nativeName>
    <title>${layer_name}</title>
    <srs>EPSG:4326</srs>
    <attributes>
        <attribute>
        <name>geometry_data</name>
        <binding>org.locationtech.jts.geom.Polygon</binding>
        </attribute>
        <attribute>
        <name>information</name>
        <binding>java.lang.String</binding>
        </attribute>
    </attributes>
    <cqlFilter>layer_id=${layer_id}</cqlFilter>
    </featureType>
    `;
    
    var options = {
        url: `http://localhost:8080/geoserver/rest/workspaces/${process.env.WORKSPACE}/datastores/${process.env.DATASTORE}/featuretypes`,
        method: 'POST',
        headers: headers,
        body: dataString,
        auth: {
            'user': process.env.GEOSERVER_ID,
            'pass': process.env.GEOSERVER_PW
        }
    };

    try{
        await request(options);
    }
    catch(err){
        console.log('add WFS error');
        throw err;
    }
}

router.post('/:layerName', 
    multer({storage: multer.diskStorage({
                destination: function(req,file,cb){
                    cb(null,'./tmp/');
                    
                },

                // filename: function(req,file,cb){
                //     const filenames = file.originalname.split('.');
                //     const extension = filenames[filenames.length -  1];
                //     cb(null, req.params.layerName+'.'+extension);
                // }
            })
    }).fields([{name:'jsonFile'},{name:'pngFile'}]) ,
    
    async function (req, res) {
        const layerName = req.params.layerName;
        try {
            fs.readFile(req.files.jsonFile[0].path, async function(err, data){

                await connection.query('BEGIN');
                const layergroudId = await getLayergroupId(req.session.uuid, req.body.layergroupName);
                const layerId = await addLayer(layergroudId, req.session.uuid, req.body);

                const geojson = JSON.parse(data.toString());
                const add_feature_promises = geojson.features.map(e => addFeature(layerId, e));
                await Promise.all(add_feature_promises);
                await addImage(layerId, req.files.pngFile[0].path);
                await addWFS(layerName, layerId);
                await connection.query('COMMIT');
                return res.send("OK");
            });
        }
        catch (err) {
            console.error(err.stack);
            await connection.query('ROLLBACK');
            return res.sendStatus(500);
        }
        // let geojson = null;
        // fs.readFile(req.files.pngFile[0].path, (err,data)=>{
        //     fs.writeFile(`./tmp/${layerName}.png`,data, function(err,res){
        //         if(err) console.log(err);
        //         else console.log(res);
        //     });
        // })
});


export default router;