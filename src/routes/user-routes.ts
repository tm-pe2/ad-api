import express from 'express';
import * as userController from '../controllers/user-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/self', userController.getUserSelf);
router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), userController.getAllUsers);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), userController.getUserById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]), userController.addUser);

export = router;
