import { dbConnect } from "../config/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

describe("Database connection", () => {
    beforeAll(async () => {
        await dbConnect();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should connect to the database", () => {
        expect(mongoose.connection.readyState).toBe(1);
    });
});