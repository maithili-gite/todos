# MERN Todo App

This project is a simple Todo application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, read, update, and delete todo items.

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend will be running on `http://localhost:3000`.

## API Integration

The frontend communicates with the backend API to manage todos. The API endpoints are defined in the backend and can be accessed as follows:

- **GET /todos**: Fetch all todos
- **POST /todos**: Add a new todo
- **PUT /todos/:id**: Update an existing todo
- **DELETE /todos/:id**: Delete a todo

## Components

- **App.js**: The main component that sets up routing and layout.
- **TodoList.js**: A component that fetches and displays the list of todos.

## Additional Notes

Make sure the backend server is running on `http://localhost:5000` for the frontend to communicate with it successfully.