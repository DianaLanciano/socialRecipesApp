import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {

       const { firstName, lastName, email, password, picture, friends, location } = req.body;
       

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
                profilePicture: picture,
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
     if (!(password && email)) {
        console.log('Email And Password Are Required In Login');
        return res.status(400).json({error: "Email And Password Are Required"});
    }
     
     const user = await User.findOne({ email: email });
     if (!user) {
        console.log(`User with ${email} does not exist In Login.`);
        return res.status(400).json({ error: "User does not exist. " });
    }

     const isPasswordValid = await bcrypt.compare(password, user.password);
     if (!isPasswordValid) {
        console.log('Invalid credentials In Login');
        return res.status(400).json({ error: "Invalid credentials. " });
    }

     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
     delete user.password;
     res.status(200).json({ user, token });   

   } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    
   }
};


