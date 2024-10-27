const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/view-rooms', authMiddleware, studentController.viewRooms);
router.post('/request-room', authMiddleware, studentController.requestRoom);

module.exports = router;
