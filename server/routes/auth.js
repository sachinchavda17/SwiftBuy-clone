import express from "express"
import { loginController, signupController } from "../controllers/authController.js"
import protectedRoute from "../utils/protectedRoute.js"
import addressController from "../controllers/addressController.js"

const router = express.Router()

router.post("/signup",signupController)
router.post("/login",loginController)
router.post("/address",protectedRoute,addressController)


export default router