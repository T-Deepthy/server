module.exports = (app) => {
    const components = require('../controllers/component.js');

    // Create a new component
    app.post('/components', components.create);

    // Retrieve all components
    app.get('/components', components.findAll);

    // Retrieve a single component with componentId
    app.get('/components/:componentId', components.findOne);

    // Update a component with componentId
    app.put('/components/:componentId', components.update);

    // Delete a component with componentId
    app.delete('/components/:componentId', components.delete);
}