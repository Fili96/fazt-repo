const router = require('express').Router();
const EmployeeCtrl = require('../controllers/employee.controller');

//CRUD
router.post('/', EmployeeCtrl.createEmployee);
router.get('/', EmployeeCtrl.getEmployees);
router.put('/:id', EmployeeCtrl.updateEmployee);
router.delete('/:id', EmployeeCtrl.deleteEmployee);

router.get('/:id', EmployeeCtrl.getEmployee);

module.exports = router;