import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "Avatar",
      maxCount: 1,
    },
    {
        name : "CoverImage",
        maxCount : 1
    }
  ]),
  registerUser
);

router.route('/login').post(loginUser)

// secured routes
router.route('/logout').post(verifyJWT, logoutUser)


export default router;
