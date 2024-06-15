# Expense Tracker Backend

This is the backend for a comprehensive expense tracker application built using Node.js, Express, and MySQL. It provides functionalities for managing incomes and expenses, tracking transactions, and providing detailed statistics.

## Features

- User Authentication (Registration, Login)
- Income Management (Add, Update, Delete)
- Expense Management (Add, Update, Delete)
- Transaction Tracking
- API Endpoints for managing expenses and incomes
- JWT-based authentication

## Technologies Used

- **Backend:** Node.js, Express, MySQL
- **Authentication:** JSON Web Tokens (JWT)

## Installation

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/sfs1109756/expense.git
    cd expense-tracker
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the MySQL database:

    ```sql
    CREATE DATABASE expense_tracker;

    -- Use the provided SQL script to create tables and relationships check database.sql
    -- Run the script in your MySQL client
    ```

4. Create a `.env` file in the `root` directory and add the following environment variables:

    ```env
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    DB_NAME=expense_tracker
    JWT_SECRET=your-jwt-secret
    PORT=3000
    ```

5. Start the backend server:

    ```bash
    npm start
    ```

## API Endpoints

### Authentication

- **POST /api/auth/register**
  - Registers a new user.
  - Request body: `{ "username": "testuser", "password": "password123" }`

- **POST /api/auth/login**
  - Logs in a user and returns a JWT token.
  - Request body: `{ "username": "testuser", "password": "password123" }`

### Income

- **POST /api/income/add**
  - Adds a new income.
  - Request body: `{ "amount": 5000, "source": "Salary", "description": "Monthly salary" }`

- **PUT /api/income/update**
  - Updates an existing income.
  - Request body: `{ "income_id": 1, "amount": 6000, "source": "Salary", "description": "Updated monthly salary" }`

- **DELETE /api/income/delete**
  - Deletes an income.
  - Request body: `{ "income_id": 1 }`

- **GET /api/income**
  - Retrieves all incomes for the authenticated user.

### Expense

- **POST /api/expenses/add**
  - Adds a new expense.
  - Request body: `{ "amount": 1500, "category": "Groceries", "description": "Weekly groceries" }`

- **PUT /api/expenses/update**
  - Updates an existing expense.
  - Request body: `{ "expense_id": 1, "amount": 1600, "category": "Groceries", "description": "Updated weekly groceries" }`

- **DELETE /api/expenses/delete**
  - Deletes an expense.
  - Request body: `{ "expense_id": 1 }`

- **GET /api/expenses**
  - Retrieves all expenses for the authenticated user.

### Dashboard

- **GET /api/dashboard/stats**
  - Retrieves statistics for the dashboard, including total income, total expense, net savings, income by category, and expense by category.

### Transactions

- **GET /api/transactions**
  - Retrieves all transactions for the authenticated user.

## Running Tests

You can add and run tests using a testing framework like Jest. Detailed instructions for setting up tests will be added later.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the creators of Node.js, Express, and MySQL for their awesome tools.
- Thanks to the open-source community for their contributions and support.

Feel free to enhance this README with more details as your project evolves!
