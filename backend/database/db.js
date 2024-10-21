import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDb = async () => {
  try {
    // Check if the MONGO_URI environment variable is set
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
    
      
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    // More detailed error logging
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDb;
