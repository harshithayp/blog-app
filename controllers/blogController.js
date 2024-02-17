const Blog = require("../models/blogmodels");
const session = require('express-session');
const Comment = require("../models/commentsModel");
const Authuser = require("../models/authuserModels");
const mongoose = require("mongoose");

const getBlogs = async(req,res)=>{
    try{
       const allBlog = await Blog.find();
       //console.log(allBlog);
       res.render("index",{ blog : allBlog, user : req.session.userId});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const getaddFormblog = async(req,res)=>{
    try{
        res.render("addblogs",{ user : req.session.userId });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

const multer = require('multer');
//const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      },
});
  
const upload = multer({
    storage: storage,
  }).single('image');

const addBlog = async(req,res)=>{
   
    //const { image } = req.file.filename;
   
    try{
        const { title, content } = req.body;
        const  image  = req.file ? req.file.filename : null;
       // console.log(image);
        // Save file details to MongoDB
        const newFile = new Blog({ title, content, image, createdBy : req.session.userId});
        await newFile.save();
        //const blog = await Blog.create({ title , content, image });

        res.redirect("/blog");
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};

const getblogdetails = async(req,res)=>{
    try{
        const {id} = req.params;
        const blogdetails = await Blog.findById(id).populate({path : "createdBy", model : "Authuser"});
        const commentdet = await Comment.find({blogId: req.params.id}).populate({ path :"commentscreatedBy",model : "Authuser"});
        console.log(req.params.id);
       console.log("comments",commentdet);
        res.render("blogs",{ blogs:blogdetails , user : req.session.userId , comments: commentdet});

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};


const addComment = async(req,res)=>{
    try{
        const { commentstext } = req.body;
        const { blogId } = req.params;
       
        const newComments = new Comment({ commentstext : commentstext, blogId : blogId, commentscreatedBy : req.session.userId});
        await newComments.save();
        
        res.redirect(`/blog/${req.params.blogId}`);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};

module.exports = {
    getBlogs,
    addBlog,
    getaddFormblog,
    upload,
    getblogdetails,
    addComment
};