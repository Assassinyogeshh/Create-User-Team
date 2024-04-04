import express from "express";
import { userData, searchUserDetails, addUser, getUserTeam, removeUser } from "../Controller/AllUser.js";
import auth from "../Auth/VerifyToken.js"

const router = express.Router();


router.post("/userData", userData);

router.post("/searchUser", searchUserDetails);

router.post("/addUser", auth, addUser);

router.get("/getUserTeam", auth, getUserTeam);

router.delete("/removeUser/:id", removeUser);

export default router;