const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    complated: {
        type: Boolean,
        default: false
    }
})

module.exports = User = model('todos', TodoSchema);