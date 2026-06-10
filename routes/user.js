const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
const upload = require("../service/multerConfig");
const fs = require("fs")
const multer  = require("multer")

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.render("signin", {
        error: "All fields are required",
      });
    }

    const token = await User.comparePasswordAndAuthentication(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("signin", {
      error: "Invalid email or password",
    });
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", upload.single("userProfileImage"), async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.render("signup", {
        error: "All fields are required",
      });
    }

const userData = {
   fullName,
   email,
   password
};

if (req.file) {
   userData.userProfileImage = `/uploads/${req.file.filename}`;
}

await User.create(userData);

    return res.redirect("/user/signin");
  } catch (err) {
    console.error(err);

    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0].message;

      return res.render("signup", {
        error: firstError,
      });
    }

    if (err.code === 11000) {
      return res.render("signup", {
        error: "Email already exists. Try another email.",
      });
    }

    return res.status(500).render("signup", {
      error: "Something went wrong. Please try again.",
    });
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

//User profile  and account manage routes

router.get("/profile", async (req, res) => {
  const userId = req.user._id;

  const createdBy = userId


    const userBlogs = await Blog.find({createdBy}).sort({ createdAt: -1 })
  console.log(userBlogs)

  const currentUser = await User.findById(userId);

 

  return res.render("profile", {
    user: currentUser,
    blogs:userBlogs
  });
});

router.get("/update-name", async (req, res) => {
  const userId = req.user._id;

  const currentUser = await User.findById(userId);

  res.render("updatename", {
    user: currentUser,
  });
});

router.post("/update-name", async (req, res) => {
  try {
    const { _id } = req.user;

    const fullName = req.body.fullName;

const newName = fullName.trim();

if (!newName) {
  return res.render("updatename", {
    user: req.user,
    error: "Name cannot be empty",
  });
}

if (newName.length < 3) {
  return res.render("updatename", {
    user: req.user,
    error: "Name must be at least 3 characters long",
  });
}

if (newName === req.user.fullName) {
  return res.render("updatename", {
    user: req.user,
    error: "Please enter a different name",
  });
}

    await User.findByIdAndUpdate(_id, {
      fullName: newName,
    });

    return res.redirect("/user/profile");
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0].message;

      return res.render("updatename", {
        error: firstError,
      });
    }

    return res.status(500).render("updatename", {
      error: "Something went wrong. Please try again.",
    });
  }
});





router.get('/update-password' , async (req,res) =>{
   
  const userId = req.user._id;

  const currentUser = await User.findById(userId);

  res.render("changepassword", {
    user: currentUser,
  });
})



router.post('/update-password' , async (req, res ) =>{


  const userId = req.user._id;


  const {currentPassword, newPassword, confirmPassword} =req.body




      if (!currentPassword || !newPassword || !confirmPassword) {
      return res.render("changepassword", {
        error: "All fields are required",
      });


    }

    if (currentPassword === newPassword) {
  return res.render("changepassword", {
    user,
    error: "New password cannot be the same as current password",
  });
}


   const password = currentPassword;

   console.log(password)




   const user = await User.findById(userId)
   const email = user.email

   console.log(user)


try {

  
   await User.comparePasswordAndAuthentication(email,password)

 


        if(newPassword !==confirmPassword) return res.render('changepassword' , {error : " New password and confrim password are not same "})

 user.password=newPassword

   user.save()



   res.redirect('/user/profile')


 


  
} catch (error) {
  
console.log(error)
   return res.render('changepassword' , {

    error:'invalid Current Password'

   })
}
})


router.get('/update-profile-image' , async(req, res ) =>{
  console.log("User routes loaded");
      
 

  res.render("updateprofileimage", {
    user: req.user,
   
  });
})


router.post("/update-profile-image" , upload.single("userProfileImage") ,async(req,res) =>{

   const userId =req.user._id;
    const currentUser = await User.findById(userId);
  
 try {


  const currentProfileImage =currentUser.userProfileImage

  console.log(currentProfileImage)

  currentUser.userProfileImage =  `/uploads/${req.file.filename}`;

  await currentUser.save()

if (currentProfileImage !== "/images/default-user.png") {
  try {
    await fs.promises.unlink(`./public${currentProfileImage}`);
  } catch (err) {
    console.log(err.message);
  }
}
   return res.redirect('/user/profile')

  




  
 } catch (error) {

    return res.status(500).render("updatename", {
      error: "Something went wrong. Please try again.",
    });
  
  console.log(error.message)
 }

})





module.exports = router;
