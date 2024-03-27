import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const Register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({
                message:"Enter all details",
                success:false
            })
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(401).json({
                message: "Account already exists with this email. Sign in or use different email",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password,16);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        // const formattedUser = formatUserData(newUser);
        // console.log("newUser ",newUser)

        return res.status(201).json({
            message:"Account created successfully.",
            success: true,
            user: {
                id: newUser._id,
                fullName,
                email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        })
    } catch (error) {
        console.log("Error in user registration:", error);
        return res.status(500).json({
            message: "An error occurred while registering user",
            success: false
        })
    }
}

export const Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(401).json({
                message:"Provide Login credentials",
                success: false
            })
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message:"No user found create new account or use different email ID",
                success: false
            })
        };

        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Password is incorrect",
                success: false
            })
        }

        const tokenData = {
            id:user._id
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn: "1d"})

        return res.status(201).cookie("token", token, {httpOnly:true}).json({
            message:`Welcome back ${user.fullName}`,
            success: true,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } catch (error) {
        console.log("Error at Login", error)
        return res.status(500).json("Internal server error")
    }

}

export const Logout = async(req, res) =>{
    return res.status(200).cookie("token", "", {expiresIn:new Date(Date.now()), httpOnly:true}).json({
        message:"Logged out successfully",
        success: true
    })
}