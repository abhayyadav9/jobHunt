import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jwt for token signing

// Register function
export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;

    // Check if all fields are provided
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", status: false });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber, // Ensure consistency by using 'phone'
      role,
    });

    await user.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", status: true });
  } catch (error) {
    // Return error message in case of failure
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if all fields are provided
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", status: false });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found", status: false });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", status: false });
    }

    // Check if the role matches
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with the current role",
        status: false,
      });
    }

    // Create token data
    const tokenData = {
      userId: user._id,
    };

    // Sign the JWT token
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d", // Fixed typo in 'expiresIn'
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    // Set the token in an HTTP-only cookie and return success response
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true, // Use 'httpOnly' to secure the cookie
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}`,
        user,
        status: true,
      });
  } catch (error) {
    // Return error message in case of failure
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

//for logout

export const logout = async (req, res) => {
  try {
    // Clear the token cookie
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: "strict" })
      .json({
        message: "Logged out successfully",
        status: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; // Optional file handling (e.g., profile picture or resume)

    // Check if required fields are filled
    if (!fullname || !email || !bio || !phoneNumber || !skills) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", status: false });
    }

    // Split the skills string into an array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    // Retrieve user ID from the authenticated request
    const userId = req.id;

    // Find user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    // Update user fields
    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    // Handle file upload (e.g., resume or profile picture) if necessary
    // if (file) {
    //   // Assuming you're handling resume or profile pictures with an external service like Cloudinary
    //   // user.profile.resume = // Logic for storing file
    // }

    // Save the updated user
    await user.save();

    // Return the updated user details, excluding sensitive information
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res.status(200).json({
      message: `Profile updated successfully`,
      user,
      status: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
