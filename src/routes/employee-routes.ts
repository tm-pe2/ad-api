import express from 'express';
import * as employeeController from '../controllers/employee-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

// router.get('/employees', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), employeeController.getAllEmployees);
// router.get('/employees/:id', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), employeeController.getEmployeeById);
// router.post('/employees', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]),employeeController.addEmployee);
// router.put('/employees', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), employeeController.updateEmployee);
// router.delete('/employees/:id',auth.authenticate([UserRole.ADMIN]), employeeController.deleteEmployeeById);

router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', employeeController.addEmployee);
router.put('/employees', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployeeById);

export = router;
