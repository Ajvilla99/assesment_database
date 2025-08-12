# 📚 Backend Performance Test Base

## 🚀 Technologies Used

- Node.js
- Express.js
- pg
- pg-format
- swagger-jsdoc
- swagger-ui-express
- Dotenv

## 📁 Project Structure

```
  ├── app.js
  ├── config
  │   └── db.js
  ├── controllers
  │   ├── billing.controller.js
  │   ├── loans.controller.js
  │   └── users.controller.js
  ├── data
  │   ├── billing.csv
  │   ├── data.xlsx
  │   ├── transaction.csv
  │   └── users.csv
  ├── docs
  │   ├── api.docs.json
  │   └── script.pg.sql
  ├── package.json
  ├── package-lock.json
  ├── README.md
  ├── routes
  │   ├── billing.route.js
  │   ├── index.js
  │   ├── transaction.route.js
  │   └── users.route.js
  └── seed
      ├── billing_seed.js
      ├── index.js
      ├── transaction_seed.js
      └── users_seed.js
```

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ajvilla99/[repo]
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with your database credentials and any other required environment variables. Example:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db
```

## ⚙️ Useful Commands

- Run all seeders:
  ```bash
  npm run seed
  ```
- Test database connection:
  ```bash
  npm run test:db
  ```

## 🖥️ Running the Server

- Start the server:
  ```bash
  npm run start
  ```
  
## 📖 API Documentation

- Once the server is running, access the Swagger UI at:  
  [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 🧩 API Endpoints Overview

| Method | Endpoint         | Description             |
| ------ | ----------------| ----------------------- |
| GET    | /billings       | List all billings       |
| GET    | /billings/:id   | Get billing by ID       |
| POST   | /billings       | Create a new billing    |
| PATCH  | /billings/:id   | Update billing by ID    |
| DELETE | /billings/:id   | Delete billing by ID    |
| GET    | /users          | List all users          |
| POST   | /users          | Create a new user       |
| ...    | ...             | ...                     |

## 🗄️ Database

- The SQL script to create the database schema is located at `docs/script.pg.sql`.

## 📝 Notes

- Make sure PostgreSQL is running and accessible with the credentials provided in your `.env` file.
- Data for initial seeding is located in the `data` folder as CSV files.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---
