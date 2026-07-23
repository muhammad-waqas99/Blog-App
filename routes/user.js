const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Blog = require("../models/Blog");
const upload = require("../service/multerConfig");
const uploadToCloudinary = require("../service/uploadToCloudinary");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {


  console.log("SIGNIN BODY:", req.body);
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
  console.log("ROUTE HIT");
  res.render("signup");
});

router.post("/signup", upload.single("userProfileImage"), async (req, res) => {

  console.log("SIGNUP FILE:", req.file);

  console.log(req.body);

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

if(req.file){
   userData.userProfileImage = await uploadToCloudinary(req.file);
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
  if (!req.user) return res.redirect("/user/signin");

  try {
    const userId = req.user._id;
    const createdBy = userId;

    const userBlogs = await Blog.find({ createdBy }).sort({ createdAt: -1 }).catch(() => []);
    const currentUser = await User.findById(userId).catch(() => req.user);

    return res.render("profile", {
      user: currentUser || req.user,
      blogs: userBlogs || []
    });
  } catch (err) {
    console.error("Profile route error:", err);
    return res.redirect("/user/signin");
  }
});

router.get("/update-name", async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId).catch(() => req.user);

    res.render("updatename", {
      user: currentUser || req.user,
    });
  } catch (err) {
    res.render("updatename", {
      user: req.user,
    });
  }
});

router.post("/update-name", async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  try {
    const { _id } = req.user;
    const fullName = req.body.fullName;
    const newName = (fullName || "").trim();

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
        user: req.user,
        error: firstError,
      });
    }

    return res.status(500).render("updatename", {
      user: req.user,
      error: "Something went wrong. Please try again.",
    });
  }
});

router.get('/update-password', async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId).catch(() => req.user);

    res.render("changepassword", {
      user: currentUser || req.user,
    });
  } catch (err) {
    res.render("changepassword", {
      user: req.user,
    });
  }
});

router.post('/update-password', async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  const userId = req.user._id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.render("changepassword", { user: req.user, error: "User not found" });
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.render("changepassword", {
        user,
        error: "All fields are required",
      });
    }

    if (currentPassword === newPassword) {
      return res.render("changepassword", {
        user,
        error: "New password cannot be the same as current password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.render("changepassword", {
        user,
        error: "New password and confirm password do not match",
      });
    }

    await User.comparePasswordAndAuthentication(user.email, currentPassword);

    user.password = newPassword;
    await user.save();

    return res.redirect('/user/profile');
  } catch (error) {
    console.log(error);
    return res.render('changepassword', {
      user: req.user,
      error: 'Invalid Current Password'
    });
  }
});

router.get('/update-profile-image', async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  res.render("updateprofileimage", {
    user: req.user,
  });
});

router.post("/update-profile-image", upload.single("userProfileImage"), async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  const userId = req.user._id;

try {
  const currentUser = await User.findById(userId);

  if (!currentUser) {
    return res.render("updateprofileimage", {
      user: req.user,
      error: "User not found",
    });
  }

  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file);

    currentUser.userProfileImage = imageUrl;

    await currentUser.save();
  }

  return res.redirect("/user/profile");

} catch (error) {
  console.error(error);

  return res.status(500).render("updateprofileimage", {
    user: req.user,
    error: "Something went wrong. Please try again.",
  });
}
});





module.exports = router;
