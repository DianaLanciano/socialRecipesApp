import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';        
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';    
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import { createPost } from './controllers/posts.js';
import { register } from './controllers/auth.js';
import { verifyToken } from './middleware/auth.js';
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

/******************************************* CONFIGURATION *******************************************/
const __filename = fileURLToPath(import.meta.url); // stores the current filename in the __filename variable
const __dirname = path.dirname(__filename); // stores this directory name in the __dirname variable

dotenv.config(); 
const app = express(); 
app.use(express.json()); 
app.use(helmet()); // helps secure Express apps by setting various HTTP headers
app.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin' }));
app.use(morgan('common')); // logs HTTP requests
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors()); // allows requests from all origins
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // serve static files

/******************************************* FILE STORAGE *******************************************/
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});
const upload = multer({ storage: storage });

/******************************************* ROUTES *******************************************/
app.post("/auth/register", upload.single("picture"), register); // needs to be here for upload 
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);


/******************************************* DB SETUP & SERVER CONNECTION *******************************************/
const PORT = process.env.PORT || 6001;
// Server will run if connection to MongoDB is successful
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
          /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
        console.log(`MongoDB connection established, server running on port ${PORT}`);
    });
})