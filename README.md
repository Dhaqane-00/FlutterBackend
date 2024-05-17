flutter_backend
Description

This project serves as the backend for a Flutter application. It is built using Node.js, Express, and MongoDB, with additional libraries for security, API documentation, and development tools.
Table of Contents

    Installation
    Usage
    Dependencies
    Dev Dependencies
    Author
    License

Installation

To get started with this project, follow these steps:

    Clone the repository:

    bash

git clone https://github.com/your-username/flutter_backend.git

Navigate to the project directory:

bash

cd flutter_backend

Install the dependencies:

bash

npm install

Create a .env file in the root of the project and add your environment variables:

plaintext

    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret

Usage

To start the server in development mode, use the following command:

bash

npm start

This will use nodemon to watch for file changes and automatically restart the server.
Dependencies

    bcryptjs: ^2.4.3
    cookie-parser: ^1.4.6
    cors: ^2.8.5
    dotenv: ^16.4.5
    express: ^4.19.2
    jsonwebtoken: ^9.0.2
    mongoose: ^8.3.4
    morgan: ^1.10.0
    swagger-jsdoc: ^6.2.8
    swagger-ui-express: ^5.0.0

Dev Dependencies

    nodemon: ^3.1.0

Author

Dhaqane
License

This project is licensed under the ISC License.
API Documentation

The API documentation is generated using Swagger. Once the server is running, you can access the documentation at:

bash

http://localhost:5000/api-docs

Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.
Contact

For any inquiries or questions, please contact Dhaqane.