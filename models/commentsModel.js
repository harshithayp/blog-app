const mongoose = require("mongoose");
const commentsSchema = new mongoose.Schema(
    {
        commentstext:{
            type:String,
            required:true,
        },
        blogId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog",
        },
        commentscreatedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Authuser",
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment",commentsSchema);
module.exports = Comment;