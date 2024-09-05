import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import tollCalculatorRoute from './routes/tollCalculatorRoute';

const app: Application = express();
const PORT = process.env.PORT || 8080;

const startApplication = () => {
  app.use(cors());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', tollCalculatorRoute);
  app.listen(PORT, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
    console.log(
      `Swagger available at URL 👉 http://localhost:${PORT}/api-docs/#/`
    );
  });
};

startApplication();
