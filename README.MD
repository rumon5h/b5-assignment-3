# A Library Management API with Express, TypeScript & MongoDB

A **robust**, **TypeScript-powered** RESTful API for managing books and borrowing records in a library system. Built with **Express.js**, **MongoDB**, and **Mongoose**.

🌐 **Live Link**: [Live Link](https://b5-assignment-3-silk.vercel.app/)

---

## Features

* Book creation with validation
* ISBN uniqueness enforced
* Genre filtering & sorting
* Update & delete book records
* Borrow books with quantity validation
* Automatically updates book availability and copies
* Aggregated summary of total borrowed books
* Clean response
* Well-structured TypeScript backend
* Ready for production with Vercel deployment

---

## Tech Stack

* Backend: Express.js, TypeScript
* Database: MongoDB using Mongoose

## API Endpoints

### 1. Create a Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 10
}
```
### 2. Get All Books

**GET** `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

### 3. Get Book by ID

**GET** `/api/books/:bookId`

### 4. Update a Book

**PATCH** `/api/books/:bookId`

### 5. Delete a Book

**DELETE** `/api/books/:bookId`

### 6. Borrow a Book

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

- Checks available copies  
- Marks availability and return result based on availability

**GET** `/api/borrow`

Returns total borrowed quantities per book:
