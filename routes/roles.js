const express = require('express');
const validate = require('express-validation');
const roleController = require('../controller/roles');
const { authorize } = require('../middleware/authorization.middleware');

const {
    postRoleBodySchema,
    editRoleBodySchema
  } = require('../validation/joiRequestValidation');
  

const router = express.Router();


// GET => /roles
router.get('/',authorize, roleController.getAllRoles);

// GET => /roles/id
router.get('/:id',authorize, roleController.getRole);

 // POST => /departments
router.post('/',authorize,validate(postRoleBodySchema), roleController.postRole);

// PUT => /roles/id
router.put('/:id',validate(editRoleBodySchema), roleController.editRole);

// DELETE => /roles/id
router.delete('/:id', roleController.deleteRole);

module.exports = router;

