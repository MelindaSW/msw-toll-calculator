import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const os = require('os');
const hostname = os.hostname() || 'localhost';
const PORT = process.env.PORT || 8080;
const url = 'http://' + hostname + ':' + PORT;

const options: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Toll calculator API',
      version: '1.0.0',
      description: 'Toll calculator REST api documentation'
    },
    servers: [
      {
        url: url
      }
    ]
  },
  apis: ['./src/app/routes/*.ts'] // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
