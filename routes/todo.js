const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Todo = require('../Database/models/Todo');

// Create Todo
router.post('/',
    check('title', 'Enter todo title').not().isEmpty()
    , async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            let newTodo = new Todo({
                title: req.body.title,
                description: req.body.description,
                complated: req.body.complated
            })
            newTodo = await newTodo.save();

            res.status(201).json(newTodo);
        } catch (error) {
            console.log(error);
            res.status(500).send('Server error');
        }
    })

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();

        res.status(200).json(todos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

// Get todo by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id });

        res.status(200).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

// Update todo
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

        res.status(200).json(todo)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

// Delete todo
router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id });

        res.status(200).json(todo)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

module.exports = router;