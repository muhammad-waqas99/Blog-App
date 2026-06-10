const {model,Schema} = require('mongoose')


const commentSchema = new Schema({
    content:{
        type:String,
        required:[true,"comment is required"],
        minlength:[2, "Comment must be atleast 2 character long " ]
    },
    blogId:{
      type:Schema.Types.ObjectId,
      ref:'blog'
    },
    createdBy:{
            type:Schema.Types.ObjectId,
      ref:'user'
    }

})


const Comment = model('comment', commentSchema)

module.exports=Comment