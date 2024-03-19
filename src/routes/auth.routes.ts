import {Router} from 'express';

const router = Router();

// import controller
import {confirmAdmin, confirmEmail, createUser, forgotPassword, login, requestAdminRole, resetPassword} from "../controller";

router.get("/confirm_admin", confirmAdmin)

router.patch("/verify", confirmEmail); // verify email with token in url query parameter

router.post("/register", createUser);
router.post("/login", login);
router.post("/forgot_password", forgotPassword);
router.post("/admin/request", requestAdminRole);
router.patch("/reset", resetPassword);


export {router as authRouter}