import express from 'express';
import * as userController from '../controllers/user-controller';
import * as auth from "../middleware/auth"

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.addUser);
// router.put('/users', userController.updateUser);
// router.delete('/users/:id', userController.DeleteUserById);

export = router;