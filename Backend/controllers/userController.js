import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register= async (req, res)=>{
    try {
        const {username, email, password}= req.body;

        if(!username || !email || !password){
             return res.status(401).json({
              message: "something missing",
              success: false
             })
        }
    
        const user = await User.findOne({email})
        if(user) return res.status(401).json({
            message: "please try with another email",
            success:false
        })
    
        const hashPassword= await bcrypt.hash(password, 10);
    
        await User.create({
            email,
            username,
            password:hashPassword
        })
    
        return res.status(201).json({
            message:"Account created Successfully",
            success:true
        })
    } catch (error) {
       return res.status(404).json({
            message: "something error",
            success:false

        })
    }
   
}

export const Login= async(req,res)=>{
    try {
        const {username, email}= req.body;

        if(!username || !email){
            return res.status(401).json({
                message:"something missing",
                success:false
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                message:"email and password is incorrect",
                success: false
            })
        }

        const isMatchpassword = await bcrypt.compare(password, user.password)

        if(!isMatchpassword){
            return res.status(401).json({
                message:"email and password is incorrect",
                success: false
            })
        }
    
        user={
            _id:user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
        }
    
        const token = await jwt.sign({userId:user._id}, process.env.SecretKey, {expiresIn:"1d"})
    
        return res.cookie('token',token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({
            message:`Welcome ${user.username}`,
            success:true,
            user
        })

    } catch (error) {
        console.log(error)
    }

   
}

