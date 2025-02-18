import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";

describe("Pizza API", () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri());
	});

	afterAll((done) => {
		mongoose.connection.close();
		done();
	});

	describe("GET /api/pizzas", () => {
		it("should return a list of all pizzas", async () => {
			const response = await request(app).get("/api/pizzas");
			expect(response.status).toBe(200);
			expect(Array.isArray(response.body)).toBeTruthy();
		});
	});

	describe("POST /api/pizzas", () => {
		it("should return an error if name is missing", async () => {
			const response = await request(app).post("/api/pizzas");
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Name is required");
		});

		it("should return an error if toppings are missing", async () => {
			const response = await request(app)
				.post("/api/pizzas")
				.send({ name: "mock pizza" });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Toppings are required");
		});

		it("should create a mock pizza", async () => {
			const toppingObj = await request(app)
				.post("/api/toppings")
				.send({ name: "mock topping" });
			const response = await request(app)
				.post("/api/pizzas")
				.send({ name: "mock pizza", toppings: [{ _id: toppingObj.body._id }] });
			expect(response.status).toBe(201);
			expect(response.body.message).toBe("mock pizza created successfully");
		});

		it("should return an error if pizza already exists", async () => {
			const response = await request(app)
				.post("/api/pizzas")
				.send({ name: "mock pizza", toppings: [] });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("mock pizza already exists");
		});

		it("should return an error if topping is not found", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app)
				.post("/api/pizzas")
				.send({ name: "mock pizza 2", toppings: [{ _id: objId }] });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Topping not found");
		});
	});

	describe("PUT /api/pizzas/:id", () => {
		it("should return an error if name is missing", async () => {
			const response = await request(app).post("/api/pizzas");
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Name is required");
		});

		it("should return an error if toppings are missing", async () => {
			const response = await request(app)
				.post("/api/pizzas")
				.send({ name: "mock pizza" });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Toppings are required");
		});

		it("should return an error if id is invalid", async () => {
			const response = await request(app)
				.put("/api/pizzas/123")
				.send({ name: "mock pizza", toppings: [] });
			expect(response.status).toBe(500);
		});

		it("should return an error if pizza is not found", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app)
				.put(`/api/pizzas/${objId}`)
				.send({ name: "mock pizza", toppings: [] });
			expect(response.status).toBe(404);
			expect(response.body.message).toBe("Pizza not found");
		});

		it("should update the pizza if found", async () => {
			const pizzas = await request(app).get("/api/pizzas");
			const pizzaObj = pizzas.body[0];

			const toppings = await request(app).get("/api/toppings");
			const toppingObj = toppings.body[0];

			const response = await request(app)
				.put(`/api/pizzas/${pizzaObj._id}`)
				.send({ name: "mock pizza", toppings: [{ _id: toppingObj._id }] });
			expect(response.status).toBe(200);
			expect(response.body.message).toBe("mock pizza updated successfully");
		});

		it("should return an error if pizza already exists", async () => {
			// Two existing pizzas
			const pizzas = await request(app).get("/api/pizzas");
			const pizzaObj1 = pizzas.body[0];
			const pizzaObj2 = await request(app)
				.post("/api/pizzas")
				.send({ name: "mock pizza 2", toppings: [] });

			const response = await request(app)
				.put(`/api/pizzas/${pizzaObj1._id}`)
				.send({ name: pizzaObj2._body.name.name, toppings: [] });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("mock pizza 2 already exists");
		});

		it("should return an error if topping is not found", async () => {
			const pizzas = await request(app).get("/api/pizzas");
			const pizzaObj = pizzas.body[0];
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app)
				.put(`/api/pizzas/${pizzaObj._id}`)
				.send({ name: "mock pizza", toppings: [{ _id: objId }] });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Topping not found");
		});
	});

	describe("DELETE /api/pizzas/:id", () => {
		it("should return an error if id is invalid", async () => {
			const response = await request(app).delete("/api/pizzas/123");
			expect(response.status).toBe(500);
		});

		it("should return an error if pizza is not found", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app).delete(`/api/pizzas/${objId}`);
			expect(response.status).toBe(404);
			expect(response.body.message).toBe("Pizza not found");
		});

		it("should delete the pizza if found", async () => {
			const pizzas = await request(app).get("/api/pizzas");
			const pizzaObj = pizzas.body[0];
			const response = await request(app).delete(`/api/pizzas/${pizzaObj._id}`);
			expect(response.status).toBe(200);
		});
	});
});
