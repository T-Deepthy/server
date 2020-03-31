const Component = require('../models/component.model.js');

// Create and Save a new Component
exports.create = (req, res) => {
    // Validate request
    if(!req.body.status) {
        return res.status(400).send({
            message: "Component content can not be empty"
        });
    }

    // Create a Component
    const component = new Component({
        salaryComponent: req.body.salaryComponent || "Untitled Component", 
        status: req.body.status
    });

    // Save Component in the database
    component.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Component."
        });
    });
};

// Retrieve and return all Components from the database.
exports.findAll = (req, res) => {
    Component.find()
    .then(components => {
        res.send(components);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving components."
        });
    });
};

// Find a single Component with a componentId
exports.findOne = (req, res) => {
    Component.findById(req.params.componentId)
    .then(component => {
        if(!component) {
            return res.status(404).send({
                message: "Component not found with id " + req.params.componentId
            });            
        }
        res.send(component);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Component not found with id " + req.params.componentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving component with id " + req.params.componentId
        });
    });
};

// Update a Component identified by the componentId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.status) {
        return res.status(400).send({
            message: "Component content can not be empty"
        });
    }

    // Find Component and update it with the request body
    Component.findByIdAndUpdate(req.params.componentId, {
        salaryComponent: req.body.salaryComponent || "Untitled Component",
        status: req.body.status
    }, {new: true})
    .then(component => {
        if(!component) {
            return res.status(404).send({
                message: "Component not found with id " + req.params.componentId
            });
        }
        res.send(component);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Component not found with id " + req.params.componentId
            });                
        }
        return res.status(500).send({
            message: "Error updating component with id " + req.params.componentId
        });
    });
};

// Delete a Component with the specified componentId in the request
exports.delete = (req, res) => {
    Component.findByIdAndRemove(req.params.componentId)
    .then(component => {
        if(!component) {
            return res.status(404).send({
                message: "Component not found with id " + req.params.componentId
            });
        }
        res.send({message: "Component deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Component not found with id " + req.params.componentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete component with id " + req.params.componentId
        });
    });
};
