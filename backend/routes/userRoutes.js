import express from "express";
import {Register, Login, Logout} from "../controllers/user.js";

const router = express.Router();

router.post("/signup", Register);
router.post("/login", Login);
router.get("/logout", Logout)

export default router;