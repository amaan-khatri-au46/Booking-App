// bascially we are going to authenticate the user ....
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/Error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
     ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created....");
  } catch (error) {
    next(error);
  }
};

// here in this login we are basically check the register user is login or not ....

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "wrong password or username!"));

    // bascically we are having the hash password in the database so we can compare with the hash password ....

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, " Wrong password or username... "));

      // with the help of the token we are generating a cookie for a register user.... 
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    // we are getting information inside a user._doc  so bascically get information from there .... 
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
