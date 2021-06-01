const Employee = require('../models/employees');
const EmpDept = require('../models/employeeDepartment');
const EmpRole = require('../models/employeeRole');
const EmpAddr = require('../models/employeeAddress');
const bcrypt = require('bcrypt');
const loginConstants =  require('../constants/login.constants');

exports.getAllEmployees = (req, resp, next) => {
    Employee.findAll()
        .then(employees => {
            resp.status(200).json({
                message: 'Employees retrieved successfully',
                employees: employees
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employees not found'
            });
        });
};

exports.getEmployee = (req, resp, next) => {
    const empId = req.params.id;
    Employee.findByPk(empId)
        .then(employee => {
            resp.status(200).json({
                employee
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee not found'
            });
        })
};

exports.getEmployeeDepartments = (req, resp, next) => {
    const empId = req.params.id;
    EmpDept.findAll({
        attributes: ['deptId'],
        where: { empId: empId }
    })
        .then(employeeDepartments => {
            resp.status(200).json({
                employeeDepartments
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Departments not found'
            })
        });
};
// 

exports.getEmployeeRoles = (req, resp, next) => {
    const empId = req.params.id;
    EmpRole.findAll({
        attributes: ['roleId'],
        where: { empId: empId }
    })
        .then(employeeRoles => {
            resp.status(200).json({
                employeeRoles
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Roles not found'
            })
        });
};
exports.getEmployeeAddress = (req, resp, next) => {
    const empId = req.params.id;
    EmpAddr.findAll({
        attributes: ['houseName','streetName','district','pincode' ],
        where: { empId: empId }
    })
        .then(employeeAddress => {
            resp.status(200).json({
                employeeAddress
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Address not found'
            })
        });
};


exports.postEmployee = (req, resp, next) => {
    const name = req.body.name;
    const age = req.body.age;
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, loginConstants.salt);
    Employee.create({
        name: name,
        age: age,
        username,
        password,
    }).then(employee => {
        resp.status(200).json({
            message: 'Employee created successfully',
            employee
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Employee creation failed'
        });
    });
};

exports.postEmployeeDepartment = (req, resp, next) => {
    const empId = req.params.id;
    const deptId = req.body.deptId;
 
    EmpDept.create({
        empId: empId,
        deptId: deptId
    }).then(employeeDepartment => {
        resp.status(200).json({
            message: `Department ${employeeDepartment.deptId} added for employee ${employeeDepartment.empId}`
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding department for employee failed'
        });
    });
};

//
exports.postEmployeeRole = (req, resp, next) => {
    const empId = req.params.id;
    const roleId = req.body.roleId;
 
    EmpRole.create({
        empId: empId,
        roleId: roleId
    }).then(employeeRole => {
        resp.status(200).json({
            message: `Role ${employeeRole.roleId} added for employee ${employeeRole.empId}`
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding role for employee failed'
        });
    });
};
exports.postEmployeeAddress = (req, resp, next) => {
    const empId = req.params.id;
    const house=req.body.houseName;
    const street= req.body.streetName;
    const district= req.body.district;
    const pin= req.body.pincode;
    //const roleId = req.body.roleId;
 
    EmpAddr.create({
        empId: empId,
        houseName:house,
        streetName:street,
        district:district,
        pincode:pin
        //roleId: roleId
    }).then(employeeAddress => {
        resp.status(200).json({
            message: `Address added for employee ${employeeAddress.empId}`
        });
    }).catch(err => {
        console.log(err);
        resp.status(404).json({
            message: 'Adding address for employee failed'
        });
    });
};




exports.editEmployee = (req, resp, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const age = req.body.age;
    const isActive = req.body.isActive;
    Employee.findByPk(id)
        .then(employee => {
            employee.name = name,
            employee.age = age,
            employee.isActive = isActive
            return employee.save();
        })
        .then(employee => {
            resp.status(200).json({
                message: 'Employee updated successfully',
                employee
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee updation failed'
            });
        });
};

//PUT address
exports.editEmployeeAddress = (req, resp, next) => {
    const empId = req.params.id;
    //console.log(empId)
    const houseName=req.body.houseName;
    console.log(houseName)
    const streetName= req.body.streetName;
    const district= req.body.district;
    const pin= req.body.pincode;
    EmpAddr.findByPk(empId)
        .then(employeeAddress => {
            employeeAddress.houseName = houseName,
            employeeAddress.streetName = streetName,
            employeeAddress.district = district,
            employeeAddress.pincode=pin
            return employeeAddress.save();
        })
        .then(employeeAddress => {
            resp.status(200).json({
                message: 'Employee Address updated successfully',
                employeeAddress
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee Address updation failed'
            });
        });
};




exports.deleteEmployee = (req, resp, next) => {
    const id = req.params.id;
    Employee.findByPk(id)
        .then(employee => {
            return employee.destroy();
        })
        .then(() => {
            resp.status(200).json({
                message: 'Employee deleted successfully'
            });
        }).catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Employee deletion failed'
            });
        });
};