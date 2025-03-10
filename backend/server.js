require('dotenv').config();
const connectDB = require('./config/db');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const { errorHandler } = require("./middleware/errorMiddleware");


const app = express();
app.use("/api", bookRoutes);

const PORT = process.env.PORT || 5000;


connectDB(); // Connect to MongoDB


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/books', bookRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Book Library API');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:$}`);
});
