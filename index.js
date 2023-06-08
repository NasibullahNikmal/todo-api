const express = require("express");
const app = express();

// Port configuration
const port = process.env.PORT || 5000;

// Connect Database
const connectDB = require('./Database/database');
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Configure Routes
app.use('/api/todos', require('./routes/todo'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});