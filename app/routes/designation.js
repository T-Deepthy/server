module.exports = (app) => {
    const designations = require('../controllers/designation.js');

    // Create a new designation
    app.post('/designations', designations.create);

    // Retrieve all designations
    app.get('/designations', designations.findAll);

    // Retrieve a single designation with designationId
    app.get('/designations/:designationId', designations.findOne);

    // Update a designation with designationId
    app.put('/designations/:designationId', designations.update);

    // Delete a designation with designationId
    app.delete('/designations/:designationId', designations.delete);
}