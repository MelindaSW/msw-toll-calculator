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

router.use('/calculateTollFee', (req, res, next) => {
  const isNotValidVehicle = !vehicleIsValid(req.body.vehicle);
  const isNotValidTimeStampFormat = req.body.dates.some(
    (date: string) => !isCorrectDateTimeFormat(date)
  );
  const errorResponse: ErrorResponseBody = {
    requestUrl: req.url,
    status: 422,
    message: ''
  };

  if (isNotValidVehicle) {
    res.status(errorResponse.status);
    res.send({
      ...errorResponse,
      message: `The vehicle is not valid. It should be one of ${allVehicles.join(
        ', '
      )}.`
    });
  } else if (isNotValidTimeStampFormat) {
    res.status(errorResponse.status);
    res.send({
      ...errorResponse,
      message: `Timestamp format not accepted. Correct format should be YYYY-MM-DDTHH:mm:ssZ`
    });
  } else {
    next();
  }
});

/**
 * @swagger
 * tags:
 *  - name: Tollcalculator
 *    description: Endpoint for calculating toll fees based on date and time of passing. Vehicle type should be one of Car, Motorbike, Diplomat, Tractor, Foreign, Military or Emergency. Timestamp should be of format YYYY-MM-DDTHH:mm:ssZ.
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
 *             minItems: 1
 *             type: date-time
 *             example: '2022-12-08T07:32:28Z, 2022-12-08T08:30:20Z, 2022-12-08T16:45:02Z'
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
 *             example: '2022-12-08T07:32:28Z, 2022-12-08T08:30:20Z, 2022-12-08T16:45:02Z'
 *     ErrorResponse:
 *       type: object
 *       properties:
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
 *     description: Calculates the total toll fee based on the provided vehicle type and an array with the timestamps for all the passes during one day.
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
 *       '404':
 *         description: Toll fee could not be calculated
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
router.post('/calculateTollFee', (req: Request, res: Response): void => {
  controller.calculateTollFee(req, res);
});

export default router;
