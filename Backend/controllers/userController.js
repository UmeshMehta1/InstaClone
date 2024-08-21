import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

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

// export const Login= async(req,res)=>{
//     try {
//         const {email,password}= req.body;

//         if(!email || !password){
//             return res.status(401).json({
//                 message:"something missing",
//                 success:false
//             })
//         }

//         const user = await User.findOne({email})

//         if(!user){
//             return res.status(401).json({
//                 message:"email and password is incorrect",
//                 success: false
//             })
//         }

//         const isMatchpassword = await bcrypt.compare(password, user.password)

//         if(!isMatchpassword){
//             return res.status(401).json({
//                 message:"email and password is incorrect",
//                 success: false
//             })
//         }
    
//         const userData={
//             _id:user._id,
//             username: user.username,
//             email: user.email,
//             profilePicture: user.profilePicture,
//             bio: user.bio,
//             followers: user.followers,
//             following: user.following,
//         }
    
//         const token =  jwt.sign({userId:user._id},process.env.SECRET_KEY, {expiresIn:"1d"})
        
    
//         return res.cookie('token',token, {httpOnly:true, sameSite:'strict', maxAge:1*24*60*60*1000}).json({
//             message:`Welcome ${user.username}`,
//             success:true,
//             user: userData
//         })

//     } catch (error) {
//         console.log(error)
//     }
   
// }

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "Email or password missing",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Email or password is incorrect",
                success: false
            });
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (!isMatchPassword) {
            return res.status(401).json({
                message: "Email or password is incorrect",
                success: false
            });
        }

        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
        };

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        console.log("login token",token)

        // Setting the cookie
        return res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }).json({
            message: `Welcome ${user.username}`,
            success: true,
            user: userData
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred",
            success: false
        });
    }
};

export const logout= async (req,res)=>{
 try {
    return res.cookie('token',"",{maxAge:0}).json({
        message:"Logout successfully",
        success:true
    })
 } catch (error) {
    return res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
 }
}

export const getProfile= async(req,res)=>{
    try {
        const userId= req.params.id
        let user=await User.findById(userId)

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }
        

        return res.status(200).json({
            user,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

export const editProfile= async(req, res)=>{
    try {
        const userId= req.id
        const{bio,gender}= req.body;
        const profilePicture= req.profilePicture
        let clouresponse

        if(profilePicture){
            const fileUri= getDataUri(profilePicture);
         clouresponse= await cloudinary.uploader.upload(fileUri);
        }

        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({
                message: 'User not found.',
                success: false
            });
        }

        if(bio) user.bio= bio;
        if(gender) user.gender = gender;
        if(profilePicture) user.profilePicture = clouresponse.secure_url;

        await user.save();

        return res.status(200).json({
            message: 'Profile updated.',
            success: true,
            user
        });

    } catch (error) {
        console.log(error)
    }
}

export const getSuggestedUsers = async (req,res)=>{
    try {
        const suggestedUsers= await User.find({_id:{$ne:req.id}}).select("-password");

        if(!suggestedUsers){
            return res.status(401).json({
                message:"currently do not have any users"
            })
        }

        return res.status(200).json({
            success:true,
            users:suggestedUsers
        })
    } catch (error) {
        console.log(error)
    }

}

export const followOrUnfollow = async (req, res) => {
    try {
        const followers = req.id; //me
        const following = req.params.id; //they
        if (followers === following) {
            return res.status(400).json({
                message: 'You cannot follow/unfollow yourself',
                success: false
            });
        }

        const user = await User.findById(followers);
        const targetUser = await User.findById(following);

        if (!user || !targetUser) {
            return res.status(400).json({
                message: 'User not found',
                success: false
            });
        }
        // mai check garnuparxa ki follow garne ki unfollow
        const isFollowing = user.following.includes(following);
        if (isFollowing) {
            // unfollow logic aauxa
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $pull: { following: following } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followers } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // follow logic aauxa
            await Promise.all([
                User.updateOne({ _id: followKrneWala }, { $push: { following: following } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followers } }),
            ])
            return res.status(200).json({ message: 'followed successfully', success: true });
        }
    } catch (error) {
        console.log(err);
    return res.status(500).json({ message: "Error during follow/unfollow operation", success: false });
    }
}


