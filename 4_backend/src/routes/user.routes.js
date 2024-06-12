import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middlewares.js";

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

export default router;
