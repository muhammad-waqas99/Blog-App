const { Schema, model } = require("mongoose");

const blogSchema = new Schema({

    title: {
        type: String,
        required: [true, "Blog title is required"],
        trim: true,
        minlength: [5, "Title must be at least 5 characters long"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },

    body: {
        type: String,
        required: [true, "Blog content is required"],
        trim: true,
        minlength: [20, "Blog content must be at least 20 characters long"]
    },

    bodyImageURL: {
        type: String,
        default:"/images/blogImage.avif"
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

}, { timestamps: true });

const Blog = model("blog", blogSchema);

module.exports = Blog;