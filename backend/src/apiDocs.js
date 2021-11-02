import express from 'express';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

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
    apis: ['./src/swagger.yaml'],
  }
  const swaggerSpec = await swaggerJSDoc(options);
  router.use('', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  export default router;