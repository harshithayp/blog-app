const mongoose = require("mongoose");
const authuserSchema = new mongoose.Schema(
    {
        fullname:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        profileImgUrl:{
            type:String,
            default:"/uploads/defaultimg.png"
        },
        role:{
            type:String,
            enum : ["USER", "ADMIN" ],
            default: "USER",
        }
    },
    {
        timestamps:true,
    }
);

const Authuser = mongoose.model("Authuser",authuserSchema);
module.exports=Authuser;