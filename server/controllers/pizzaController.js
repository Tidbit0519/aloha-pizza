import mongoose from "mongoose";
import { Pizza, Topping } from "../models/index.js";

const getAllPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find({}).populate('toppings');
        res.status(200).json(pizzas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createPizza = async (req, res) => {
    const { name, toppings } = req.body;
    try {
        if (!name || !toppings) {
            return res.status(400).json({ message: 'Name and toppings are required' });
        }

        const pizzaExists = await Pizza.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (pizzaExists) {
            return res.status(400).json({ message: 'Pizza already exists' });
        }

        for (let topping of toppings) {
            const toppingExists = await Topping.findById(topping);
            if (!toppingExists) {
                return res.status(400).json({ message: 'Topping not found' });
            }
        }

        const newPizza = await Pizza.create({ name: name, toppings });
        res.status(201).json(newPizza);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updatePizza = async (req, res) => {
    const { id } = req.params;
    const { name, toppings } = req.body;
    try {
        if (!name || !toppings) {
            return res.status(400).json({ message: 'Name and toppings are required' });
        }

        const pizza = await Pizza.findById(id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }

        const pizzaExists = await Pizza.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
        if (pizzaExists && pizzaExists._id.toString() !== id) {

            return res.status(400).json({ message: 'Pizza already exists' });
        }

        for (let topping of toppings) {
            const toppingExists = await Topping.findById(topping);
            if (!toppingExists) {
                return res.status(400).json({ message: 'Topping not found' });
            }
        }

        pizza.name = name;
        pizza.toppings = toppings;
        await pizza.save();
        res.status(200).json(pizza);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deletePizza = async (req, res) => {
    const { id } = req.params;
    try {
        const pizza = await Pizza.findByIdAndDelete(id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza not found' });
        }
        res.status(200).json({ message: 'Pizza deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllPizzas, createPizza, updatePizza, deletePizza };