"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.UserRouter = router;
// import controllers
const controller_1 = require("../controller");
const authentication_1 = require("../middlewares/authentication");
router.get('/', authentication_1.authentication, authentication_1.adminAuth, controller_1.getAllUser);
router.get('/:Id', authentication_1.authentication, controller_1.getOneUser);
router.patch('/:Id', authentication_1.authentication, controller_1.updateUser);
router.delete('/:Id', authentication_1.authentication, controller_1.deleteUser);
