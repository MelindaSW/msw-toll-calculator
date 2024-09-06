import express, { Request, Response, Router } from 'express';
import { TollCalculatorController } from '../controllers/tollCalculatorController';
import { TollCalculatorService } from '../services/tollCalculatoServiceImplementation';

const router = Router();
router.use(express.json());
const controller = new TollCalculatorController(new TollCalculatorService());

router.use('/calculateTollFee', (req, res, next) => {
  // validate request body, vehicles should be one of the correct types and the array of dates should not be empty or contain non Date types
  console.log('Request URL:', req.originalUrl);
  next();
});

/**
 * @swagger
 * tags:
 *  - name: Tollcalculator
 *    description: Endpoint for calculating toll fees based on date and time of passing, and type of vehicle
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
 *         dates:
 *           type: array
 *           items:
 *             type: string
 *     TollFeeResponse:
 *       type: object
 *       properties:
 *         totalTollFee:
 *           type: number
 *         forVehicle:
 *           type: string
 *         forDates:
 *           type: array
 *           items:
 *             type: string
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
 *     summary: Get total toll fee
 *     description: Calculates the total toll fee based on the provided vehicle type and timestamps
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
