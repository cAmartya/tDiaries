import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

const JWT_SECRET_KEY = "AMAZING PROJECT"


export const signup = async (req, res) => {
    let success = false;

    const { userName, email, password} = req.body;

    try {
        let existingUser = await User.findOne({userName : userName});
        if(existingUser)   {
            return res.status(400).json({success, error : "User already exists with same username."});
        }

        existingUser = await User.findOne({email : email});
        if(existingUser)   {
            return res.status(400).json({success, error : "User Account not found."});
        }

        const salt = await bcrypt.genSaltSync(10);    
        const secPass = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({userName, email, password: secPass});
        
        // const user = new User(userName, email, password: secPass);
        // await user.save();        

        const token = jwt.sign({email: email, id: user._id}, JWT_SECRET_KEY);
        success = true;
        res.status(200).json({result: user, token, success})

    } catch (error) {
        console.error(error);
        res.status(500).send("Some unprecedented Internal Server error occured");
    }

}
export const signin = async (req, res) => {
    let success = false;
    
    const { email, password} = req.body;

    try {
        const existingUser = await User.findOne({email: email});
        if(!existingUser)   {
            return res.status(404).json({error : "User Account not found."});
        }

        const chkpass = await bcrypt.compare(password, existingUser.password);
        if(!chkpass)   {
            return res.status(404).json({error : "Invalid credentials."});
        }

        const token = jwt.sign({email: email, id: existingUser._id}, JWT_SECRET_KEY);
        success = true;
        res.status(200).json({result: existingUser, token, success})

    } catch (error) {
        console.error(error);
        res.status(500).send("Some unprecedented Internal Server error occured");
    }

}
