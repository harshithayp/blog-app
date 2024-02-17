const express = require("express");
const router = express.Router();
const { getBlogs,addBlog, getaddFormblog,getblogdetails, addComment} = require("../controllers/blogController");
const  uploads = require('../controllers/blogController');

router.get("/",getBlogs);
router.get("/addblog",getaddFormblog);
router.post("/addblog",uploads.upload,addBlog);
router.get("/:id",getblogdetails);
router.post("/comment/:blogId",addComment)

module.exports=router;