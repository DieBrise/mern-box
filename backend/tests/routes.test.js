const request = require('supertest');
const app = require('../index');

describe('Todo CRUD Endpoints', () => {
	it('should create a new Todo post', async () => {
		const res = await request(app)
			.post('/api/todos/create')
			.send({
				action: "Test Todo Item"
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('todo');
	});
})