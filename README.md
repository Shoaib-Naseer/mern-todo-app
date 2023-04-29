# MERN Todo App

This is a simple Todo app built with the MERN stack.

## Installation

To install the app, follow these steps:

1. Clone the repo: `git clone https://github.com/Shoaib-Naseer/mern-todo-app.git`
2. Change into the project directory: `cd mern-todo-app`
3. Install dependencies: `npm install`

## Usage

### before usage

Must include this in .env file

1. MONGO_URL = mongodb+srv://shoaib:103219@cluster0.6bk6n.mongodb.net/todo-cowlar?retryWrites=true&w=majority
2. PORT = 5000

To run the app using Docker, follow these steps:

1. In Backend Directory run: `npm run start`
2. In the Frontend Directory run: `npm run start`
3. Open your browser and navigate to `http://localhost:3000`

OR

1. Build the images: `docker-compose build`
2. Start the containers: `docker-compose up`
3. Open your browser and navigate to `http://localhost:3000`

## Features

This Todo app allows users to:

- Create new tasks
- Update existing tasks
- Mark tasks as completed
- Delete tasks

## Technologies Used

This app was built using:

- MongoDB
- Express
- React
- Node.js
- Docker

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature

## Docker

This app includes Dockerfiles for both the backend and frontend, as well as a Docker Compose file for running the app.

### Backend Dockerfile

The `backend/Dockerfile` file includes the following steps:

1. Install dependencies
2. Copy the app files to the container
3. Expose port 5000
4. Start the server

### Frontend Dockerfile

The `frontend/Dockerfile` file includes the following steps:

1. Install dependencies
2. Copy the app files to the container
3. Expose port 3000
4. Start the client

### Docker Compose

The `docker-compose.yaml` file includes the following services:

- `backend`: runs the backend server container, linked to the `mongo` container
- `frontend`: runs the frontend client container, linked to the `backend` container
