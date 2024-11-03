
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

// Room routes
router.use(authMiddleware);  // This will protect all routes below this line

// Check room availability
router.get('/check/:roomNumber', roomController.checkAvailability);

// Allocate room
router.post('/allocate', roomController.allocateRoom);

// Get all rooms
router.get('/all', roomController.getAllRooms);

// Get details of a specific room
router.get('/:roomNumber', roomController.getRoomDetails);

// Validate room number
router.get('/validate/:roomNumber', roomController.validateRoomNumber);

module.exports = router;