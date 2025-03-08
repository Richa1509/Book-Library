const express = require("express");
const { addBook, getBooks, getBookById } = require("../controllers/bookController");

const router = express.Router();

// Route to add a new book
router.post("/books", addBook);

// Route to get all books (with pagination & filters)
router.get("/books", getBooks);

// Route to get a single book by ID
router.get("/books/:id", getBookById);

module.exports = router;
