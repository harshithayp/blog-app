const mongoose =require("mongoose");
const blogSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Authuser",
        },
    },
    {
        timestamps:true
    }
);

const Blog = mongoose.model("Blog",blogSchema);
module.exports = Blog;