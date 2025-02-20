import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";

const mockToppings = [
	{ name: "pepperoni" },
	{ name: "mushrooms" },
	{ name: "onions" },
];

const mockPizzas = [
	{ name: "pepperoni pizza", toppings: [] },
	{ name: "mushroom pizza", toppings: [] },
	{ name: "onion pizza", toppings: [] },
];

describe("Pizza API", () => {
	beforeAll(async () => {
		const mongoServer = await MongoMemoryServer.create();
		await mongoose.connect(mongoServer.getUri());
	});

	afterEach(async () => {
		await mongoose.connection.db.dropDatabase();
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

		it("should create a mock pizza", async () => {
			const response = await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[0].name, toppings: [] });
			expect(response.status).toBe(201);
			expect(response.body.message).toBe(
				`${mockPizzas[0].name} created successfully`
			);
		});

		it("should return an error if pizza already exists", async () => {
			await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[0].name, toppings: [] });

			const response = await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[0].name, toppings: [] });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe(
				`${mockPizzas[0].name} already exists`
			);
		});

		it("should return an error if topping is not found", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[0].name, toppings: [objId] });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Topping not found");
		});
	});

	describe("PUT /api/pizzas/:id", () => {
		it("should return an error if name is missing", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app).put(`/api/pizzas/${objId}`);
			expect(response.status).toBe(400);
			expect(response.body.message).toBe("Name is required");
		});

		it("should return an error if id is invalid", async () => {
			const response = await request(app)
				.put("/api/pizzas/123")
				.send({ name: mockPizzas[0].name, toppings: [] });
			expect(response.status).toBe(500);
		});

		it("should return an error if pizza is not found", async () => {
			const objId = new mongoose.Types.ObjectId();
			const response = await request(app)
				.put(`/api/pizzas/${objId}`)
				.send({ name: mockPizzas[0].name, toppings: [] });
			expect(response.status).toBe(404);
			expect(response.body.message).toBe("Pizza not found");
		});

		it("should update the pizza if found", async () => {
			const newPizzaObj = await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[0].name, toppings: [] });

			const response = await request(app)
				.put(`/api/pizzas/${newPizzaObj.body.pizza._id}`)
				.send({ name: mockPizzas[1].name, toppings: [] });
			expect(response.status).toBe(200);
		});

		it("should return an error if pizza already exists", async () => {
			const newPizzaObj = await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[0].name, toppings: [] });
			await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[1].name, toppings: [] });

			const response = await request(app)
				.put(`/api/pizzas/${newPizzaObj.body.pizza._id}`)
				.send({ name: mockPizzas[1].name, toppings: [] });
			expect(response.status).toBe(400);
			expect(response.body.message).toBe(
				mockPizzas[1].name + " already exists"
			);
		});

		it("should return an error if topping is not found", async () => {
			const newPizzaObj = await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[0].name, toppings: [] });
			const objId = new mongoose.Types.ObjectId();

			const response = await request(app)
				.put(`/api/pizzas/${newPizzaObj.body.pizza._id}`)
				.send({ name: mockPizzas[0].name, toppings: [objId] });
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
			const newPizzaObj = await request(app)
				.post("/api/pizzas")
				.send({ name: mockPizzas[0].name, toppings: [] });

			const response = await request(app).delete(
				`/api/pizzas/${newPizzaObj.body.pizza._id}`
			);
			expect(response.status).toBe(200);
			expect(response.body.message).toBe(
				`${mockPizzas[0].name} deleted successfully`
			);
		});
	});
});
