import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.token;
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ msg: "Please login to access this resource" });
    }

    // Verify the token
    const decode = await jwt.verify(token, process.env.SECRET_KEY); // Fixed typo in SECRET_KEY

    // If the token is invalid
    if (!decode) {
      return res.status(401).json({ msg: "Token is invalid" });
    }

    // Attach userId to request object for future use
    req.id = decode.userId;
    
    // Proceed to the next middleware
    next();
    
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export default isAuthenticated;
