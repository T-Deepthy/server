const mongoose = require('mongoose');

const ComponentSchema = mongoose.Schema({
    salaryComponent: String,
    status: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Component', ComponentSchema);