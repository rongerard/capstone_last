const express = require('express');
const Message = require('../../models/message');
const auth = require('../../middleware/auth');
const router = express.Router();

// POST /messages/send - Send a new message
router.post('/send',auth('Patient'), async (req, res) => {
  const { sender_type, sender_id, receiver_type, receiver_id, doctor_id, content } = req.body;

  try {
    // Insert new message into the database
    const message = await Message.create({
      sender_type,
      sender_id,
      receiver_type,
      receiver_id,
      doctor_id,
      content
    });

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

router.get('/doctor/:doctorId',auth('Patient'), async (req, res) => {
    const doctorId = req.params.doctorId;
    const patientId = req.query.patientId; // Assuming patientId is passed in the query
    const secretaryId = req.query.secretaryId; // Assuming secretaryId is passed in the query
  
    try {
      // Find messages related to this doctor, patient, and secretary
      const messages = await Message.findAll({
        where: {
          doctor_id: doctorId,
          sender_id: [patientId, secretaryId],
          receiver_id: [patientId, secretaryId]
        },
        order: [['timestamp', 'ASC']]
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Error fetching messages' });
    }
  });
  
  module.exports = router;
  