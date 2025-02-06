import { Router } from 'express';
import {
    getAllPizzas,
    createPizza,
    updatePizza,
    deletePizza,
} from '../controllers/index.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pizzas
 */

/**
 * @swagger
 * /api/pizzas:
 *   get:
 *     summary: Get all pizzas
 *     tags: [Pizzas]
 *     responses:
 *       200:
 *         description: List of all pizzas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pizza'
 */
router.get('/', getAllPizzas);

/**
 * @swagger
 * /api/pizzas:
 *   post:
 *     summary: Create a new pizza
 *     tags: [Pizzas]
 *     requestBody:
 *       description: Pizza to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PizzaInput'
 *     responses:
 *       201:
 *         description: Created a new pizza
 *       400:
 *         description: Pizza already exists
 */
router.post('/', createPizza);

/**
 * @swagger
 * /api/pizzas/{id}:
 *   put:
 *     summary: Update an existing pizza
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pizza ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PizzaInput'
 *     responses:
 *       200:
 *         description: Updated pizza
 *       400:
 *         description: Name and toppings are required
 *       404:
 *         description: Pizza not found
 */
router.put('/:id', updatePizza);

/**
 * @swagger
 * /api/pizzas/{id}:
 *   delete:
 *     summary: Delete a pizza
 *     tags: [Pizzas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Pizza ID
 *     responses:
 *       200:
 *         description: Deleted pizza
 *       404:
 *         description: Pizza not found
 */
router.delete('/:id', deletePizza);

export default router;