import express, { Request, Response, Router } from 'express';
import { TollCalculatorController } from '../controllers/tollCalculatorController';

const router = Router();
router.use(express.json());
const controller = new TollCalculatorController();

/**
 * @swagger
 * tags:
 *  - name: Tollcalculator
 *    description: Endpoint for calculating toll fees for different vehicles
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
 *         status:
 *           type: number
 *         totalTollFee:
 *           type: number
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
  res.send('hello toll');
});

export default router;
