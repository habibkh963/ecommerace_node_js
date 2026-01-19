# E-Commerce Node.js API

A modern, RESTful API built with Node.js, Express, and MySQL for managing an e-commerce platform with multi-language support (English & Arabic).

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Middleware](#middleware)
- [Localization](#localization)
- [File Descriptions](#file-descriptions)
- [Dependencies](#dependencies)

---

## Project Overview

This is an e-commerce API that provides core functionalities for managing products, categories, and user authentication. It supports multi-language responses and uses JWT (JSON Web Tokens) for secure authentication. The project is built with Express.js and uses Sequelize ORM for MySQL database operations.

---

## Features

✅ **User Authentication**
- User registration with password hashing (bcrypt)
- User login with JWT token generation
- Secure password validation

✅ **Product Management**
- Create products with bilingual support (Arabic & English)
- Retrieve all products
- Product categorization
- Detailed product information (name, description, price)

✅ **Category Management**
- Create product categories
- Bilingual category names
- Organize products by category

✅ **Multi-Language Support**
- Automatic language detection from request headers
- Dynamic response messages in English or Arabic
- Bilingual data fields for products and categories

✅ **Security**
- JWT-based authentication
- Password encryption with bcrypt
- Input validation with express-validator

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MySQL
- **ORM**: Sequelize (v6.37.7)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt (v6.0.0)
- **Validation**: express-validator (v7.3.1)
- **Environment Management**: dotenv (v17.2.3)
- **Development Tool**: Nodemon (v3.1.11)

---

## Project Structure

```
ecommerace_node_js/
├── src/
│   ├── app.js                          # Express app configuration
│   ├── server.js                       # Server entry point
│   ├── config/
│   │   └── db.js                       # Database connection setup
│   ├── controllers/
│   │   ├── auth.controller.js          # Authentication logic
│   │   ├── categories.controller.js    # Category management logic
│   │   └── product.controller.js       # Product management logic
│   ├── locales/
│   │   ├── ar.js                       # Arabic translations
│   │   └── en.js                       # English translations
│   ├── middlewares/
│   │   └── lang.middleware.js          # Language detection middleware
│   ├── models/
│   │   ├── category.model.js           # Category Sequelize model
│   │   ├── product.model.js            # Product Sequelize model
│   │   └── user.model.js               # User Sequelize model
│   ├── routes/
│   │   ├── auth.routes.js              # Authentication routes
│   │   ├── categories.routes.js        # Category routes
│   │   └── product.routes.js           # Product routes
│   ├── services/                       # Business logic services (empty)
│   └── utils/
│       └── generate_token.js           # JWT token generation
└── package.json                        # Project dependencies
```

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd ecommerace_node_js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=ecommerce
   DB_USER=root
   DB_PASS=your_password
   JWT_SECRET=your_secret_key
   ```

---

## Configuration

### Database Configuration

The database is configured in [src/config/db.js](src/config/db.js):

- **Dialect**: MySQL
- **Connection Details**: Read from environment variables (`.env`)
- **Logging**: Disabled by default to avoid console clutter

**Environment Variables Required**:
- `DB_HOST`: MySQL server hostname (default: localhost)
- `DB_PORT`: MySQL server port (default: 3306)
- `DB_NAME`: Database name
- `DB_USER`: MySQL username
- `DB_PASS`: MySQL password
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 5000)

---

## Running the Project

### Development Mode (with Nodemon)

```bash
npm run dev
```

This command watches for file changes and automatically restarts the server.

### Production Mode

```bash
node src/server.js
```

### Expected Output

```
✅ Database connected
✅ Models synced
🚀 Server running on http://localhost:5000
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. User Registration
- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### 2. User Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Login an existing user
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Product Endpoints

#### 1. Create Product
- **Endpoint**: `POST /api/products`
- **Description**: Create a new product
- **Request Body**:
  ```json
  {
    "name_ar": "جوال ذكي",
    "name_en": "Smart Phone",
    "description_ar": "جوال حديث بمواصفات عالية",
    "description_en": "Modern phone with high specifications",
    "price": 999.99,
    "categoryId": 1
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "id": 1,
    "name_ar": "جوال ذكي",
    "name_en": "Smart Phone",
    "description_ar": "جوال حديث بمواصفات عالية",
    "description_en": "Modern phone with high specifications",
    "price": 999.99,
    "categoryId": 1
  }
  ```

#### 2. Get All Products
- **Endpoint**: `GET /api/products`
- **Description**: Retrieve all products
- **Response** (200 OK):
  ```json
  [
    {
      "id": 1,
      "name_ar": "جوال ذكي",
      "name_en": "Smart Phone",
      "price": 999.99,
      "categoryId": 1
    }
  ]
  ```

### Category Endpoints

#### 1. Create Category
- **Endpoint**: `POST /api/category`
- **Description**: Create a new product category
- **Request Body**:
  ```json
  {
    "name_ar": "الإلكترونيات",
    "name_en": "Electronics"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "id": 1,
    "name_ar": "الإلكترونيات",
    "name_en": "Electronics"
  }
  ```

### Health Check

#### API Status
- **Endpoint**: `GET /`
- **Description**: Check if API is running
- **Response** (200 OK):
  ```
  API is running 🚀
  ```

---

## Database Models

### User Model

**Table**: `users`

| Field    | Type    | Constraints           |
|----------|---------|----------------------|
| id       | INT     | Primary Key, Auto Increment |
| name     | STRING  | Not Null              |
| email    | STRING  | Unique, Not Null      |
| password | STRING  | Not Null (hashed)     |

### Category Model

**Table**: `categories`

| Field    | Type    | Constraints           |
|----------|---------|----------------------|
| id       | INT     | Primary Key, Auto Increment |
| name_ar  | STRING  | Not Null              |
| name_en  | STRING  | Not Null              |

### Product Model

**Table**: `products`

| Field          | Type    | Constraints           |
|----------------|---------|----------------------|
| id             | INT     | Primary Key, Auto Increment |
| name_ar        | STRING  | Not Null              |
| name_en        | STRING  | Not Null              |
| description_ar | TEXT    | Nullable              |
| description_en | TEXT    | Nullable              |
| price          | FLOAT   | Not Null              |
| categoryId     | INT     | Foreign Key (categories) |

### Relationships

- **Category → Product**: One-to-Many
  - One category can have many products
  - `Category.hasMany(Product)`
  - `Product.belongsTo(Category)`

---

## Authentication

### JWT Token Generation

The project uses JWT for secure authentication:

- **Token Generation**: [src/utils/generate_token.js](src/utils/generate_token.js)
- **Secret Key**: Stored in environment variable `JWT_SECRET`
- **Expiration**: 7 days
- **Algorithm**: HS256 (HMAC with SHA-256)

### Password Security

Passwords are hashed using bcrypt with a salt of 10 rounds before storage:

```javascript
const hashed = await bcrypt.hash(password, 10);
```

### Login Flow

1. User submits email and password
2. System retrieves user from database
3. Password is compared with stored hash using bcrypt
4. If valid, JWT token is generated and returned
5. Token should be included in subsequent requests for authorization

---

## Middleware

### Language Detection Middleware

**File**: [src/middlewares/lang.middleware.js](src/middlewares/lang.middleware.js)

**Purpose**: Automatically detect user's preferred language from request headers

**How It Works**:
1. Reads the `Accept-Language` header from incoming requests
2. If header starts with "ar", sets language to Arabic
3. Otherwise, defaults to English
4. Attaches language information to request object as `req.lang`
5. Attaches appropriate translation object to `req.t`

**Usage in Controllers**:
```javascript
// Returns appropriate error message in user's language
res.status(400).json({ message: req.t.EMAIL_EXISTS });
```

---

## Localization

The project supports English and Arabic responses.

### English Translations

**File**: [src/locales/en.js](src/locales/en.js)

Contains English translations for all API messages and error responses.

### Arabic Translations

**File**: [src/locales/ar.js](src/locales/ar.js)

Contains Arabic translations for all API messages and error responses.

### Translation Keys Used

- `EMAIL_EXISTS`: Email already registered
- `INVALID_CREDENTIALS`: Invalid email or password
- `SERVER_ERROR`: Internal server error

### How to Add New Translations

1. Add new key-value pair in both `en.js` and `ar.js`
2. Use in controllers via `req.t.KEY_NAME`

Example:
```javascript
// In en.js and ar.js
exports.PRODUCT_CREATED = "Product created successfully";

// In controller
res.status(201).json({ message: req.t.PRODUCT_CREATED, data: product });
```

---

## File Descriptions

### Core Files

| File | Purpose |
|------|---------|
| [src/server.js](src/server.js) | Server entry point, database connection, and server initialization |
| [src/app.js](src/app.js) | Express app configuration, middleware setup, and route mounting |

### Configuration

| File | Purpose |
|------|---------|
| [src/config/db.js](src/config/db.js) | Sequelize database connection and configuration |

### Controllers

| File | Purpose |
|------|---------|
| [src/controllers/auth.controller.js](src/controllers/auth.controller.js) | User registration and login logic |
| [src/controllers/product.controller.js](src/controllers/product.controller.js) | Product creation and retrieval logic |
| [src/controllers/categories.controller.js](src/controllers/categories.controller.js) | Category creation and management logic |

### Models

| File | Purpose |
|------|---------|
| [src/models/user.model.js](src/models/user.model.js) | User database model definition |
| [src/models/product.model.js](src/models/product.model.js) | Product database model with category relationship |
| [src/models/category.model.js](src/models/category.model.js) | Category database model definition |

### Routes

| File | Purpose |
|------|---------|
| [src/routes/auth.routes.js](src/routes/auth.routes.js) | Routes for registration and login |
| [src/routes/product.routes.js](src/routes/product.routes.js) | Routes for product CRUD operations |
| [src/routes/categories.routes.js](src/routes/categories.routes.js) | Routes for category CRUD operations |

### Utilities & Middleware

| File | Purpose |
|------|---------|
| [src/utils/generate_token.js](src/utils/generate_token.js) | JWT token generation utility |
| [src/middlewares/lang.middleware.js](src/middlewares/lang.middleware.js) | Language detection middleware |

### Localization

| File | Purpose |
|------|---------|
| [src/locales/en.js](src/locales/en.js) | English translation strings |
| [src/locales/ar.js](src/locales/ar.js) | Arabic translation strings |

---

## Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework for building REST APIs |
| sequelize | ^6.37.7 | ORM for MySQL database operations |
| mysql2 | ^3.16.1 | MySQL database driver |
| jsonwebtoken | ^9.0.3 | JWT token generation and verification |
| bcrypt | ^6.0.0 | Password hashing and verification |
| express-validator | ^7.3.1 | Input validation and sanitization |
| dotenv | ^17.2.3 | Environment variable management |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| nodemon | ^3.1.11 | Auto-restart server during development |

---

## npm Scripts

```json
{
  "dev": "nodemon src/server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

- **`npm run dev`**: Start development server with file watch
- **`npm test`**: Run tests (not yet implemented)

---

## Future Enhancements

- [ ] Implement remaining controller methods
- [ ] Add comprehensive input validation
- [ ] Implement authorization middleware for protected routes
- [ ] Add pagination for product listing
- [ ] Implement product filtering and search
- [ ] Add unit and integration tests
- [ ] Implement error handling middleware
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Implement caching mechanism
- [ ] Add logging system
- [ ] Implement rate limiting
- [ ] Add order management feature
- [ ] Add payment integration

---

## License

ISC

---

## Author

Your Name/Organization

---

## Support

For issues, questions, or contributions, please open an issue or submit a pull request.
