"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.authRouter = router;
// import controller
const controller_1 = require("../controller");
router.get("/confirm_admin", controller_1.confirmAdmin);
router.patch("/verify", controller_1.confirmEmail); // verify email with token in url query parameter
router.post("/register", controller_1.createUser);
router.post("/login", controller_1.login);
router.post("/forgot_password", controller_1.forgotPassword);
router.post("/admin/request", controller_1.requestAdminRole);
router.patch("/reset", controller_1.resetPassword);
