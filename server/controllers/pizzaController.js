import mongoose from "mongoose";
import { Pizza, Topping } from "../models/index.js";

const getAllPizzas = async (req, res, next) => {
	try {
		const pizzas = await Pizza.find({}).populate("toppings");
		res.status(200).json(pizzas);
	} catch (error) {
		return next(error);
	}
};

const createPizza = async (req, res, next) => {
	const { name, toppings } = req.body;
	try {
		if (!name) {
			const err = new Error("Name is required");
			err.status = 400;
			return next(err);
		}

		if (toppings.length !== 0) {
			for (let topping of toppings) {
				const toppingExists = await Topping.findById(topping);
				if (!toppingExists) {
					const err = new Error(`Topping not found`);
					err.status = 400;
					return next(err);
				}
			}
		}

		const newPizza = await Pizza.create({ name: name, toppings });
		res.status(201).json({
			pizza: newPizza,
			message: `${name} created successfully`,
		});
	} catch (error) {
		return next(error);
	}
};

const updatePizza = async (req, res, next) => {
	const { id } = req.params;
	const { name, toppings } = req.body;
	try {
		if (!name) {
			const err = new Error("Name is required");
			err.status = 400;
			return next(err);
		}

		if (!toppings) {
			const err = new Error("Toppings are required");
			err.status = 400;
			return next(err);
		}

		const pizza = await Pizza.findById(id);
		if (!pizza) {
			const err = new Error("Pizza not found");
			err.status = 404;
			return next(err);
		}

		for (let topping of toppings) {
			const toppingExists = await Topping.findById(topping);
			if (!toppingExists) {
				const err = new Error(`Topping not found`);
				err.status = 400;
				return next(err);
			}
		}

		pizza.name = name;
		pizza.toppings = toppings;
		await pizza.save();
		res.status(200).json({
			pizza: pizza,
			message: `${name} updated successfully`,
		});
	} catch (error) {
		return next(error);
	}
};

const deletePizza = async (req, res, next) => {
	const { id } = req.params;
	try {
		const pizza = await Pizza.findByIdAndDelete(id);
		if (!pizza) {
			const err = new Error("Pizza not found");
			err.status = 404;
			return next(err);
		}
		res.status(200).json({ message: `${pizza.name} deleted successfully` });
	} catch (error) {
		return next(error);
	}
};

export { getAllPizzas, createPizza, updatePizza, deletePizza };
