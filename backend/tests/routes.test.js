const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');

const Todo = require('../models/todo');

describe('Todo CRUD Endpoints', () => {
	beforeAll(async () => { await Todo.remove(); });
	it('should create a new Todo post', async () => {
		const res = await request(app)
			.post('/api/todos/create')
			.send({
				action: 'Test Todo Item',
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('_id');
	});

	afterAll(async () => {
		const { todos } = mongoose.connection.collections;
		await todos.drop();
		await mongoose.disconnect();
	});
});
