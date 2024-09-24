const express = require('express');
const router = express.Router();
const Secretary = require('../../models/secretary');
const auth = require('../../middleware/auth'); // Assuming auth middleware is defined correctly
const bcrypt = require('bcryptjs');

router.get('/:id', auth('Secretary'), async (req, res) => {
    const {id} = req.params;
    try {
        const secretary = await Secretary.findByPk(id); // Find Secretary by primary key
        if (!secretary) {
            return res.status(404).json({ error: 'Secretary not found' });
        }
        res.status(200).json(secretary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', auth('Secretary'), async (req, res) => {
    try {
        const secretary = await Secretary.findAll();
        if (!secretary) {
            return res.status(404).json({ error: 'Secretary not found' });
        }
        res.status(200).json(secretary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT endpoint to update a secretary by ID
router.put('/:id', auth('Secretary'), async (req, res) => {
    const { id } = req.params;
    const { Name, Email, Password, Schedule, RoomNumber, FloorNumber } = req.body;
    
    try {
        // Find the secretary by ID and SecretaryId
        const secretary = await Secretary.findOne({ where: { id } });
        if (!secretary) {
            return res.status(404).json({ error: 'Secretary not found' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Update the secretary fields
        secretary.NAME = Name;
        secretary.EMAIL = Email;
        secretary.PASSWORD = hashedPassword; // Use the hashed password
        secretary.SCHEDULE = Schedule;
        secretary.ROOM_NUMBER = RoomNumber;
        secretary.FLOOR_NUMBER = FloorNumber;
        
        // Save the updated secretary
        await secretary.save();
        
        res.status(200).json(secretary);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
