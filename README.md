
# Docker-NodeJs-Mysql-CRUD

This project is a basic CRUD application built with Node.js, MySQL, and Docker. The application uses Docker Compose to manage the services (Node.js and MySQL).

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/) (optional, for running the backend locally)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## Getting Started

Follow the steps below to get the project up and running on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/ferlerrorr/Docker-NodeJs-Mysql-CRUD.git
```

### 2. Navigate to the backend directory and install dependencies

```bash
cd backend
npm install
```

### 3. Build the Docker images

Go back to the root directory and run the following command to build the Docker images:

```bash
cd ..
docker compose build
```

### 4. Start the services

Use Docker Compose to start the containers in detached mode:

```bash
docker compose up -d
```

### 5. Verify the services

- The Node.js application should now be running on `http://localhost:3000`
- MySQL will be running within a container as specified in the Docker Compose file.

### 6. Stopping the services

To stop the services, run:

```bash
docker compose down
```

## Usage

You can interact with the CRUD API by making requests to the Node.js server. The API will be running on `http://localhost:3000` and you can use tools like Postman or cURL to send HTTP requests.

## License

This project is licensed under the MIT License.
