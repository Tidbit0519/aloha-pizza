import { Router } from "express";
import {
    getAllToppings,
    createTopping,
    updateTopping,
    deleteTopping,
} from "../controllers/index.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Toppings
 */

/**
 * @swagger
 * /api/toppings:
 *   get:
 *     summary: Get all toppings
 *     tags: [Toppings]
 *     responses:
 *       200:
 *         description: List of all toppings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topping'
 */
router.get('/', getAllToppings);

/**
 * @swagger
 * /api/toppings:
 *   post:
 *     summary: Create a new topping
 *     tags: [Toppings]
 *     requestBody:
 *       description: Topping to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToppingInput'
 *     responses:
 *       201:
 *         description: Created a new topping
 *       400:
 *         description: Topping already exists
 */
router.post('/', createTopping);

/**
 * @swagger
 * /api/toppings/{id}:
 *   put:
 *     summary: Update an existing topping
 *     tags: [Toppings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Topping ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ToppingInput'
 *     responses:
 *       200:
 *         description: Updated topping
 *       404:
 *         description: Topping not found
 */
router.put('/:id', updateTopping);

/**
 * @swagger
 * /api/toppings/{id}:
 *   delete:
 *     summary: Delete a topping
 *     tags: [Toppings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Topping ID
 *     responses:
 *       200:
 *         description: Topping deleted
 *       404:
 *         description: Topping not found
 */
router.delete('/:id', deleteTopping);

export default router;