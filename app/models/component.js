const mongoose = require('mongoose');

const ComponentSchema = mongoose.Schema({
    name :{
        type:String,
        required: '{PATH} is required!',
        unique: true
    },
    status: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('Component', ComponentSchema);