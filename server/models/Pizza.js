import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    toppings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topping",
        },
    ],
});

module.exports = mongoose.model("Pizza", pizzaSchema);
