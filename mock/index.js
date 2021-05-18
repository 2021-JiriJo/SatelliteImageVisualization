import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
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

app.get('/diff/map/:date_from/:date_to', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/map_${req.params.date}_${req.params.object}.png`));
});

app.get('/diff/info/:date_from/:date_to', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/map_${req.params.date}_${req.params.object}.png`));
});


// app.listen(3000,()=>{
//     app.use(cors());
//     console.log('Mock Server On');
// });




// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
var swaggerDefinition = {
  info: { // API informations (required)
    title: 'Satellite Visualization', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'For Simple Test', // Description (optional)
  },
  host: 'localhost:3000', // Host (optional)
}

// Options for the swagger docs
var options = {
  // Import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // Path to the API docs
  apis: ['./swagger.yaml'],
}




const swaggerSpec = await swaggerJSDoc(options);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000,()=>{
        app.use(cors());
        console.log('Mock Server On');
});
