require('dotenv').config();  // Add this line to load .env

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/secretary/auth');
const appointmentsRoutes = require('./routes/secretary/appointments');
const showSecretary = require('./routes/secretary/secretary');
const doctorRoutes = require('./routes/secretary/doctor');
const scheduleRoutes = require('./routes/secretary/schedule');
const queueManagementRoutes = require('./routes/secretary/queuemanagement');
const registerPatient = require('./routes/patient/patient_auth');
const loginRoutes = require('./routes/login/login');
const messageRoutes = require('./routes/secretary/messages');


const messageRoutesPat = require('./routes/patient/message');
const appointmentPatientRoutes = require('./routes/patient/appointmentPatient');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//SECRETARY
app.use('/welcome', loginRoutes);
app.use('/secretary/auth', authRoutes);
app.use('/secretary/appointments', appointmentsRoutes);
app.use('/secretary/secretary', showSecretary);
app.use('/secretary/doctors', doctorRoutes);
app.use('/secretary/doctorSched', scheduleRoutes);
app.use('/secretary/queue', queueManagementRoutes);
app.use('/secretary/messages', messageRoutes);

//PATIENT
// Register the message routes
app.use('/messages', messageRoutesPat);
//sign up patient
app.use('/signup', registerPatient);
app.use('/patient/appointment', appointmentPatientRoutes);




// Create an HTTP server instance and bind it to the Express app
const server = require('http').createServer(app);

// Initialize Socket.IO and bind it to the server instance
const io = require('socket.io')(server);

// Export io so that it can be used in other parts of the app (like routes)
module.exports.io = io;

// WebSocket setup for handling connections
io.on('connection', (socket) => {
    console.log('A secretary or patient connected:', socket.id);
  
    // Notify the secretary of new messages
    socket.on('notifySecretary', (data) => {
        // Emit the new message event to all connected secretaries
        io.emit('newMessage', data); // You can target specific rooms or IDs if necessary
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Synchronize the database
sequelize.sync()
    .then(() => {
        console.log('Database connected and tables synchronized');
    })
    .catch(err => console.error('Unable to connect to the database', err));

// Start the server and listen for incoming requests
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Error handling for the server
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use. Please use a different port.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1); // Exit the process to avoid hanging
});
