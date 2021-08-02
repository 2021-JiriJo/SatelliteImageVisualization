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

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const __dirname = path.resolve();

app.get('/object/objects', (req, res)=>{
    return res.json([
        'car','plane','road','ship'
    ]);
});

app.get('/object/:object/date', (req, res)=>{
    return res.json([
        '2021-01-21','2021-01-22','2021-01-23','2021-01-24'
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

app.get('/compare/date', (req, res)=>{
    return res.json([
        '2021-01-21','2021-01-22','2021-01-23','2021-01-24'
    ]);
});

app.get('/compare/map/:date_from/:date_to/from', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/compare/map_${req.params.date_from}_${req.params.date_to}_1.png`));
});

app.get('/compare/map/:date_from/:date_to/to', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/compare/map_${req.params.date_from}_${req.params.date_to}_2.png`));
});

app.get('/compare/info/:date_from/:date_to', (req, res)=>{
    const geojson = fs.readFileSync(`./data/compare/map_${req.params.date_from}_${req.params.date_to}.geojson`);
    const extent1 = fs.readFileSync(`./data/compare/map_${req.params.date_from}_${req.params.date_to}_1.json`);
    const extent2 = fs.readFileSync(`./data/compare/map_${req.params.date_from}_${req.params.date_to}_2.json`);

    return res.json({
        extent1: JSON.parse(extent1),
        extent2: JSON.parse(extent2),
        geojson: JSON.parse(geojson)
    });
});

app.post('/login', (req, res)=>{
    // console.log(req);
    if(req.body.id == 'root' && req.body.password == '1234'){
        return res.send("로그인 성공");
    }
    else{
        return res.status(401).send("로그인 실패");
    }
});

app.post('/register', (req, res)=>{
    if(req.body.id == 'root'){
        return res.status(401).send("가입 실패");
    }
    else{
        return res.send("가입 성공");
    }
});

app.post('/layer', (req, res)=>{
    fs.writeFile(req.body.jsonFile);
    res.send("OK");
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
app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(3000,()=>{
        console.log('Mock Server On');
});
