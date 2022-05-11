import express from 'express';
import * as employeeController from '../controllers/employee-controller';
import * as auth from "../middleware/auth"

const router = express.Router();

router.get('/employees', employeeController.getAllEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.put('/employees', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployeeById);
router.post('/employees', employeeController.addEmployee);

export = router;
