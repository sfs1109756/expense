# Expense Tracker Application

This is a comprehensive expense tracker application built using Node.js, Express, MySQL, and React. It provides functionalities for managing incomes and expenses, tracking transactions, and displaying detailed statistics and graphs on the dashboard.

## Features

- User Authentication (Registration, Login)
- Income Management (Add, Update, Delete)
- Expense Management (Add, Update, Delete)
- Transaction Tracking
- Dashboard with detailed statistics and graphs
- Responsive design with a user-friendly interface

## Technologies Used

- **Backend:** Node.js, Express, MySQL
- **Frontend:** React, Axios, React Router
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** CSS (Feel free to integrate any CSS framework like Bootstrap, Material-UI, etc.)

## Installation

### Prerequisites

- Node.js and npm installed
- MySQL installed and running

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/expense-tracker.git
    cd expense-tracker/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the MySQL database:

    ```sql
    CREATE DATABASE expense_tracker;

    -- Use the provided SQL script to create tables and relationships
    -- Run the script in your MySQL client
    ```

4. Create a `.env` file in the `backend` directory and add the following environment variables:

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

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd ../frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

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

You can add and run tests using a testing framework like Jest for backend and React Testing Library for frontend. Detailed instructions for setting up tests will be added later.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the creators of Node.js, Express, React, and MySQL for their awesome tools.
- Thanks to the open-source community for their contributions and support.

Feel free to enhance this README with more details as your project evolves!
