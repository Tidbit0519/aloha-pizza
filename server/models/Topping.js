import mongoose from 'mongoose';

const toppingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

export default mongoose.model('Topping', toppingSchema);