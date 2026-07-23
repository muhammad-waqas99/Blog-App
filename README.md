# iBlog - Full Stack Blogging Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://blog-app-silk-seven.vercel.app/)

A full-stack blogging platform built with Node.js, Express, MongoDB, and EJS that allows users to create, manage, and interact with blog posts. The application includes authentication, user profiles, image uploads using Cloudinary, and a commenting system.

---

## Badges

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B8860B?style=for-the-badge&logo=ejs&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/JWT_Auth-black?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [Image Upload System](#image-upload-system)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## Features

### Authentication
- User signup with validation
- Secure user login and logout
- Cookie-based JSON Web Token (JWT) session persistence
- Hashed password handling
- Protected routes using Express authentication middleware

### Blog Management
- Create blog posts with title, body, and cover image
- Upload blog cover images directly to Cloudinary
- View all published blogs in a dynamic grid layout
- View individual blog detail pages with author info and formatted date
- Display user-specific blogs on user profiles

### Profile Management
- Comprehensive profile dashboard
- Update display name / username
- Change password securely
- Update profile picture

### Comments System
- Add comments on individual blog posts
- Display comments chronologically with author details and timestamps

### Image Upload
- Multer memory storage buffers uploaded files in RAM
- Direct upload streaming to Cloudinary via Cloudinary API
- Cloudinary secure image URLs stored directly in MongoDB document schema
- Eliminates local filesystem reliance for seamless deployment in serverless environments like Vercel

### User Experience
- Clean and responsive user interface built with Bootstrap
- Character counters and client-side validation on forms
- Clear error and status messaging across forms and pages

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend JavaScript runtime |
| Express.js | Server framework for routing and middleware |
| MongoDB | NoSQL document database |
| Mongoose | Object Data Modeling (ODM) library for MongoDB |
| EJS | Embedded JavaScript templating engine |
| Bootstrap | Responsive CSS UI framework |
| JavaScript | Full-stack application logic |
| Cloudinary | Remote cloud image storage and transformation |
| JWT / Cookies | Secure session management & authentication |
| Vercel | Production cloud deployment platform |

---

## Screenshots

<div align="center">

<table>
<tr>

<td align="center">
<h3>Home Page</h3>
<img src="https://github.com/user-attachments/assets/6654a729-ad82-47bf-a3f8-72ccf79d0992" width="350"/>
</td>

<td align="center">
<h3>Signup Page</h3>
<img src="https://github.com/user-attachments/assets/6561957e-0540-4bb5-88b1-04b1f766ccc1" width="350"/>
</td>

</tr>

<tr>

<td align="center">
<h3>Login Page</h3>
<img src="https://github.com/user-attachments/assets/a4a8b4ea-d32d-4234-be37-8291eaecd5be" width="350"/>
</td>

<td align="center">
<h3>Profile Page</h3>
<img src="https://github.com/user-attachments/assets/05ad9f8b-306b-40e6-9121-2c914ae2d051" width="350"/>
</td>

</tr>

<tr>

<td align="center" colspan="2">
<h3>Add Blog Page</h3>
<img src="https://github.com/user-attachments/assets/b902d8ef-e5c6-4827-b3bd-d3b98eb61c97" width="350"/>
</td>

</tr>

</table>

</div>
---

## Installation

To run this project locally, ensure you have Node.js and MongoDB installed on your system.

1. Clone the repository:
```bash
git clone https://github.com/muhammad-waqas99/Blog-App.git
```

2. Navigate into the project directory:
```bash
cd Blog-App
```

3. Install all dependencies:
```bash
npm install
```

4. Start the application:
```bash
npm start
```

---

## Environment Variables

Create a `.env` file in the root directory of your project and configure the following variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/blog-app
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## Project Structure

```
Blog-App/
│
├── middleware/
│   ├── authentication.js
│   └── user.js
│
├── models/
│   ├── Blog.js
│   ├── Comment.js
│   └── User.js
│
├── public/
│   └── images/
│
├── routes/
│   ├── blog.js
│   └── user.js
│
├── service/
│   ├── auth.js
│   ├── cloudinary.js
│   ├── multerConfig.js
│   └── uploadToCloudinary.js
│
├── views/
│   ├── partial/
│   │   ├── head.ejs
│   │   ├── nav.ejs
│   │   └── script.ejs
│   ├── addBlog.ejs
│   ├── blog.ejs
│   ├── changepassword.ejs
│   ├── home.ejs
│   ├── profile.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│   ├── updatename.ejs
│   └── updateprofileimage.ejs
│
├── index.js
├── package.json
└── README.md
```

---

## Authentication Flow

1. **User Registration:** The user provides registration credentials (name, email, password, and optional profile image).
2. **Password Hashing:** The password is securely hashed using bcrypt before storing in MongoDB.
3. **User Authentication:** Upon submitting valid credentials on the login route, a JSON Web Token (JWT) is generated containing essential user payload data.
4. **Cookie Persistence:** The generated token is stored in an HTTP cookie named `token`.
5. **Middleware Validation:** The `checkForAuthenticationCookie` middleware interceptor parses incoming requests, verifies the JWT token, and attaches the user payload to `req.user` and `res.locals.user`.
6. **Route Protection:** Protected routes (such as blog creation, commenting, and profile edits) verify user presence before granting access or processing actions.

---

## Image Upload System

- User avatar updates and blog cover images are processed in-memory using Multer memory storage.
- Files are uploaded directly to Cloudinary using the Cloudinary API.
- MongoDB stores the returned Cloudinary CDN image URLs rather than local file paths.
- Relying on Cloudinary eliminates local filesystem usage, making the application fully compatible with serverless deployment environments like Vercel.

---

## API Routes

### Public Routes
- `GET /` - Render homepage displaying all published blog posts
- `GET /user/signin` - Render signin page
- `POST /user/signin` - Authenticate user credentials
- `GET /user/signup` - Render signup page
- `POST /user/signup` - Register a new user account
- `GET /user/logout` - Clear authentication token cookie and redirect to homepage

### Blog Routes
- `GET /blog/add-new` - Render blog creation page (Protected)
- `POST /blog` - Create a new blog post with cover image upload (Protected)
- `GET /blog/:id` - Render individual blog detail page along with associated comments

### Comment Routes
- `POST /blog/comment/:blogId` - Post a comment on a specific blog post (Protected)

### Profile & Account Routes
- `GET /user/profile` - View profile page and user's created blogs (Protected)
- `GET /user/update-name` - Render form to update name (Protected)
- `POST /user/update-name` - Update user display name (Protected)
- `GET /user/update-password` - Render form to change password (Protected)
- `POST /user/update-password` - Change account password (Protected)
- `GET /user/update-profile-image` - Render form to update profile picture (Protected)
- `POST /user/update-profile-image` - Upload new user profile avatar to Cloudinary (Protected)

---

## Deployment

- **Hosting Platform:** Deployed on Vercel.
- **Database:** Hosted remotely on MongoDB Atlas cloud cluster.
- **Media Storage:** Integrated with Cloudinary for scalable image hosting.

---

## Future Improvements

- Blog likes and bookmarking feature
- Full-text search and category filtering
- Pagination and infinite scrolling on blog feeds
- Rich text editor (WYSIWYG) for blog content creation
- Admin dashboard for user and content moderation
- Email verification and password reset functionality

---

## Author

**Muhammad Waqas**

- **Email:** muhammadwaqas.dev99@gmail.com
- **LinkedIn** www.linkedin.com/in/waqas-fullstack
