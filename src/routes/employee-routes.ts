import express from 'express';
import * as employeeController from '../controllers/employee-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/user';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), employeeController.getAllEmployees);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), employeeController.getEmployeeById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]),employeeController.addEmployee);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), employeeController.updateEmployee);
router.delete('/:id',auth.authenticate([UserRole.ADMIN]), employeeController.deleteEmployeeById);
export = router;
