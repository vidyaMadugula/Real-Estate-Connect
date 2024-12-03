import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import logger from "../logger.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;


  try {
    // HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);
    
    res.status(201).json({status: 201, message: "User created successfully" });
    logger.info(`${username} registered  successfully`);
    
    
  } catch (err) {
    res.status(500).json({status: 500, message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CHECK IF THE USER EXISTS

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) 
    // logger.info(`Login failed for username: ${username} - User not found`);
      return res.status(400).json({status: 400, message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
    // logger.info(`Login failed for username: ${username} - Invalid password`);
      return res.status(400).json({status: 400, message: "Invalid Credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure:true,
        sameSite: 'None',
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
<<<<<<< HEAD
      
    logger.info(`${username} logged in successfully`);
=======
    console.log("tOKEN",token);
>>>>>>> ea9f9d8ddb55ce1142f6519c603d17e33fd578bb
  } catch (err) {
    logger.error(`Login failed for username: ${username} - Error: ${err.message}`);
    res.status(500).json({status: 500, message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({status: 200, message: "Logout Successful" });
};
