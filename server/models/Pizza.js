import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	toppings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Topping",
		},
	],
});

pizzaSchema.index({ name: "text" });

pizzaSchema.pre("save", async function (next) {
	try {
		const pizza = this;
		const pizzaExists = await mongoose.model("Pizza").findOne({
			name: { $regex: new RegExp(`^${pizza.name}$`, "i") },
		});

		if (pizzaExists && pizzaExists._id.toString() !== pizza._id.toString()) {
			const err = new Error(`${pizza.name} already exists`);
			err.status = 400;
			return next(err);
		}
	} catch (error) {
		return next(error);
	}
});

export default mongoose.model("Pizza", pizzaSchema);
