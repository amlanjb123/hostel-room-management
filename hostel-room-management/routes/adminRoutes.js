const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middlewares/authMiddleware');

// Room management routes
router.post('/assign-room', authMiddleware, adminController.assignRoom);
router.get('/rooms', authMiddleware, roomController.getAllRooms);
router.get('/room/:roomNumber', authMiddleware, roomController.getRoomDetails);
router.get('/room/:roomNumber/availability', authMiddleware, roomController.checkAvailability);
router.post('/room/allocate', authMiddleware, roomController.allocateRoom);
router.get('/room/:roomNumber/validate', authMiddleware, roomController.validateRoomNumber);

module.exports = router;