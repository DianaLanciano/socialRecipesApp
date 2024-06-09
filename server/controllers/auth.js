import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

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

export const login = async (req, res) => {
   try {
     // users details
     const { password, email } = req.body;
     if (!(password && email)) res.status(400).json("Email And Password Are Required");
     
     const user = User.findOne({ email });
     if (!user) res.status(400).json({ message: 'User Is Not Exist' });

     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) res.status(400).json({ message: 'Invalid Credentials' });

     const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d',
     });

     delete user.password;
     res.status(200).json({ user, token });
     

   } catch (error) {
    console.log('Error in login', err.message);
    res.status(500).json({ message: err.message });
    
   }
};


