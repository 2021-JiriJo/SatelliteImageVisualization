import express from 'express';

const router = express.Router();

router.get('/date', (req, res)=>{
    return res.json([
        '2021-01-21','2021-01-22','2021-01-23','2021-01-24'
    ]);
});

router.get('/map/:date_from/:date_to/from', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/compare/map_${req.params.date_from}_${req.params.date_to}_1.png`));
});

router.get('/map/:date_from/:date_to/to', (req, res)=>{
    return res.sendFile(path.join(__dirname, `./data/compare/map_${req.params.date_from}_${req.params.date_to}_2.png`));
});

router.get('/info/:date_from/:date_to', (req, res)=>{
    const geojson = fs.readFileSync(`./data/compare/map_${req.params.date_from}_${req.params.date_to}.geojson`);
    const extent1 = fs.readFileSync(`./data/compare/map_${req.params.date_from}_${req.params.date_to}_1.json`);
    const extent2 = fs.readFileSync(`./data/compare/map_${req.params.date_from}_${req.params.date_to}_2.json`);

    return res.json({
        extent1: JSON.parse(extent1),
        extent2: JSON.parse(extent2),
        geojson: JSON.parse(geojson)
    });
});

export default router;