import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import logger from 'morgan';


const app = express();
app.use(cors());
app.use(logger('dev'));

const __dirname = path.resolve();

app.get('/object/objects', (req, res)=>{
    return res.json([
        '자동차','비행기','도로','선박'
    ]);
});

app.get('/object/map/:date/:object', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/object/map_${req.params.date}_${req.params.object}.png`));
});

app.get('/object/info/:date/:object', (req, res)=>{
    const geojson = fs.readFileSync(`./data/object/map_${req.params.date}_${req.params.object}.geojson`,'utf-8');
    const extent = fs.readFileSync(`./data/object/map_${req.params.date}_${req.params.object}.json`,'utf-8');

    return res.json({
        extent: JSON.parse(extent),
        geojson: JSON.parse(geojson)
    });
});

app.get('/diff/date', (req, res)=>{
    return res.json([
        '2021-01-21','2021-01-22','2021-01-23','2021-01-24'
    ]);
});

app.get('/diff/map/:date_from/:date_to/from', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/diff/map_${req.params.date_from}_${req.params.date_to}_1.png`));
});

app.get('/diff/map/:date_from/:date_to/to', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/diff/map_${req.params.date_from}_${req.params.date_to}_2.png`));
});

app.get('/diff/info/:date_from/:date_to', (req, res)=>{
    const geojson = fs.readFileSync(`./data/diff/map_${req.params.date_from}_${req.params.date_to}.geojson`);
    const extent1 = fs.readFileSync(`./data/diff/map_${req.params.date_from}_${req.params.date_to}_1.json`);
    const extent2 = fs.readFileSync(`./data/diff/map_${req.params.date_from}_${req.params.date_to}_2.json`);

    return res.json({
        extent1: JSON.parse(extent1),
        extent2: JSON.parse(extent2),
        geojson: JSON.parse(geojson)
    });
});


const swaggerDefinition = {
  info: { 
    title: 'Satellite Visualization',
    version: '1.0.0',
    description: 'For Simple Test',
  },
  host: 'localhost:3000',
}
const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./swagger.yaml'],
}
const swaggerSpec = await swaggerJSDoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(3000,()=>{
        console.log('Mock Server On');
});
