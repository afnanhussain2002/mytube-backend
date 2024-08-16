// step 14: make a routes with post request for register user. step 15 on app.js line 17
import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCover,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  //step19: upload user avatar image and cover image. step 20 on
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);//
router.route("/login").post(loginUser);//

// Secure route
router.route("/logout").post(verifyJWT, logoutUser);//
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);//
router.route("/current-user").get(verifyJWT, getCurrentUser);//
router.route("/update-account").patch(verifyJWT, updateAccountDetails);//
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCover);

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);//
router.route("/history").get(verifyJWT, getWatchHistory);//

export default router;
