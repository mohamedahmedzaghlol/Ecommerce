# 🛒 E-Commerce API (Phase 1)

A robust and scalable E-commerce RESTful API built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Phase 1: Category Management

In this phase, the core structure of the project was established along with the complete CRUD operations for Categories.

### ✅ Features Completed:

- **Project Setup:** Initialized the environment with Node.js and Express.
- **Database Integration:** Connected to MongoDB using Mongoose with a clean singleton pattern.
- **Category Model:** Created a Mongoose schema for categories including:
  - Validation for name (Required, Unique, Length).
  - Auto-generated Slugs (using `slugify`).
  - Timestamps.
- **RESTful API Routes:** - `POST /api/v1/categories` - Create a new category.
  - `GET /api/v1/categories` - Get all categories (with Pagination support).
  - `GET /api/v1/categories/:id` - Get a specific category by ID.
  - `PUT /api/v1/categories/:id` - Update an existing category.
  - `DELETE /api/v1/categories/:id` - Delete a category.
- **Error Handling:** - Implemented a custom `ApiError` class.
  - Global Error Handling Middleware for centralized error management.
- **Code Quality:** Configured ESLint (Airbnb style) and Prettier for clean and consistent code.

### 🛠️ Tech Stack:

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Tools:** Postman (for testing), Git & GitHub (for version control), Dotenv (for env variables).

---

## ⚙️ Environment Variables

To run this project, you will need to create a `.env` file and add the following:

- `PORT=3000`
- `DB_URL=your_mongodb_connection_string`
- `NODE_ENV=development`

---

## 🏃 How to Run:

1. Clone the repo.
2. Run `npm install`.
3. Start the server using `npm run dev` (Nodemon).

### 🛡️ Phase 1.1: Validation & Security Layer
To ensure data integrity and prevent server crashes, a robust validation layer was implemented using **express-validator**.

- **Schema-Based Validation:** Created dedicated validators for all Category routes (Create, Update, Delete, Get).
- **Custom Middleware:** Developed a `validatorMiddleware` to intercept requests, catch validation errors, and return clear JSON responses.
- **Data Protection:** - Validating MongoDB IDs using `isMongoId()` to prevent cast errors.
  - Enforcing string length constraints (Min: 3, Max: 32).
  - Sanitizing inputs to ensure clean data reaches the database.
- **Global Error Handling:** Integrated a centralized error handling mechanism to manage operational errors gracefully.

---

### 🚦 API Endpoints (Updated)
| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/categories` | Create Category | Name (Req, Unique, 3-32 chars) |
| GET | `/api/v1/categories` | Get All | Pagination Support |
| GET | `/api/v1/categories/:id` | Get Specific | Valid MongoID |
| PUT | `/api/v1/categories/:id` | Update | Valid MongoID + Name |
| DELETE | `/api/v1/categories/:id` | Delete | Valid MongoID |
