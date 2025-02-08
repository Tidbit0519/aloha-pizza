# Aloha Pizza

Aloha Pizza is a full-stack application designed for managing a pizza store's offerings. It allows the store owner and pizza chefs to manage available toppings and create pizza masterpieces through an intuitive UI and a robust RESTful API. This project is built using the MERN stack (MongoDB, Express, React, Node.js) and is containerized with Docker for consistency across environments.

## Demo

A live demo of Aloha Pizza is available at:  
[AWS Demo](http://ec2-3-15-144-117.us-east-2.compute.amazonaws.com/)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Thought Process & Technical Choices](#thought-process--technical-choices)
- [License](#license)

## Features

- **Manage Toppings:** Create, view, update, and delete pizza toppings.
- **Manage Pizzas:** Create, view, update, and delete pizzas. Easily add or update pizza toppings.
- **Error Handling & Validation:** Prevent duplicate entries through backend validations with clear error messages in the UI.
- **Containerized Development:** Docker and Docker Compose provide a consistent development environment.
- **Automated Testing:** Both backend and frontend have test suites to ensure application reliability.

## Installation

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node v20+
- A code editor (e.g., VS Code)

### Environment Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Tidbit0519/aloha-pizza.git
   cd aloha-pizza
   ```

2. **Environment Variables:**

   - Create a `.env` file at the root of the project. This file should include all necessary environment variables for both the backend and frontend. For example:

     ```env
     # For Backend
     MONGODB_URI=mongodb://mongo:27017/aloha-pizza
     PORT=5000

     # For Frontend
     VITE_API_URL=http://localhost:5000/api
     ```

## Running The Application

Make sure Docker and Docker Compose are installed. Then, from the root of the project, run:

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

This command uses the development Docker Compose file to build and run your backend container. It sets up your environment based on the `.env` file and ensures your MongoDB instance, Node server, and React app are running.

Once the app is running, you can access the Swagger documentation at:
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

By default, the React app will run on [http://localhost:5173](http://localhost:5173)

## Running Tests

### Backend Tests

1. Navigate to the `server` directory:
   ```bash
   cd server
   npm i
   ```
2. Run tests using:
   ```bash
   npm run test
   ```
3. To view test coverage, open the generated `coverage/index.html` in your browser.

### Frontend Tests

1. Navigate to the `client` directory:
   ```bash
   cd client
   npm i
   ```
2. Run tests using:
   ```bash
   npm run test
   ```
   or, to run tests with coverage:
   ```bash
   npm run coverage
   ```
3. Open the `coverage/index.html` file to review the test coverage details.

## Thought Process & Technical Choices

- **MERN Stack:**  
  I am familiar with this tech stack and prefer its unified JavaScript environment, allowing consistency between the frontend and backend.

- **MVC Pattern (Backend):**  
  The backend is structured using the Model-View-Controller (model, controller, route) pattern, which helps maintain a clear separation of concerns. This improves maintainability and scalability as the application grows.

- **Component-Based Architecture (Frontend):**  
  React’s component-based design encourages reusability and modularity, making it easier to manage UI complexity and maintain consistency across the application.

- **Containerized Development:**  
  By using Docker and Docker Compose, the application environment is consistent across development and production. This minimizes the “works on my machine” problem and simplifies dependency management.

- **Environment Variables:**  
  Sensitive data and environment-specific configurations are stored in environment variables. This practice enhances security and allows easy configuration changes without modifying the codebase.

## License

This project is open source and available under the [MIT License](LICENSE).
