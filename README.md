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

🚀 Phase 2: SubCategory Complete CRUD & Validation

In this phase, I successfully implemented the full CRUD operations for the SubCategory module, ensuring a robust and secure data flow between the client and the MongoDB database.

🛠️ Key Technical Implementations:

Full CRUD Operations: Developed functional endpoints for Creating, Reading (List & Single), Updating, and Deleting sub-categories.

Advanced Validation Layer: Integrated express-validator to perform schema-level checks and ensure isMongoId format for category references, preventing database errors.

Centralized Error Handling: Leveraged a custom ApiError class and global error middleware to handle 404s and async exceptions gracefully.

Pagination & Logic: Applied dynamic pagination (page & limit) and used slugify to maintain SEO-friendly URLs during both creation and updates.

### 🚦 API Endpoints (Updated)
| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/subcategories` | Create Category | Name (Req, Unique, 2-32 chars) |
| GET | `/api/v1/subcategories` | Get All | Pagination Support |
| GET | `/api/v1/subcategories/:id` | Get Specific | Valid MongoID |
| PUT | `/api/v1/subcategories/:id` | Update | Valid MongoID + Name |
| DELETE | `/api/v1/subcategories/:id` | Delete | Valid MongoID |

🔄 Phase 2.5: Advanced Nested Routing & Relationship Logic
In this phase, I enhanced the API's flexibility by implementing Nested Routing. This allows for a more hierarchical and intuitive way to manage the relationship between Categories and SubCategories, similar to real-world E-commerce structures.

🛠️ Key Technical Implementations:

Route Merging: Leveraged mergeParams: true in Express Router to allow the SubCategory module to access parameters (like categoryId) defined in the parent Category routes.

Dynamic Filter Middleware: Developed a reusable createFilterObj middleware that automatically detects if a request is coming from a nested route and filters the database results accordingly.

Automated Data Linking: Implemented setCategoryIdToBody middleware to automatically extract the categoryId from the URL and inject it into the request body, ensuring seamless sub-category creation without redundant input.

Enhanced UX for Developers: This structure allows the Frontend to fetch all sub-categories belonging to a specific category using a single, clean URL.

### 🚦 API Endpoints (Nested Routes)
| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| GET | `/api/v1/categories/:categoryId/subcategories` | Get SubCategories for Category | Valid Category MongoID |
| POST | `/api/v1/categories/:categoryId/subcategories` | Create SubCategory on Category |Name (Req), Category ID from URL Name |
