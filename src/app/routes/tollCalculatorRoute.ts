import express, { Request, Response, Router } from 'express';
import { TollCalculatorController } from '../controllers/tollCalculatorController';
import { TollCalculatorService } from '../services/tollCalculatoServiceImplementation';
import { vehicleIsValid } from '../utils/validators';
import { allVehicles } from '../types/vehicleTypes';
import { isCorrectDateTimeFormat } from '../utils/validators';
import { ErrorResponseBody } from '../types/responseTypes';

const router = Router();
router.use(express.json());
const controller = new TollCalculatorController(new TollCalculatorService());

router.use('/calculatetollfee', (req, res, next) => {
  const errorResponse: ErrorResponseBody = {
    requestUrl: '/calculatetollfee',
    status: 422,
    message: ''
  };

  if (req.body.dates && req.body.vehicle && req.body.dates.length > 0) {
    if (!vehicleIsValid(req.body.vehicle)) {
      res.status(errorResponse.status);
      res.send({
        ...errorResponse,
        message: `The vehicle is not valid. It should be one of ${allVehicles.join(
          ', '
        )}.`
      });
    } else if (
      req.body.dates.some((date: string) => !isCorrectDateTimeFormat(date))
    ) {
      res.status(errorResponse.status);
      res.send({
        ...errorResponse,
        message: `Timestamp format not accepted. Correct format should be YYYY-MM-DDTHH:mm:ssZ`
      });
    } else {
      next();
    }
  } else {
    res.status(errorResponse.status);
    res.send({
      ...errorResponse,
      message: `Invalid request body. Missing one or several attributes.`
    });
  }
});

/**
 * @swagger
 * tags:
 *  - name: Tollcalculator
 *    description: Api for calculating toll fees based on date and time of passing.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TollFeeRequest:
 *       type: object
 *       properties:
 *         vehicle:
 *           type: string
 *           example: 'Car'
 *         dates:
 *           type: array
 *           items:
 *             type: date-time
 *           example: ["2022-12-08T07:32:28Z","2022-12-08T08:30:20Z","2022-12-08T16:45:02Z"]
 *     TollFeeResponse:
 *       type: object
 *       properties:
 *         totalTollFee:
 *           type: number
 *         forVehicle:
 *           type: string
 *           example: 'Car'
 *         forDates:
 *           type: array
 *           items:
 *             type: date-time
 *           example: ["2022-12-08T07:32:28Z","2022-12-08T08:30:20Z","2022-12-08T16:45:02Z"]
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         requestUrl:
 *           type: string
 *         status:
 *           type: number
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/calculateTollFee:
 *   post:
 *     summary: Get the total toll fee
 *     description: Calculates the total toll fee based on the provided vehicle type and an array with the timestamps for all the passes during one day. Vehicle type should be one of Car, Motorbike, Diplomat, Tractor, Foreign, Military or Emergency. Timestamp should be of format YYYY-MM-DDTHH:mm:ssZ.
 *     tags: [Tollcalculator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TollFeeRequest'
 *     responses:
 *       '200':
 *         description: Toll fee calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TollFeeResponse'
 *       '422':
 *         description: Invalid request body data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/calculatetollfee', (req: Request, res: Response): void => {
  controller.calculateTollFee(req, res);
});

export default router;
