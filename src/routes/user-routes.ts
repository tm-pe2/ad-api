import express from 'express';
import * as userController from '../controllers/user-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

// router.get('/users', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), userController.getAllUsers);
// router.get('/users/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), userController.getUserById);
// router.post('/users', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]), userController.addUser);
//router.put('/users', userController.updateUser);
// router.delete('/users/:id', userController.DeleteUserById);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.addUser);

export = router;