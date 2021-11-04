import express from 'express';
import layers from './layers.js';
import layergroups from './layergroups.js';

const router = express.Router({mergeParams: true});

router.use('/layers',layers);
router.use('/layergroups',layergroups);

export default router;