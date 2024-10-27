const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/assign-room', authMiddleware, adminController.assignRoom);

module.exports = router;
