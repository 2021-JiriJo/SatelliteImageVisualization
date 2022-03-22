import express from 'express';
import fs from 'fs';
import path from 'path';
import connection from '../db_connection.js';

import check_session from './session.js';
const __dirname = path.resolve();


const router = express.Router({mergeParams: true});

router.get('/', async function(req, res){   
    let query = {
        name: 'get-layergroups',
        text: `SELECT layergroup_name, us.id
        FROM public.layergroups as lgs
        JOIN public.users as us
        ON lgs.layergroup_owner = us.user_id
        WHERE us.user_id = $1`,
        values: [req.session.uuid]
    }

    if(req.session.uuid == '' || req.session.uuid == undefined){
        query = {
            name: 'get-layergroups-public',
            text: query.text = `SELECT layergroup_name, us.id
            FROM public.layergroups as lgs
            JOIN public.users as us
            ON lgs.layergroup_owner = us.user_id
            WHERE lgs.layergroup_visibility = true`
        };
    }

    try{
        const layergroup_names = await connection.query(query);
        if(layergroup_names.rows.length <= 0){
            return res.sendStatus(204);
        }
        else{
            return res.send(layergroup_names.rows.map(e=>[e.layergroup_name, e.id]));
        }
    }
    catch(err){
        if(err) console.log(err);
    }
});

router.post('/:layergroup', async function(req, res){
    console.log(req.session);
    if(req.session.uuid == undefined){
        return res.sendStatus(401);
    }
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
                SELECT ls.layer_name, lgs.layergroup_visibility
                FROM public.layers AS ls
                JOIN public.layergroups AS lgs
                ON ls.layer_layergroup = lgs.layergroup_id
                AND lgs.layergroup_name = $1
                JOIN public.users AS us
                ON lgs.layergroup_owner = us.user_id
                AND us.id = $2;`,
            values: [req.params.layergroup, req.params.user_id]
        });
        console.log(layers.rows);
        if(!layers.rows[0].layergroup_visibility && req.session.uuid == undefined){
            return res.sendStatus(401);
        }
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
            SELECT ls.layer_id, lgs.layergroup_visibility
            FROM public.layers AS ls
            JOIN public.layergroups AS lgs
            ON ls.layer_layergroup = lgs.layergroup_id
            AND lgs.layergroup_name = $1
            JOIN public.users AS us
            ON lgs.layergroup_owner = us.user_id
            AND us.id = $2
			WHERE ls.layer_name = $3`,
            values: [req.params.layergroup, req.params.user_id, req.params.layer]
        });
        if(!lid.rows[0].layergroup_visibility && req.session.uuid == undefined){
            return res.sendStatus(401);
        }
        const id = lid.rows[0].layer_id;
        return res.send(`http://121.183.220.132:8080/geoserver/siv/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=siv%3A${id}&outputFormat=application%2Fjson`);
    }
    catch(err){
        console.log(err.stack);
        return res.sendStatus(500);
    }
    
});

router.get('/:layergroup/layers/:layer/image/extent', async function (req,res){
    const query = {
        name: 'get-extent',
        text: `
            SELECT imgs.extent, lgs.layergroup_visibility
            FROM public.images AS imgs
            JOIN public.layers AS ls
            ON ls.layer_id = imgs.layer_id
            AND ls.layer_name = $3
            JOIN public.layergroups AS lgs
            ON ls.layer_layergroup = lgs.layergroup_id
            AND lgs.layergroup_name =$2
            JOIN public.users AS us
            ON lgs.layergroup_owner = us.user_id
            AND us.id = $1;`,
        values: [req.params.user_id, req.params.layergroup, req.params.layer]
    };
    try{       
        const qres = await connection.query(query);
        if(!qres.rows[0].layergroup_visibility && req.session.uuid == undefined){
            return res.sendStatus(401);
        }
        return res.send(qres.rows[0].extent);
    }
    catch(err){
        console.log('Get Extent Error');
        console.log(`ID : ${req.params.user_id}\nlayergroup : ${req.params.layer}\nlayer : ${req.params.layergroup}\n`);
        console.log(err.stack);
        return res.sendStatus(500);
    }    
});

router.get('/:layergroup/layers/:layer/image', async function (req,res){
    const query = {
        name: 'get-image',
        text: `
            SELECT imgs.dir, lgs.layergroup_visibility
            FROM public.images AS imgs
            JOIN public.layers AS ls
            ON ls.layer_id = imgs.layer_id
            AND ls.layer_name = $3
            JOIN public.layergroups AS lgs
            ON ls.layer_layergroup = lgs.layergroup_id
            AND lgs.layergroup_name =$2
            JOIN public.users AS us
            ON lgs.layergroup_owner = us.user_id
            AND us.id = $1;`,
        values: [req.params.user_id, req.params.layergroup, req.params.layer]
    };
    try{       
        const qres = await connection.query(query);
        
        // const dir = path.join(__dirname,qres.rows[0].dir);
        // console.log(qres.rows[0].dir);
        if(!qres.rows[0].layergroup_visibility && req.session.uuid == undefined){
            return res.sendStatus(401);
        }
        return res.sendFile(path.join(__dirname,qres.rows[0].dir));
    }
    catch(err){
        console.log('Get Image Error');
        console.log(`ID : ${req.params.user_id}\nlayergroup : ${req.params.layer}\nlayer : ${req.params.layergroup}\n`);;
        console.log(err.stack);
        return res.sendStatus(500);
    }    
});

export default router;