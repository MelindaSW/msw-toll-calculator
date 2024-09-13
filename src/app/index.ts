import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swaggerConfig';
import tollCalculatorRoute from './routes/tollCalculatorRoute';
import { logIncomingRequest } from './utils/logging';
import { handleErrorResponse } from './utils/errorHandling';

const app: Application = express();
const PORT = process.env.PORT || 8080;

const startApplication = () => {
  app.use(cors());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Logger middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    logIncomingRequest(req);
    next();
  });

  app.use('/api', tollCalculatorRoute);

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    handleErrorResponse(err, req, res);
  });

  app.listen(PORT, () => {
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
    console.log(
      `Swagger available at URL 👉 http://localhost:${PORT}/api-docs/#/`
    );
  });
};

startApplication();
