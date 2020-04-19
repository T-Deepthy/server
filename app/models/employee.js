const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    empNo:{
        type:String,
        required: '{PATH} is required!',
        unique: true
    },
    address: {
        type:String,
        required: '{PATH} is required!',
    },
    designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
    CTC:{
        type:Number,
        required: '{PATH} is required!',
    }        
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);
