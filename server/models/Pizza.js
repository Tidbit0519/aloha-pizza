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

export default mongoose.model("Pizza", pizzaSchema);
