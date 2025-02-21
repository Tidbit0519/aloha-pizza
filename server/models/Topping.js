import mongoose from "mongoose";

const toppingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
});

toppingSchema.pre("save", async function (next) {
	try {
		const topping = this;
		const toppingExists = await mongoose.model("Topping").findOne({
			name: { $regex: new RegExp(`^${topping.name}$`, "i") },
		});
		if (
			toppingExists &&
			toppingExists._id.toString() !== topping._id.toString()
		) {
			const err = new Error(`${topping.name} already exists`);
			err.status = 400;
			return next(err);
		}
		next();
	} catch (error) {
		return next(error);
	}
});

export default mongoose.model("Topping", toppingSchema);
