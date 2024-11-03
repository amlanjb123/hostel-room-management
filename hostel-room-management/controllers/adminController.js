const RoomAssignment = require('../models/RoomAssignment');
const Student = require('../models/Student');
const Room = require('../models/Room');

// Assign Room to Student
exports.assignRoom = async (req, res) => {
    try {
        const { studentId, roomId } = req.body;

        // Input validation
        if (!studentId || !roomId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both student ID and room ID'
            });
        }

        // Check if student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // Check if room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({
                success: false,
                message: 'Room not found'
            });
        }

        // Check if room is already assigned
        const existingAssignment = await RoomAssignment.findOne({ roomId, status: 'active' });
        if (existingAssignment) {
            return res.status(400).json({
                success: false,
                message: 'Room is already assigned to another student'
            });
        }

        // Check if student already has a room
        const studentExistingAssignment = await RoomAssignment.findOne({ studentId, status: 'active' });
        if (studentExistingAssignment) {
            return res.status(400).json({
                success: false,
                message: 'Student is already assigned to another room'
            });
        }

        // Create new room assignment
        const newAssignment = new RoomAssignment({
            studentId,
            roomId,
            assignmentDate: new Date(),
            status: 'active'
        });

        await newAssignment.save();

        // Update room status
        room.isOccupied = true;
        await room.save();

        return res.status(201).json({
            success: true,
            message: 'Room assigned successfully',
            data: newAssignment
        });

    } catch (error) {
        console.error('Error in assignRoom:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get All Room Assignments
exports.getAllRoomAssignments = async (req, res) => {
    try {
        const assignments = await RoomAssignment.find()
            .populate('studentId', 'name email') // Populate student details
            .populate('roomId', 'roomNumber floor'); // Populate room details

        return res.status(200).json({
            success: true,
            count: assignments.length,
            data: assignments
        });
    } catch (error) {
        console.error('Error in getAllRoomAssignments:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Remove Room Assignment
exports.removeRoomAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        const assignment = await RoomAssignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Room assignment not found'
            });
        }

        // Update room status
        const room = await Room.findById(assignment.roomId);
        if (room) {
            room.isOccupied = false;
            await room.save();
        }

        // Update assignment status instead of deleting
        assignment.status = 'inactive';
        assignment.endDate = new Date();
        await assignment.save();

        return res.status(200).json({
            success: true,
            message: 'Room assignment removed successfully'
        });

    } catch (error) {
        console.error('Error in removeRoomAssignment:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update Room Assignment
exports.updateRoomAssignment = async (req, res) => {
    try {
        const { assignmentId } = req.params;
        const { newRoomId } = req.body;

        if (!newRoomId) {
            return res.status(400).json({
                success: false,
                message: 'Please provide new room ID'
            });
        }

        // Check if new room exists and is available
        const newRoom = await Room.findById(newRoomId);
        if (!newRoom) {
            return res.status(404).json({
                success: false,
                message: 'New room not found'
            });
        }

        if (newRoom.isOccupied) {
            return res.status(400).json({
                success: false,
                message: 'New room is already occupied'
            });
        }

        const assignment = await RoomAssignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Room assignment not found'
            });
        }

        // Update old room status
        const oldRoom = await Room.findById(assignment.roomId);
        if (oldRoom) {
            oldRoom.isOccupied = false;
            await oldRoom.save();
        }

        // Update assignment
        assignment.roomId = newRoomId;
        assignment.updateDate = new Date();
        await assignment.save();

        // Update new room status
        newRoom.isOccupied = true;
        await newRoom.save();

        return res.status(200).json({
            success: true,
            message: 'Room assignment updated successfully',
            data: assignment
        });

    } catch (error) {
        console.error('Error in updateRoomAssignment:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = exports;