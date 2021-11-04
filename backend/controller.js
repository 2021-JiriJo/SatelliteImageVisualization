import express from 'express';
import users from './src/users.js';
import auths from './src/auths.js';
import apiDocs from './src/apiDocs.js';

// import compares from './src/compares.js';

const controller = express();

controller.use('/users/:user_id', users);
controller.use('/', auths);
controller.use('/apiDocs', apiDocs);

export default controller;