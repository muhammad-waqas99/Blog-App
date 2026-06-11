const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
require("dotenv").config();

const dns = require('dns')
dns.setServers(['1.1.1.1','8.8.8.8'])


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Error:");
    console.log(err);
});



const app = express();
const port = process.env.PORT ||3000;

const userRouter =require('./routes/user');
const blogRouter =require('./routes/blog');



const { checkForAuthenticationCookie } = require('./middleware/authentication');

const Blog = require('./models/Blog');

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve("./public")))
app.use((req, res, next) => {
  res.locals.error = req.flash?.error;
  next();
});



app.use(checkForAuthenticationCookie("token"))



app.use('/user' , userRouter)
app.use('/blog' , blogRouter)


app.get('/', async (req, res) => {
  const allBlogs = await Blog.aggregate([
    { $sample: { size: 100 } } 
  ]);

  res.render("home", {
    user: req.user,
    blogs: allBlogs
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});