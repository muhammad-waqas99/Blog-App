iBlog is a full-stack blogging platform built with Node.js, Express, MongoDB, and EJS. It is designed to allow users to create, manage, and interact with blogs through a complete authentication-based system.

The application includes JWT-based authentication for secure login sessions and protected routes. Users can register, log in, and access personalized features only after authentication. Passwords are securely handled and stored, and session management is done using cookies.

Blog functionality includes creating posts with image uploads using Multer, viewing all blogs, and reading individual blog pages. Blogs are dynamically displayed with a randomized feed using MongoDB aggregation to improve content variety on the home page.

User profile management is fully implemented, allowing users to update their full name, password, and profile picture. Profile image updates also handle old image deletion from the server to manage storage efficiently.

The project uses Express middleware for authentication checks and user data handling across routes. A custom middleware system ensures req.user is available where needed without repetitive database queries.

Error handling is implemented across forms and routes, including validation errors, duplicate email handling, missing fields, and file upload errors. User feedback is shown through dynamic EJS-rendered messages.

File uploads are managed using Multer with local storage in a public directory. The project is structured using MVC principles with separate models for User, Blog, and Comment to keep the codebase organized and scalable.

The frontend is built using EJS templates and Bootstrap for a responsive and clean UI experience. The application is fully deployed on Railway with MongoDB Atlas as the database.

This project was developed to practice and demonstrate real-world full-stack development concepts including authentication, CRUD operations, middleware design, file uploads, deployment, and error handling.
