import express from "express";
import {
  loginHandler,
} from "../controllers/auth.controller";

const router = express.Router();

// Login user route
router.post("/login", validate(loginUserSchema), loginHandler);

export default router;
