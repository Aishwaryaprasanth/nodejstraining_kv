const Role = require('../models/roles');

exports.getAllRoles = (req, resp, next) => {
    Role.findAll()
        .then(roles => {
            resp.status(200).json({
                message: 'Roles retrieved successfully',
                roles
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Roles not found'
            });
        })
};

exports.getRole = (req, resp, next) => {
    const id = req.params.id;

    Role.findByPk(id)
        .then(role => {
            resp.status(200).json({
                message: 'Role retrieved successfully',
                role
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Role not found'
            });
        });
};

exports.postRole = (req, resp, next) => {
    const name = req.body.name;

    Role.create({
        name: name
    })
        .then(role => {
            resp.status(200).json({
                message: 'Role created successfully!',
                role
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Role creation failed',
            });
        });
};

exports.editRole = (req, resp, next) => {
    const id = req.params.id;
    const name = req.body.name;

    Role.findByPk(id)
        .then(role => {
            role.name = name;
            return role.save();
        })
        .then(role => {
            resp.status(200).json({
                message: 'Role updated successfully',
                role
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Role updation failed',
            });
        });
};

exports.deleteRole = (req, resp, next) => {
    const id = req.params.id;

    Role.findByPk(id)
        .then(role => {
            return role.destroy();
        })
        .then(() => {
            resp.status(200).json({
                message: 'Role deleted successfully',
            });
        })
        .catch(err => {
            console.log(err);
            resp.status(404).json({
                message: 'Role deletion failed',
            });
        });
};
