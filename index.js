const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/iblog')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));


const app = express();
const port = 3000;

const userRouter =require('./routes/user')

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: true }));

app.use('/user' , userRouter)


app.get('/', (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});