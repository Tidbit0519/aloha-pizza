import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { connectDB, swaggerDocs } from "./config/index.js";
import { toppingRouter } from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get("/", (req, res) => {
    res.send("API is running");
});
app.use("/api/toppings", toppingRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in on port ${PORT}`);
});