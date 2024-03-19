import {Router} from 'express';

const router = Router();

// import controllers
import {updateUser, getAllUser, getOneUser, deleteUser} from "../controller";
import { adminAuth, authentication } from '../middlewares/authentication';


router.get('/', authentication, adminAuth,getAllUser);
router.get('/:Id', authentication, getOneUser);


router.patch('/:Id', authentication , updateUser);

router.delete('/:Id', authentication ,deleteUser);


export {router as UserRouter};