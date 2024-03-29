"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = require("express");
const book_controller_1 = require("../controller/book.controller");
const multer_1 = require("../middlewares/multer");
const authentication_1 = require("../middlewares/authentication");
const router = (0, express_1.Router)();
exports.bookRouter = router;
const editorOrAdmin = authentication_1.editorAuth || authentication_1.adminAuth;
router.get("/", book_controller_1.getAllBook);
router.get("/:Id", book_controller_1.getOneBook);
router.post("/", authentication_1.editorAuth, multer_1.upload.single('image'), book_controller_1.createBook);
router.patch("/:Id", authentication_1.editorAuth, multer_1.upload.single("image"), book_controller_1.updateBook);
router.delete("/", editorOrAdmin, book_controller_1.deleteBook);
