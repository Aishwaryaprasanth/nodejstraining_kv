require('./config/appConfig');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const { notFound, convertError } = require('./middleware/errorMiddleware')

const Employee = require('./models/employees');
const Department = require('./models/departments');
const EmpDept = require('./models/employeeDepartment');
const Role = require('./models/roles');  
const EmpRole = require('./models/employeeRole');
const EmpAddr = require('./models/employeeAddress')


const empRoutes = require('./routes/employees');
const depRoutes = require('./routes/departments');
const roles = require('./routes/roles');  
const loginRoute = require('./routes/login');   //


/**
* Express instance
* @public
*/
const app = express();

// parse body params and attaches them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/employees', empRoutes);
app.use('/departments', depRoutes);
app.use('/roles',roles);   
app.use('/login', loginRoute);   //

// Error Middlewares
app.use(notFound);
app.use(convertError);

// Employee.hasMany(EmpDept);
EmpDept.belongsTo(Employee, {
    foreignKey: {
        name: 'empId'
    },
    onDelete: 'CASCADE'
});

// Department.hasMany(EmpDept);
EmpDept.belongsTo(Department, {
    foreignKey: {
        name: 'deptId'
    },
    onDelete: 'CASCADE'
});

//

// Employee.hasMany(EmpRole);
EmpRole.belongsTo(Employee, {
    foreignKey: {
        name: 'empId'
    },
    onDelete: 'CASCADE'
});

// Role.hasMany(EmpRole);
EmpRole.belongsTo(Role, {
    foreignKey: {
        name: 'roleId'
    },
    onDelete: 'CASCADE'
});


// Employee.hasMany(EmpRole);
EmpAddr.belongsTo(Employee, {
    foreignKey: {
        name: 'empId'
    },
    onDelete: 'CASCADE'
});


sequelize
    .sync()
    .then(result => {
        console.log('Listening for requests at http://localhost:7001');
        app.listen(7001);
    })
    .catch(err => {
        console.log(err);
    });

    
