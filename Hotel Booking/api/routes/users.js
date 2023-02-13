import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


const router = express.Router();

// for checking that the user is authenticated or not ....
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in ");
// });

// // if the user is authencated to delete ..... 
// router.get("/checkuser/:id",verifyUser, (req,res,next)=>{
//     res.send("hello user, you are logged in and you can delete your account!")
// })

// // for admin user .... 
// router.get("/checkadmin/:id",verifyAdmin, (req,res,next)=>{
//     res.send("hello admin, you are logged and you can delete all accounts!")
// })

// UPDATE USER
router.put("/:id",verifyUser, updateUser);

// DELETE
router.delete("/:id",verifyUser, deleteUser);

// GET USER BY ID
router.get("/:id",verifyUser, getUser);

// GET ALL USER
router.get("/",verifyAdmin, getUsers);

export default router;
