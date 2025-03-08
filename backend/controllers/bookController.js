const Book = require("../models/Book");

// @desc    Add a new book
// @route   POST /api/books
// @access  Public
const addBook = async (req, res) => {
    try {
        const { title, author, genre, rating } = req.body;

        // Validate required fields
        if (!title || !author || !genre) {
            return res.status(400).json({ message: "Title, author, and genre are required." });
        }

        // Ensure rating is between 1 and 5
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ message: "Rating must be between 1 and 5." });
        }

        const newBook = new Book({ title, author, genre, rating });
        await newBook.save();

        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get all books with optional filters
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
    try {
        const { genre, minRating, page = 1, limit = 10 } = req.query;
        let query = {};

        if (genre) query.genre = genre;
        if (minRating) query.rating = { $gte: Number(minRating) };

        const books = await Book.find(query)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc    Get a book by ID
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { addBook, getBooks, getBookById };
