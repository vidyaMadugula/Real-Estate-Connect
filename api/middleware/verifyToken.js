
// export const verifyToken = (req, res, next) => {
//   console.log("Hello");
//   const token = req.cookies.token;
//   console.log("Token received:", token);

//   if (!token) return res.status(401).json({ message: "Not Authenticated!" });

//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
//     if (err) return res.status(403).json({ message: "Token is not Valid!" });
//     req.userId = payload.id;
//     next();
//   });
// };
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.userId = payload.id;

    next();
  });
};
