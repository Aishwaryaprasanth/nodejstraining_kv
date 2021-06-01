const express = require('express');
const validate = require('express-validation');
const empController = require('../controller/employees');
const {authorize} = require("../middleware/authorization.middleware");
const {
  idParamsSchema,
  postEmployeeBodySchema,
  editEmployeeBodySchema,
  postEmployeeDepartmentBodySchema,
  postEmployeeRoleBodySchema,
  postEmployeeAddressBodySchema,
  editEmployeeAddressBodySchema
} = require('../validation/joiRequestValidation');

const router = express.Router();

// GET => /employees
router.get('/',authorize, empController.getAllEmployees);

// GET => /employees/id
router.get('/:id', authorize,validate(idParamsSchema), empController.getEmployee);

// POST => /employees
router.post('/',authorize, validate(postEmployeeBodySchema), empController.postEmployee);

// PUT => /employees/id
router.put('/:id',authorize, validate(editEmployeeBodySchema), empController.editEmployee);

// DELETE => /employees/id
router.delete('/:id', empController.deleteEmployee);

// GET => /employees/id/departments
router.get('/:id/departments',authorize, empController.getEmployeeDepartments);

// POST => /employees/id/departments
router.post('/:id/departments',authorize, validate(postEmployeeDepartmentBodySchema), empController.postEmployeeDepartment);

// GET => /employees/id/roles
router.get('/:id/roles',authorize, empController.getEmployeeRoles);

// POST => /employees/id/roles
router.post('/:id/roles',authorize, validate(postEmployeeRoleBodySchema), empController.postEmployeeRole);

// GET => /employees/id/address
router.get('/:id/address',authorize, empController.getEmployeeAddress);

// POST => /employees/id/address
router.post('/:id/address',authorize, validate(postEmployeeAddressBodySchema), empController.postEmployeeAddress);

 //PUT => /employees/id/address
router.put('/:id/address', validate(editEmployeeAddressBodySchema), empController.editEmployeeAddress);


module.exports = router;