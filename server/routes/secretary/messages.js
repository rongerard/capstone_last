const express = require('express');
const router = express.Router();
const Message = require('../../models/message');
let io;  // Define `io` here to prevent undefined errors

// Ensure `io` is defined before use
const app = require('../../app');  // Import the app file where Socket.IO is initialized

if (app && app.io) {
  io = app.io;
} else {
  console.error("Socket.IO is not initialized properly");
}

// POST /messages/send - Send a new message
router.post('/send', async (req, res) => {
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

    // Ensure `io` is available before emitting
    if (io) {
      // Notify the secretary via WebSocket
      io.emit('notifySecretary', {
        doctor_id,
        sender_id,
        sender_type,
        content,
        message_id: message.id
      });
    } else {
      console.error("Socket.IO instance is not available to emit events.");
    }

    res.status(201).json({ message: 'Message sent successfully', data: message });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Error sending message' });
  }
});

// POST /messages/read/:messageId - Mark a message as read
router.post('/messages/read/:messageId', async (req, res) => {
  const messageId = req.params.messageId;

  try {
    await Message.update({ is_read: true }, { where: { id: messageId } });
    res.status(200).json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ message: 'Error marking message as read' });
  }
});

module.exports = router;


  // Listen for new messages
// socket.on('newMessage', (data) => {
//     console.log('New message received:', data);
//     // You can display a notification to the secretary, update the message list, etc.
//     alert(`New message from patient regarding doctor ${data.doctor_id}: ${data.content}`);
//   });
  
