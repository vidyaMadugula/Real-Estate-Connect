
// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;
//   console.log("Cookies received:", req.cookies);


//   if (!token) return res.status(401).json({ message: "Not authorized!" });
  

//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
//     if (err) return res.status(403).json({ message: "Token is not Valid!" });
//     req.userId = payload.id;

//     next();
//   });
// };
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token; // Avoid errors if cookies are undefined

  if (!token) {
    console.warn("Unauthorized access attempt: No token provided");
    return res.status(401).json({ message: "Not authorized!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(403).json({ message: "Token is not valid!" });
    }

    req.userId = payload.id; // Attach userId to request
    next(); // Proceed to the next middleware
  });
};
