import mongoose from "mongoose";
import { Topping } from "../models/index.js";

const getAllToppings = async (req, res, next) => {
	try {
		const toppings = await Topping.find({});
		res.status(200).json(toppings);
	} catch (error) {
		return next(error);
	}
};

const createTopping = async (req, res, next) => {
	const { name } = req.body;
	try {
		if (!name) {
			const err = new Error("Name is required");
			err.status = 400;
			return next(err);
		}

		const toppingExists = await Topping.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
		});
		if (toppingExists) {
			const err = new Error(`${name} already exists`);
			err.status = 400;
			return next(err);
		}
		const newTopping = new Topping({ name: name });
		await newTopping.save();
		res.status(201).json({
			_id: newTopping._id,
			name: newTopping.name,
			message: `${name} created successfully`,
		});
	} catch (error) {
		return next(error);
	}
};

const updateTopping = async (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;
	try {
		if (!name) {
			const err = new Error("Name is required");
			err.status = 400;
			return next(err);
		}

		const topping = await Topping.findById(id);
		if (!topping) {
			const err = new Error("Topping not found");
			err.status = 404;
			return next(err);
		}

		const toppingExists = await Topping.findOne({
			name: { $regex: new RegExp(`^${name}$`, "i") },
		});
		if (toppingExists && toppingExists._id.toString() !== id) {
			const err = new Error(`${name} already exists`);
			err.status = 400;
			return next(err);
		}

		topping.name = name;
		await topping.save();
		res.status(200).json({
			_id: topping._id,
			name: topping.name,
			message: `${name} updated successfully`,
		});
	} catch (error) {
		return next(error);
	}
};

const deleteTopping = async (req, res, next) => {
	const { id } = req.params;
	try {
		const topping = await Topping.findByIdAndDelete(id);
		if (!topping) {
			const err = new Error("Topping not found");
			err.status = 404;
			return next(err);
		}
		res.status(200).json({ message: `${topping.name} deleted successfully` });
	} catch (error) {
		return next(error);
	}
};

export { getAllToppings, createTopping, updateTopping, deleteTopping };
