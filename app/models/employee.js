const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    empNo: String,
    address: String,
    designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
    CTC: Number        
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);
