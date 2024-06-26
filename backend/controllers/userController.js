import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const secret = crypto.randomBytes(64).toString('hex');
//console.log( "Secret Key: ", secret);
// REGISTER USER*********************************************** */
export const registerUser = async (req, res) => {
  console.log("Registering user...", req.body, req.file);
  
   try {
     const { name, email, password, confirmPassword,  } = req.body;
     if (req.file) req.body.image = req.file.path;

     if (!password || !confirmPassword || password !== confirmPassword) {
         return res.status(400).json({ message: 'Passwords do not match or are missing' });
       }
     const existingUser = await User.findOne({ email });
     if (existingUser) {
       return res.status(400).json({ message: 'User already exists' });
     }
     const hashedPassword = await bcrypt.hash(password, 12);
     //console.log("🚀 ~ registerUser ~ hashedPassword:", hashedPassword)
     const user = new User({
       name,
       email,
       password: hashedPassword,
       image: req.file ? req.file.path : "",
     })
     await user.save();
     console.log("🚀 ~ registerUser ~ user:", user)
     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
     res.status(201).json({ user: { name: user.name, email: user.email, id: user._id, image: user.image }, token });
   } catch (error) {
     res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
     console.log(error);
   }
   
};

// LOGIN USER*********************************************** */
export const loginUser = async (req, res) => {
  const { email, password, rememberMe  } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).json({ message: "Wrong password" })
  }
  const expiresIn = rememberMe ? '30d' : '1d';
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn });
  res.status(200).send({ token, user });
}


// Google LOGIN USER*********************************************** */
export const googleLogin = async (req, res) => {

const {account,profile } =  req.body

const {email,name, picture } = profile

const user = await User.findOne({ email });
if(!user) {

  const newUser = new User({
    name,
    email,
    password: 'google auth',
    image:picture
  })
  await newUser.save();

  const expiresIn = '30d'
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn });
  res.status(200).send({ token, user: newUser });
  
}else{
  const expiresIn = '30d'
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn });
  res.status(200).send({ token, user });
}

}


//  DELETE USER *********************************************** */
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const authUserId = req.user; // Use the authenticated user's ID from the token

  if (userId !== authUserId) {
    return res.status(403).json({ message: "You can only delete your own account!" });
  }

  try {
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// GET ALL USERS
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find({ role: 'user' }).select('-password'); // Fetch only 'user' role and exclude passwords
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching users", error: error.message });
//   }
// };

// Updated getUsers function with search functionality
export const getUsers = async (req, res) => {
  const { search } = req.query; // Extract search query parameter
  const query = {
    role: 'user',
    ...(search && {
      name: { $regex: search, $options: 'i' }, // Case-insensitive regex search
    }),
  };

  try {
    const users = await User.find(query).select('-password'); // Apply search filter if 'search' param is provided
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};



