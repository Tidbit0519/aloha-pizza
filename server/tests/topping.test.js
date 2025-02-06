import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";

describe('Topping API', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(done => {
        mongoose.connection.close();
        done();
    });

    describe('GET /api/toppings', () => {
        it('should return a list of all toppings', async () => {
            const response = await request(app).get('/api/toppings');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBeTruthy();
        });
    });

    describe('POST /api/toppings', () => {
        it('should return an error if name is missing', async () => {
            const response = await request(app).post('/api/toppings');
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Name is required');
        });

        it('should create a mock topping', async () => {
            const response = await request(app)
                .post('/api/toppings')
                .send({ name: 'mock topping' });
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('mock topping');
        });

        it('should return an error if topping already exists', async () => {
            const response = await request(app)
                .post('/api/toppings')
                .send({ name: 'mock topping' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Topping already exists');
        });
    });

    describe('PUT /api/toppings/:id', () => {
        it('should return an error if name is missing', async () => {
            const objId = new mongoose.Types.ObjectId()
            const response = await request(app).put(`/api/toppings/${objId}`)
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Name is required');
        });

        it('should return an error if id is invalid', async () => {
            const response = await request(app)
                .put('/api/toppings/123')
                .send({ name: 'pepperoni' });
            expect(response.status).toBe(500);
        });

        it('should return an error if topping is not found', async () => {
            const objId = new mongoose.Types.ObjectId()
            const response = await request(app)
                .put(`/api/toppings/${objId}`)
                .send({ name: 'pepperoni' });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Topping not found');
        });

        it('should update the topping if found', async () => {
            const toppingList = await request(app).get('/api/toppings');
            const toppingObj = toppingList.body[0];

            const response = await request(app)
                .put(`/api/toppings/${toppingList.body[0]._id}`)
                .send({ name: 'mock topping' });
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('mock topping');
        });

        it('should return an error if topping already exists', async () => {
            // Two existing toppings
            const toppingList = await request(app).get('/api/toppings');
            const toppingObj1 = toppingList.body[0];
            const toppingObj2 = await request(app).post('/api/toppings').send({ name: 'mock topping 2' });

            const response = await request(app)
                .put(`/api/toppings/${toppingObj1._id}`)
                .send({ name: 'mock topping 2' });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Topping already exists');
        });
    });

    describe('DELETE /api/toppings/:id', () => {
        it('should return an error if id is invalid', async () => {
            const response = await request(app).delete('/api/toppings/123');
            expect(response.status).toBe(500);
        });

        it('should return an error if topping is not found', async () => {
            const objId = new mongoose.Types.ObjectId()
            const response = await request(app).delete(`/api/toppings/${objId}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Topping not found');
        });

        it('should delete the topping if found', async () => {
            const toppingObj = await request(app)
                .post('/api/toppings')
                .send({ name: 'olive' });
            expect(toppingObj.status).toBe(201);
            expect(toppingObj.body.name).toBe('olive');

            const objId = toppingObj.body._id;
            const response = await request(app).delete(`/api/toppings/${objId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Topping deleted successfully');
        });
    });
});
