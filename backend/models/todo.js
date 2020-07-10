const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	action: {
		type: String,
		required: [true, "The todo tetx field is required"]
	},
	done: {
		type: Boolean,
		required: [true, ""],
		default: false
	}
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;