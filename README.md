# 🛒 E-Commerce API (Phase 1)

A robust and scalable E-commerce RESTful API built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Phase 1: Category Management

In this phase, the core structure of the project was established along with the complete CRUD operations for Categories.

## 🛡️ Phase 1.1: Validation & Global Error Handling (Refined)

In this sub-phase, I moved the project from basic error responses to a professional, centralized error management system.

### ✅ Key Technical Implementations:

- **Centralized Global Error Middleware:** Developed a custom `globalError` handler to manage all application exceptions in one place.
- **Multi-Environment Configuration:** - **Development Mode:** Returns full error details (Stack Trace & Error Object) for efficient debugging.
  - **Production Mode:** Returns clean, user-friendly messages to ensure security and professional API output.
- **Cross-Platform Compatibility:** Integrated `cross-env` to manage `NODE_ENV` across different operating systems (Windows/macOS), ensuring stable environment switching.
- **Advanced Validator Integration:** Refactored `validatorMiddleware` to forward `express-validator` errors directly to the Global Error Handler using `next(err)`, maintaining a unified response format.

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
3. Start in Dev mode: `npm run dev` (Nodemon).
4. Start in Prod mode: `npm run prod` (Cross-env Production).

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

🚀 Phase 3: Brand Module Complete
In this phase, I implemented the full Brand management system, providing a dedicated space for managing manufacturers and designers within the e-commerce ecosystem.

🛠️ Key Technical Implementations:
Brand Resource CRUD: Developed complete endpoints for creating, retrieving, updating, and deleting brands.

Slugification: Integrated slugify to ensure all brand names are URL-friendly and SEO-optimized.

Data Integrity: Applied strict validation rules using express-validator to ensure unique names and valid MongoIDs.

Standardized Error Handling: Integrated with the global error middleware for consistent API responses.

### 🚦 API Endpoints (Brands)
| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/brands` | Create New Brand | Name (Req, Unique, 3-32 chars) |
| GET | `/api/v1/brands` | Get All Brands | Pagination Support (Page, Limit) |
| GET | `/api/v1/brands/:id` | Get Specific Brand | Valid MongoID |
| PUT | `/api/v1/brands/:id` | Update Brand | Valid MongoID + Optional Name |
| DELETE | `/api/v1/brands/:id` | Delete Brand | Valid MongoID |

🚀 Phase 4: Core Product Module & Data Relationships
In this milestone, I successfully implemented the central Product Module, which acts as the core engine of the e-commerce platform. This phase involved creating complex data relationships and rigorous validation logic to ensure data integrity across the system.

🛠️ Key Technical Achievements:
Relational Database Design: Leveraged Mongoose ObjectIds and ref to build a synchronized ecosystem where Products are strictly linked to Categories, SubCategories, and Brands.

Advanced Request Validation: Integrated express-validator to perform multi-layered checks, including a custom validator to ensure that priceAfterDiscount is logically lower than the original price.

Automated Slugification: Implemented automatic URL-friendly slug generation for product titles to enhance SEO and routing.

Dynamic Inventory Logic: Managed real-time fields for quantity and sold counts to track product availability and popularity.

Standardized CRUD Operations: Built high-performance endpoints for Product management with built-in pagination and error handling via a global middleware.

🧪 Sample Product Data (Tested via Postman):
I verified the implementation by creating real-world entities such as high-end electronics and fashion items, ensuring all relational IDs (Category/Brand) are correctly mapped in the database.

### 🚦 API Endpoints (Brands)
| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| POST | `/api/v1/products` | Create a new product | Title (3-100), Desc (min 20), Price, Category (Req), priceAfterDiscount < price |
| GET | `/api/v1/products` | Get list of all products | Pagination (page, limit) |
| GET | `/api/v1/products/:id` | Get specific product by ID | Valid MongoID format |
| PUT | `/api/v1/products/:id` | Update product details | Valid MongoID + Body Validation |
| DELETE | `/api/v1/products/:id` | Remove product from DB | Valid MongoID format |

✅ Phase 4.1: Enhanced Data Integrity & Cross-Model Validation
In this update, I implemented advanced validation logic to ensure strict data consistency between Products and Categories.

Database Existence Check: Integrated a custom asynchronous validator that queries the CategoryModel before product creation. This prevents orphaned products by ensuring the referenced categoryId actually exists in the database.

Asynchronous Error Handling: Utilized Promise.reject within express-validator to provide meaningful, real-time feedback to the API consumer in case of invalid references.

Security & Reliability: This layer of defense ensures that the backend remains the "Single Source of Truth," even if incorrect data is sent from the frontend.

✅ Phase 4.2: Advanced Subcategory Validation logic
Implemented complex relational validation to maintain strict data hierarchy.

Bulk Existence Check: Integrated the $in operator to validate multiple subcategoriesIds simultaneously against the database.

Length Consistency Verification: Added logic to compare result counts against input array length, ensuring every provided ID is valid before proceeding.

Relational Integrity: This ensures that products are always tagged with legitimate subcategories, preventing "ghost" references in the inventory system.

✅ Phase 4.3: Strict Relational Integrity Validation

Implemented a sophisticated validation layer to enforce strict hierarchical relationships between Categories and Subcategories.

Cross-Reference Validation: Developed a custom validator that verifies if the provided subcategoriesIds are logically linked to the parent categoryId in the database.

Array Integrity Check: Used functional programming patterns (.every()) to ensure 100% compliance for multi-item subcategory inputs.

Error Precision: Engineered specific error responses to distinguish between "Invalid ID format" and "Logic Mismatch" (Subcategory not belonging to Category), significantly improving the developer experience for frontend integration.

## 🚀 Data Seeding & Development Environment

To streamline the development process and test the **MVC architecture**, I implemented a custom **Data Seeding Script**. This allows for populating the database with initial product data without manual entry.

### Key Features:
* **Automated Seeding**: A robust `seeder.js` script to bulk-insert products into MongoDB using Mongoose.
* **Data Integrity**: Integrated with **express-validator** to ensure all seeded products match the required schema and reference valid Category/Brand IDs.
* **Flexible CLI Commands**:
    * `node seeder.js -i`: To import data into the database.
    * `node seeder.js -d`: To safely clear the collection for a fresh start.

### Results:
* Successfully managed a hybrid database state with **11 products** (Real & Mock data).

🔍 Phase 4.4: Dynamic Query Intelligence & Advanced Filtration

In this phase, I elevated the API's capability from simple data retrieval to a Dynamic Search Engine capable of handling complex, real-world filtering scenarios.

Key Technical Achievements:
Advanced Filtering Engine: Engineered a custom logic to parse URL query parameters and support comparison operators like [gt], [gte], [lt], and [lte].

Regex-Powered Query Transformation: Implemented a sophisticated Regular Expression (Regex) mapping system that dynamically injects MongoDB operators ($) into the query object, bridging the gap between frontend requests and database execution.

Nested Bracket Notation Support: Solved the "Object-null prototype" challenge in Express by developing a recursive key-mapping strategy, ensuring that nested queries (e.g., ratingsAverage[gt]=4.5) are correctly interpreted as JSON objects by Mongoose.

Clean Query Execution: Integrated a "Field Exclusion" layer to sanitize req.query from operational parameters like page, sort, and limit before database interaction, ensuring 100% accurate filtration results.

Validation & Testing:

Postman Rigorous Testing: Verified the engine across multiple edge cases, confirming consistent 200 OK responses and accurate data subsets for price ranges and rating thresholds.

Log Transparency: Implemented detailed terminal logging for the "Final Mongo Query" to monitor database interactions in real-time during the development phase.

Results:
Successfully achieved a Result: 11 products match for broad queries and precise filtering for specific rating criteria (e.g., finding products with ratingsAverage > 4.5).

✅ Phase 4.5: Multi-Field Sorting Engine

In this stage, I enhanced the API's usability by implementing a flexible and intuitive sorting mechanism. This allows users to organize product data based on various criteria like price, popularity, or date.

Dynamic Sorting: Users can sort by any field in the Product model (e.g., price, sold, ratingsAverage).

Multi-Criteria Support: Engineered the logic to handle multiple sorting parameters simultaneously. By converting comma-separated URL strings into Mongoose-friendly space-separated values, users can now request complex sorts like ?sort=-sold,price (Most sold first, then cheapest).

Directional Control: Integrated support for ascending and descending orders using the - prefix (e.g., -price for most expensive).

Default Baseline: Established a default sorting rule (-createdAt) to ensure that new arrivals are always prioritized if no specific sort is requested.

✅ Phase 4.6: Advanced Field Limiting (Data Projection)

In this phase, I optimized the API response payload to improve performance and security.

Custom Projections: Enabled users to specify exactly which fields they want to retrieve (e.g., ?fields=title,price), significantly reducing network latency.

Sensitive Data Masking: Implemented an automated exclusion for internal fields like __v to ensure a clean and secure JSON output.

Negative Selection: Supported field exclusion syntax (e.g., ?fields=-price) to hide specific fields while showing everything else.

✅ Phase 4.7: Global Search Engine (Fuzzy Matching)

I developed a powerful search functionality that allows users to find products across multiple attributes.

Multi-Field Scan: The search engine doesn't just look at titles; it uses MongoDB's $or operator to scan both title and description simultaneously.

Regex-Powered Search: Instead of rigid exact matches, I implemented Regular Expressions (Regex) with the i option (case-insensitive). This allows for "Fuzzy Matching," where searching for gam will successfully return Gaming Laptop, Video Games, etc..

Query Sanitization: Integrated keyword into the filtering exclusion list to prevent the system from treating the search term as a static database field.

🌐 Phase 4.8: Infrastructure & Middleware Optimization

In this update, I focused on enhancing the API's performance, security, and developer experience by integrating industry-standard middlewares.

🛠️ Key Technical Implementations:

Cross-Origin Resource Sharing (CORS):

  Integrated the cors middleware to enable secure communication between the Backend (Node.js) and the Frontend (React).

  Configured pre-flight requests using app.options() to support all HTTP methods (GET, POST, PUT, DELETE).

Response Compression:

  Implemented compression middleware using Gzip. This significantly reduces the size of the JSON response payload, leading to faster data loading on the frontend and a better user experience, especially on slower networks.

Developer Workflow (Postman Automation):

  Optimized the testing workflow by implementing Postman Environment Variables.

  Using a centralized {{URL}} variable allows for seamless switching between Localhost and Production environments without manually updating every request.

### 🚦 Updated Server Architecture
| Middleware | Purpose | Benefit | 
| :--- | :--- | :--- | 
| CORS | `Cross-Origin Access` | Enables React/Frontend Integration |
| Compression | `Gzip Payload` | Faster Response Times |
| HPP | `Parameter Protection` | Prevents Query Pollution Attacks |
| Morgan | `Request Logging` | Real-time Development Monitoring |