const API_URL = 'http://localhost:5000/books';

// Function to fetch books with pagination
function fetchBooks(page = 1, limit = 10) {
    let url = `${API_URL}?page=${page}&limit=${limit}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayBooks(data))
        .catch(error => console.error('Error:', error));
}

// Function to display books
function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author} (Genre: ${book.genre}, Rating: ${book.rating || 'N/A'})`;
        bookList.appendChild(li);
    });
}

// Function to add a new book
document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        rating: parseFloat(document.getElementById('rating').value) || null
    };
    
    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(() => {
        fetchBooks();
        document.getElementById('addBookForm').reset();
    })
    .catch(error => console.error('Error:', error));
});

// Search by Genre
document.getElementById('searchGenre').addEventListener('click', function() {
    const genre = document.getElementById('filterGenre').value;
    if (!genre) return;
    fetch(`${API_URL}?genre=${genre}`)
        .then(response => response.json())
        .then(data => displayBooks(data))
        .catch(error => console.error('Error:', error));
});

// Search by Rating
document.getElementById('searchRating').addEventListener('click', function() {
    const rating = document.getElementById('filterRating').value;
    if (!rating) return;
    fetch(`${API_URL}?rating=${rating}`)
        .then(response => response.json())
        .then(data => displayBooks(data))
        .catch(error => console.error('Error:', error));
});

// Search by ID
document.getElementById('searchById').addEventListener('click', function() {
    const bookId = document.getElementById('searchBookId').value;
    if (!bookId) return;
    fetch(`${API_URL}/${bookId}`)
        .then(response => response.json())
        .then(book => {
            if (book) displayBooks([book]);
        })
        .catch(error => console.error('Error:', error));
});

// Handle pagination
let currentPage = 1;
document.getElementById('prevPage').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        fetchBooks(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', function() {
    currentPage++;
    fetchBooks(currentPage);
});

// Initial fetch
fetchBooks();
