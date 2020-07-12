const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

router.get('/todos', (req, res, next) => {
	Todo.find({}, 'action done')
		.then(data => res.json(data))
		.catch(next);
});

router.get('/todos/:id', (req, res) => {
	Todo.findById(req.params.id)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Error: ' + err));
});

router.post('/todos/create', (req, res, next) => {
	if(req.body.action){
		Todo.create(req.body)
			.then(data => res.status(201).json(data))
			.catch(next);
	} else {
		res.json({
			error: "The input field is empty"
		});
	}
});

router.post('/todos/update', (req, res, next) => {
	Todo.findOneAndUpdate({"_id": req.body.id}, req.body, (err, doc) => {
		if (err) return res.send(500, {error: err});
		return res.send("Task updated");
	});
});

router.delete('/todos/:id', (req, res) => {
	Todo.findByIdAndDelete(req.params.id)
		.then(data => res.json(`Task ${data._id} deleted`))
		.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;