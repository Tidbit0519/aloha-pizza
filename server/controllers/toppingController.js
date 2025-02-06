import mongoose from "mongoose";
import { Topping } from "../models/index.js";

const getAllToppings = async (req, res) => {
    try {
        const toppings = await Topping.find({});
        res.status(200).json(toppings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createTopping = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const toppingExists = await Topping.findOne({ name: name.toLowerCase() });
        if (toppingExists) {
            return res.status(400).json({ message: 'Topping already exists' });
        }
        const newTopping = new Topping({ name: name.toLowerCase() });
        await newTopping.save();
        res.status(201).json(newTopping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTopping = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        if (!id || !name) {
            return res.status(400).json({ message: 'Id and name are required' });
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: 'Topping not found' });
        }

        const topping = await Topping.findById(id);
        if (!topping) {
            return res.status(404).json({ message: 'Topping not found' });
        }

        topping.name = name.toLowerCase();
        await topping.save();
        res.status(200).json(topping);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTopping = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: 'Topping not found' });
        }

        const topping = await Topping.findByIdAndDelete(id);
        if (!topping) {
            return res.status(404).json({ message: 'Topping not found' });
        }
        res.status(200).json({ message: 'Topping deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getAllToppings, createTopping, updateTopping, deleteTopping };