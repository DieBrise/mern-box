process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../index');

const Todo = require('../models/todo');

let testId;

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

		testId = res.body._id;
	});

	it('should retrieve a list of Todo posts', async () => {
		const res = await request(app)
			.get('/api/todos');
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('length', 1);
	});

	it('should update a Todo post', async () => {
		const res = await request(app)
			.post('/api/todos/update')
			.send({
				id: testId,
				action: 'Updated Todo Item',
			});
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('success');
	});

	it('should retrieve a single Todo post', async () => {
		const res = await request(app)
			.get(`/api/todos/${testId}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty('action', 'Updated Todo Item');
	});

	it('should delete a single Todo post', async () => {
		const res1 = await request(app)
			.delete(`/api/todos/${testId}`);
		expect(res1.statusCode).toEqual(200);
		expect(res1.body).toHaveProperty('success');

		const res2 = await request(app)
			.get('/api/todos');
		expect(res2.statusCode).toEqual(200);
		expect(res2.body).toHaveProperty('length', 0);
	});

	afterAll(async () => {
		const { todos } = mongoose.connection.collections;
		await todos.drop();
		await mongoose.disconnect();
	});
});
