const Authuser = require("../models/authuserModels");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const session = require('express-session');

const getsignup = async(req,res)=>{
    try{
        res.render("signups",{ user : req.session.userId });
    }catch(error){
        res.status(500).json({message:error.message});
    }
    
};

const getsignin = async(req,res)=>{
    try{
        res.render("signin", { user : req.session.userId });
    }catch(error){
        res.status(500).json({message:error.message});
    }
   
};

const signupuser = async(req,res)=>{
    try{

        const { fullname, email, password } = req.body;
        //console.log({ fullname, email, password });
       const salthashed = 10;
       const hashedPassword = await bcrypt.hash(password, salthashed);
       //console.log(hashedPassword);
        const newauthuser = new Authuser({ fullname, email, password:hashedPassword });
        
        await newauthuser.save();
        res.redirect("/blog");
        //res.status(200).json({ message :"User register successfully"});
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};

const signinuser = async(req,res)=>{
    try{
       const { email, password } = req.body;
       //console.log({ email, password });
       const authuser = await Authuser.findOne({ email });
       //console.log(authuser);
       if(!authuser){
        return res.status(400).json({ error : "Invalid Credentials"});
       }

       const isPasswordValid = await bcrypt.compare(password,authuser.password);

       if(!isPasswordValid){
        return res.status(400).json({ error : "Invalid Credentials"});
       }

       const token = jwt.sign({ id: authuser._id, fullname : authuser.fullname}, JWT_SECRET, { expiresIn :'1h'});
       //const uid = authuser._id.toString();
       //console.log('Before setting res.session:', req.session);
       req.session.userId = authuser._id.toString();
       //console.log('After setting res.session:', req.session);
       //console.log({auid:authuser._id});
       //console.log(authuser._id.toString());
       //res.json({ token });
       res.redirect("/blog");

    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message});
    }
};

const logout = async(req,res)=>{
    req.session.destroy();
    res.redirect("/auth/signin");
};



module.exports = {
    signupuser,
    signinuser,
    getsignup,
    getsignin,
    logout,
}