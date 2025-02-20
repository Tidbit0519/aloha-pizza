import request from "supertest";
import mongoose, { Schema } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";

const mockToppings = [
	{ name: "pepperoni" },
	{ name: "mushrooms" },
	{ name: "onions" },
];

describe("Topping API", () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri());
	});

	afterEach(async () => {
		await mongoose.connection.db.dropDatabase();
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	describe("GET /api/toppings", () => {
		it("should return a list of all toppings", async () => {
			const response = await request(app).get("/api/toppings");
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBeTruthy();
		});

		it("should return a list of toppings that match the search query", async () => {
			await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[0].name });
			await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[1].name });
			await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[2].name });

			const response = await request(app).get(
				`/api/toppings?name=${mockToppings[0].name}`
			);
			expect(response.status).toBe(200);
			expect(response.body.length).toBe(1);
			expect(response.body[0].name).toBe(mockToppings[0].name);
		});
	});

	describe("POST /api/toppings", () => {
		it("should return an error if name is missing", async () => {
			const response = await request(app).post("/api/toppings");
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Name is required");
		});

		it("should create a mock topping", async () => {
			const response = await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[0].name });
			expect(response.status).toBe(201);
			expect(response.body.topping.name).toBe(mockToppings[0].name);
		});

		it("should return an error if topping already exists", async () => {
			await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[0].name });

			const response = await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[0].name });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe(
				`${mockToppings[0].name} already exists`
			);
		});
	});

	describe("PUT /api/toppings/:id", () => {
		it("should return an error if name is missing", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app).put(`/api/toppings/${objId}`);
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Name is required");
		});

		it("should return an error if id is invalid", async () => {
			const response = await request(app)
				.put("/api/toppings/123")
				.send({ name: mockToppings[0].name });
			expect(response.status).toBe(500);
		});

		it("should return an error if topping is not found", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app)
				.put(`/api/toppings/${objId}`)
				.send({ name: mockToppings[0].name });
			expect(response.status).toBe(404);
			expect(response.body.message).toBe("Topping not found");
		});

		it("should update the topping if found", async () => {
			const newToppingObj = await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[0].name });

			const response = await request(app)
				.put(`/api/toppings/${newToppingObj.body.topping._id}`)
				.send({ name: mockToppings[1].name });
			expect(response.status).toBe(200);
			expect(response.body.topping.name).toBe(mockToppings[1].name);
		});

		it("should return an error if topping already exists", async () => {
			const newToppingObj1 = await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[0].name });
			await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[1].name });

			const response = await request(app)
				.put(`/api/toppings/${newToppingObj1.body.topping._id}`)
				.send({ name: mockToppings[1].name });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe(
				mockToppings[1].name + " already exists"
			);
		});
	});

	describe("DELETE /api/toppings/:id", () => {
		it("should return an error if id is invalid", async () => {
			const response = await request(app).delete("/api/toppings/123");
			expect(response.status).toBe(500);
		});

		it("should return an error if topping is not found", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app).delete(`/api/toppings/${objId}`);
			expect(response.status).toBe(404);
			expect(response.body.message).toBe("Topping not found");
		});

		it("should delete the topping if found", async () => {
			const newToppingObj = await request(app)
				.post("/api/toppings")
				.send({ name: mockToppings[0].name });

			const response = await request(app).delete(
				`/api/toppings/${newToppingObj.body.topping._id}`
			);
			expect(response.status).toBe(200);
			expect(response.body.message).toBe(
				mockToppings[0].name + " deleted successfully"
			);
		});
	});
});
