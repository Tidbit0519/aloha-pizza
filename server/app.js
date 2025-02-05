import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { connectDB, swaggerSpec } from "./config/index.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
connectDB();

app.get("/", (req, res) => {
    res.send("API is running");
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in on port ${PORT}`);
});