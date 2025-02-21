import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/index.js";
import { toppingRouter, pizzaRouter } from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
	res.send("API is running");
});
app.use("/api/toppings", toppingRouter);
app.use("/api/pizzas", pizzaRouter);

app.use(errorHandler);

export default app;
