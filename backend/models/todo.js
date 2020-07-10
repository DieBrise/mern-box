const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	action: {
		type: String,
		required: [true, "The todo text field is required"]
	},
	done: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

const Todo = mongoose.model('todo', TodoSchema);

module.exports = Todo;