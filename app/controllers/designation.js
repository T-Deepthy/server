const Designation = require('../models/designation.js');
const Component = require('../models/component.js');

// Create and Save a new designation
exports.create = async (req, res) => {
    const designation = new Designation(req.body);
    designation.save()
        .then(async designation => {
            await populateComponentName(designation.components).then(data => {
                res.send({ ...designation._doc, components: data });
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Designation."
            });
        });
};

// Retrieve and return all Designation from the database.
exports.findAll = (req, res) => {
    Designation.find()
        .then(async designations => {
            await populateSalaryComponents(designations).then(data => {
                res.send(data);
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving designations."
            });
        });
};

// Find a single Designation with a designationId
exports.findOne = (req, res) => {
    Designation.findById(req.params.designationId)
        .then(designation => {
            if (!designation) {
                return res.status(404).send({
                    message: "Designation not found with id " + req.params.designationId
                });
            }
            res.send(designation);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Designation not found with id " + req.params.designationId
                });
            }
            return res.status(500).send({
                message: "Error retrieving designation with id " + req.params.designationId
            });
        });
};

// Update a Designation identified by the designationId in the request
exports.update = (req, res) => {

    // Find Designation and update it with the request body
    Designation.findByIdAndUpdate(req.params.designationId, req.body, { new: true })
        .then(async designation => {
            if (!designation) {
                return res.status(404).send({
                    message: "Designation not found with id " + req.params.designationId
                });
            }
            await populateComponentName(designation.components).then(data => {
                res.send({ ...designation._doc, components: data });
            })
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Designation not found with id " + req.params.designationId
                });
            }
            return res.status(500).send({
                message: "Error updating designation with id " + req.params.designationId
            });
        });
};

// Delete a designation with the specified designationId in the request
exports.delete = (req, res) => {
    Designation.findByIdAndRemove(req.params.designationId)
        .then(designation => {
            if (!designation) {
                return res.status(404).send({
                    message: "Designation not found with id " + req.params.designationId
                });
            }
            res.send({ message: "Designation deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Designation not found with id " + req.params.designationId
                });
            }
            return res.status(500).send({
                message: "Could not delete designation with id " + req.params.designationId
            });
        });
};

const fetchComponent = async (comp) => {
    const component = await Component.findById(comp._id);
    const { name } = component;
    return Promise.resolve({ name, ...comp._doc });
}

const populateComponentName = async (components) => {
    return Promise.all(components.map(comp => fetchComponent(comp)))
}

const populateSalaryComponents = async (designations) => {
    return Promise.all(designations.map(async designation => {
        return await populateComponentName(designation.components).then(data => {
            return Promise.resolve({ ...designation._doc, components: data });
        });
    }));
}