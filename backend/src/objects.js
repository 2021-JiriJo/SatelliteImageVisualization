import express from 'express';

import path from 'path';
import fs from 'fs';

import connection from '../db_connection.js';

const router = express.Router();

const __dirname = path.resolve();

// router.get('', (req, res)=>{
//     return res.json([
//         'car','plane','road','ship'
//     ]);
// });

router.get('', (req, res)=>{
    try {
        const query = {
            name: 'get-objects',
            text: 'select distinct layer_feature_type from public.layers where layer_owner = $1',
            values: [req.session.uuid]
        };
        
        connection
            .query(query)
            .then(query_res=>{
                console.log(query_res.rows);
                
                if(query_res.rows.length <= 0) {
                    return res.sendStatus(204); 
                }
                else{
                    const result = query_res.rows.map(e=>e.layer_feature_type);
                    res.send(result);
                }
            })
            .catch(err=>{
                console.log(err);
            });

      }catch(e){
          console.log(e);
      }
});

router.get('/:object/date', (req, res)=>{
    try {
        const query = {
            name: 'get-objects',
            text: 'select distinct layer_feature_type from public.layers where layer_owner = $1',
            values: [req.session.uuid]
        };
        
        connection
            .query(query)
            .then(query_res=>{
                console.log(query_res.rows);
                
                if(query_res.rows.length <= 0) {
                    return res.sendStatus(204); 
                }
                else{
                    const result = query_res.rows.map(e=>e.layer_feature_type);
                    res.send(result);
                }
            })
            .catch(err=>{
                console.log(err);
            });

      }catch(e){
          console.log(e);
      }
});

router.get('/map/:date/:object', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/object/map_${req.params.date}_${req.params.object}.png`));
});

router.get('/info/:date/:object', (req, res)=>{
    const geojson = fs.readFileSync(`./data/object/map_${req.params.date}_${req.params.object}.geojson`,'utf-8');
    const extent = fs.readFileSync(`./data/object/map_${req.params.date}_${req.params.object}.json`,'utf-8');

    return res.json({
        extent: JSON.parse(extent),
        geojson: JSON.parse(geojson)
    });
});

export default router;