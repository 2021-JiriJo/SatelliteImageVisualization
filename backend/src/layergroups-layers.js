import express from 'express';
import fs from 'fs';

import connection from '../db_connection.js';

import check_session from './session.js';

const router = express.Router();

router.get('/', async function(req, res){   
    let query = {
        name: 'get-layergroups',
        text: `SELECT layergroup_name FROM public.layergroups WHERE layergroup_owner = $1`,
        values: [req.session.uuid]
    }

    if(req.session.uuid == '' || req.session.uuid == undefined){
        query = {
            name: 'get-layergroups-public',
            text: query.text = `SELECT layergroup_name FROM public.layergroups WHERE layergroup_visibility = true`
        };
    }

    try{
        const layergroup_names = await connection.query(query);
        if(layergroup_names.rows.length <= 0){
            return res.sendStatus(204);
        }
        else{
            return res.send(layergroup_names.rows.map(e=>e.layergroup_name));
        }
    }
    catch(err){
        if(err) console.log(err);
    }
});

router.post('/:layergroup', check_session, async function(req, res){
    // if(req.session.uuid )
    let visibility = req.body.visibility == 'Public';
    const query = {
        name: 'add-layergroups',
        text: `INSERT INTO public.layergroups(
            layergroup_name, layergroup_description, layergroup_owner, layergroup_visibility)
            VALUES ($1, $2, $3, $4);`,
        values: [req.params.layergroup, req.body.layerGroupDescription, req.session.uuid, visibility ]
    };

    try{ 
        await connection.query(query);
        return res.sendStatus(200);
    }
    catch(err){
        if(err) console.log(err);
        return res.sendStatus(500);
    }
    
});

router.get('/:layergroup/layers', async function (req, res){
    try{        
        const layers = await connection.query({
            name: 'get-layers-in-layergroup',
            text: `
                SELECT layer_name 
                FROM public.layers 
                WHERE layer_layergroup=(SELECT layergroup_id FROM public.layergroups WHERE layergroup_name=$1);`,
            values: [req.params.layergroup]
        });

        return res.send(layers.rows.map(e=>e.layer_name));
    }
    catch(err){
        console.log(err.stack);
        return res.sendStatus(500);
    }
    
});

router.get('/:layergroup/layers/:layer', async function (req, res){
    try{        
        const lid = await connection.query({
            name: 'get-layer-id-from-layer-name',
            text: `
                SELECT layer_id	
                FROM public.layers 
                WHERE layer_name=$1
                AND layer_layergroup = (SELECT layergroup_id from public.layergroups WHERE layergroup_name=$2);`,
            values: [req.params.layer, req.params.layergroup]
        });
        const id = lid.rows[0].layer_id;
        return res.send(`http://localhost:8080/geoserver/siv/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=siv%3A${id}&outputFormat=application%2Fjson`);
    }
    catch(err){
        console.log(err.stack);
        return res.sendStatus(500);
    }
    
});

router.post('/:layergroup/layers/:layer/imagee', async function (req,res){
    const query = {
        name: 'get-extent',
        text: `
            SELECT imgs.extent
            FROM public.layers AS ls
            JOIN public.layergroups AS lgs
            ON ls.layer_layergroup = lgs.layergroup_id
            AND lgs.layergroup_owner = $1
            AND lgs.layergroup_name = $2
            AND ls.layer_name = $3
            JOIN public.images AS imgs
            ON ls.layer_layergroup = imgs.layer_id;`,
        values: [req.params.user_id, req.params.layergroup, req.params.layer]
    };
    try{       
        const qres = await connection.query(query);
        const extent = await fs.readFileSync(qres.rows[0].extent);
        return res.send(extent);
    }
    catch(err){
        console.log('Get Extent Error');
        console.log(`ID : ${req.params.layer}\nFeature\n`);
        console.log(feature);
        throw err;
    }    
});

// router.post('/:layergroup/layers/:layer/image', async function (req,res){
//     const query = {
//         name: 'get-extent',
//         text: `
//             SELECT imgs.image_dir
//             FROM public.layers AS ls
//             JOIN public.layergroups AS lgs
//             ON ls.layer_layergroup = lgs.layergroup_id
//             AND lgs.layergroup_owner = $1
//             AND lgs.layergroup_name = $2
//             AND ls.layer_name = $3
//             JOIN public.images AS imgs
//             ON ls.layer_layergroup = imgs.layer_id;`,
//         values: [req.session.uuid, req.params.layergroup, req.params.layer]
//     };
//     try{       
//         const qres = await connection.query(query);
//         const img = await fs.readFileSync(qres.rows[0].image_dir);
//         const dir = path.join(__dirname,img);
//         console.log(dir);
//         return res.sendFile(dir);
//     }
//     catch(err){
//         console.log('Add Feature Error');
//         console.log(`ID : ${layer_id}\nFeature\n`);
//         console.log(feature);
//         throw err;
//     }    
// });



router.post('/:layergroup/layers/:layer/image', async function (req,res){
    const query = {
        name: 'get-image',
        text: `
            SELECT imgs.blob
            FROM public.layers AS ls
            JOIN public.layergroups AS lgs
            ON ls.layer_layergroup = lgs.layergroup_id
            AND lgs.layergroup_owner = $1
            AND lgs.layergroup_name = $2
            AND ls.layer_name = $3
            JOIN public.images AS imgs
            ON ls.layer_layergroup = imgs.layer_id;`,
        values: [req.session.uuid, req.params.layergroup, req.params.layer]
    };
    try{       
        const img_id = await connection.query(query);
        fs.readFileSync()
        img_id.rows[0].blob;
    }
    catch(err){
        console.log('Add Feature Error');
        console.log(`ID : ${layer_id}\nFeature\n`);
        console.log(feature);
        throw err;
    }    
});    

export default router;