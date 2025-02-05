import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in on port ${PORT}`);
});