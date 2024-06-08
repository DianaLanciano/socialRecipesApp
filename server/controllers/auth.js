import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


/******************************************* REGISTER *******************************************/
export const register = async (req, res) => {
    try {
       const { firstName, lastName, email, password, profilePicture, friends, location } = req.body;

       if (!(email && password && firstName && lastName)) {
           res.status(400).json("All input is required");
       }
       
       const salt = await bcrypt.genSalt(10); // generates a salt with 10 rounds of hashing
         const hashedPassword = await bcrypt.hash(password, salt); // hashes the password with the salt

            const newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                profilePicture,
                friends,
                location
            });

            const user = await newUser.save();
            res.status(201).json(user);
    } catch (err) {
        console.log('Error in register', err.message);
        res.status(500).json({ message: err.message });
        
    }
};
