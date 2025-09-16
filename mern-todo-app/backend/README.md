# MERN Todo Application

This project is a simple Todo application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, read, update, and delete todo items.

## Backend Setup

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Set up your MongoDB connection in `backend/src/config/db.js`. Make sure to replace the placeholder with your actual MongoDB connection string.

4. Start the server:
   ```
   npm start
   ```

The backend server will run on `http://localhost:5000`.

## API Endpoints

### Todos
- **GET /todos**: Retrieve all todos.
- **POST /todos**: Create a new todo.
- **PUT /todos/:id**: Update an existing todo by ID.
- **DELETE /todos/:id**: Delete a todo by ID.

## Frontend Setup

### Prerequisites
- Node.js

### Installation
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the frontend application:
   ```
   npm start
   ```

The frontend application will run on `http://localhost:3000`.

## Project Structure

```
mern-todo-app
├── backend
│   ├── src
│   │   ├── server.js
│   │   ├── models
│   │   │   └── Todo.js
│   │   ├── routes
│   │   │   └── todos.js
│   │   └── config
│   │       └── db.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   └── TodoList.js
│   │   └── api
│   │       └── todos.js
│   ├── package.json
│   └── README.md
└── README.md
```

## License
This project is licensed under the MIT License.