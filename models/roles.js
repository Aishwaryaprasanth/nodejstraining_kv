const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Role = sequelize.define('role', {
    name: {
        type: Sequelize.STRING,
        allowNull:false
    }
});

module.exports = Role;