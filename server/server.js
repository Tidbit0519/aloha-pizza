import app from "./app.js";
import { dbConnect } from "./config/index.js";
import dotenv from "dotenv";

dotenv.config();
dbConnect();

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
