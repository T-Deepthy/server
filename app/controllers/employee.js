const Employee = require('../models/employee.js');
const Designation = require('../models/designation.js');
const Component = require('../models/component.js');


// Create and Save a new employee
exports.create = async (req, res) => {
    const employee = new Employee(req.body);
    employee.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the employee."
            });
        });
};

// Retrieve and return all employee from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .populate("designation")
    .exec((err, designation) => { 
            res.send(designation);
        })
};

// Find a single employee with a employeeId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "employee not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Error retrieving employee with id " + req.params.employeeId
            });
        });
};

// Update a employee identified by the employeeId in the request
exports.update = (req, res) => {

    // Find employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.employeeId, req.body, { new: true })
    .populate("designation")
    .exec((err, designation) => { 
            res.send(designation);
        })
};

// Delete a employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "employee not found with id " + req.params.employeeId
                });
            }
            res.send({ message: "employee deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Could not delete employee with id " + req.params.employeeId
            });
        });
};

// generate payslip

exports.payslip = async (req, res) => {
    try {
        
        const employee = await Employee.findById(req.params.employeeId);
        const designation = await Designation.findById(employee.designation);
        const salarySlip = { salaryComponents: [],
            name: "Employee Name",
            empNo: employee.empNo,
            designation: designation.name,
            CTC: employee.CTC
        };
        await getSalaryComponents(designation.components, employee).then(data => {
            salarySlip.salaryComponents = data;
        })
        res.send(salarySlip);
    } catch (e) {
        console.log(e);
    }
};

const computeSalary = async (comp, employee) => {
    const component = await Component.findById(comp._id);
    const salaryComponent = {
        name: component.name,
        value: employee.CTC * 0.01 * comp.percentageCTC
    };
    return Promise.resolve(salaryComponent);
}

const getSalaryComponents = async (components, employee) => {
    return Promise.all(components.map(component => computeSalary(component, employee)))
}
