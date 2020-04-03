const mongoose = require('mongoose');

const DesignationSchema = mongoose.Schema({
    name: String,
    components: [
        {
            component: { type: mongoose.Schema.Types.ObjectId, ref: 'Component' },
            percentageCTC: Number
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Designation', DesignationSchema);
