var express = require('express');
var cors = require('cors');
var path = require('path')
var app = express();

app.use(cors());

app.get('/objects', (req, res)=>{
    return res.json([
        '자동차','비행기','도로','선박'
    ]);
});

app.get('/compare/date', (req, res)=>{
    return res.json([
        '2021-01-21','2021-01-22','2021-01-23','2021-01-24',
    ]);
});

app.get('/map/:date/:object', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/map_${req.params.date}_${req.params.object}.png`));
});

app.get('/info/:date/:object', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/map_${req.params.date}_${req.params.object}.geojson`));
});

app.listen(3000,()=>{
    app.use(cors());
    console.log('Mock Server On');
});

