const mongoose = require('mongoose');

const DesignationSchema = mongoose.Schema({
    name: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    components: [
        {
            component: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
            percentageCTC: {
                type:Number,
                required: '{PATH} is required!',
            }
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Designation', DesignationSchema);
