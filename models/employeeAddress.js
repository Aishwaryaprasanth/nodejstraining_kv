const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const EmpAddr = sequelize.define('employee_address', {
    empId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    houseName: {
        type: Sequelize.STRING,
        allowNull:false
    },
    streetName: {
        type: Sequelize.STRING,
        allowNull:false
    },    
    district: {
        type: Sequelize.STRING,
        allowNull:false
    },
    pincode: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    

});

module.exports = EmpAddr;