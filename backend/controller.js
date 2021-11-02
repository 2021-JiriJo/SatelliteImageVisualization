import express from 'express';
import users from './src/users.js';
import objects from './src/objects.js';
import apiDocs from './src/apiDocs.js';
import layers from './src/layers.js';
import layergroups from './src/layergroups.js';
// import compares from './src/compares.js';

const controller = express();

controller.use('/users', users);
controller.use('/objects', objects);
// controller.use('/compares', compares);
controller.use('/apiDocs', apiDocs);
controller.use('/layers',layers);
controller.use('/layergroups',layergroups);

export default controller;