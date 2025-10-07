import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";

// Register user : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({success: false, message: "All fields are mandatory"});
        }
        const existingUser = await User.findOne({email});

        if(existingUser)
            return res.json({success: false, message: "User already exists"})

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashedPassword});
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true, // Prevent javascript to access cookie
            secure: process.env.NODE_ENV === "Production", //Use secure cookies in production
            samesite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })
        return res.json({ success: true, user: {email: user.email, name: user.name, password: user.password}});
    } catch (error) {
        console.log("Error in the user controller API\n", error.message);
        res.json({success: false, message: error.message });
    }
}
 //Login User : /api/user/login

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.json({success: false, message: "Email and password are required"});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.json({success: false, message: "Invalid password or email"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success: false, message: "Invalid password or email"});
        }

          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true, // Prevent javascript to access cookie
            secure: process.env.NODE_ENV === "Production", //Use secure cookies in production
            samesite: process.env.NODE_ENV === "production" ? "none" : "strict", // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })
        return res.json({ success: true, user: {email: user.email, name: user.name, password: user.password}});
    }
     catch (error) {
        console.log("Error in the user login controller API", error.message);
        res.json({success: false, message: error.message });
    }
}

// Check auth : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { useId } = req.body;
        const user = await User.findById(useId).select("-password")
        return res.json({success: true, user});
    } catch (error) {
         console.log("Error in the user is-auth controller API", error.message);
        res.json({success: false, message: error.message });
    }
}

// Logout User : /api/user.logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            samesite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({sucess: true, message: "Logged Out successfuly"})
    } catch (error) {
        console.log("Error in the user login controller API", error.message);
        res.json({success: false, message: error.message });
    }
}