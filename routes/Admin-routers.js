const express = require('express');
const router = express.Router();
const {
    getTotalUsers,
    getUserDetails,
    getTotalEvents,
    getEventDetails,
    getTotalVendors,
    getVendorDetails,
    createCoordinator,
    getEventCoordinatorDetails,
    getEventCoordinators
} = require('../controllers/Admin.controller');  // Adjust the path according to your file structure

// User routes
router.get('/users/total', getTotalUsers);
router.get('/users/:uid', getUserDetails);

// Event routes
router.get('/events/total', getTotalEvents);
router.get('/events/:id', getEventDetails);

// Vendor routes
router.get('/vendors/total', getTotalVendors);
router.get('/vendors/:id', getVendorDetails);

// Event coordinator routes
router.get('/coordinators', getEventCoordinators);
router.get('/coordinators/:id', getEventCoordinatorDetails);
router.post('/coordinators', createCoordinator);

module.exports = router;
