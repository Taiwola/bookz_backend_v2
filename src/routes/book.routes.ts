import {Router} from 'express';
import { createBook, getAllBook, getOneBook, updateBook, deleteBook } from '../controller/book.controller';
import {upload} from "../middlewares/multer"
import { authentication, editorAuth, editorOrAdmin } from '../middlewares/authentication';

const router = Router();


router.get("/", authentication,getAllBook);
router.get("/:Id", authentication,getOneBook);

router.post("/", authentication ,editorAuth, upload.single('image'),createBook);


router.patch("/:Id", authentication,editorAuth, upload.single("image"), updateBook);


router.delete("/",  authentication,editorOrAdmin,deleteBook);


export {router as bookRouter}