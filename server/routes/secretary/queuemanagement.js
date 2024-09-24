const express = require('express');
const sequelize = require('../../config/database'); // Import the Sequelize instance
const Appointment = require('../../models/appointment');
const QueueManagement = require('../../models/queueManagement');
const Queue = require('../../models/queue');
const Schedule = require('../../models/schedule')
const auth = require('../../middleware/auth');
const { TIME } = require('sequelize');
const router = express.Router();

// Create Queue
router.post('/createQueue', auth('Secretary'), async (req, res) => {
    const { scheduleId, date} = req.body;

    const transaction = await sequelize.transaction();

    try {
        // Fetch all appointments with the given scheduleId
        const appointments = await Appointment.findAll({
            where: { SCHEDULE_ID: scheduleId },
            order: [['createdAt', 'ASC']]
        });

        // Check if a queue already exists for the given scheduleId
        const existingQueue = await QueueManagement.findOne({
            where: { SCHEDULE_ID: scheduleId }
        });

        if (existingQueue) {
            await transaction.rollback();
            return res.status(400).json({ message: 'Queue already exists for the given schedule ID' });
        }

        const schedule = await Schedule.findOne({where: {schedule_id: scheduleId}});

        // Create QueueManagement entry
        const queueManagement = await QueueManagement.create({
            SCHEDULE_ID: scheduleId,
            DATE: date,
            START_TIME: schedule.START_TIME,
            END_TIME: schedule.END_TIME
        }, { transaction });

        let newQueueNumber = 0;
        let status = 'in-queue';

        if (appointments.length) {
            for (const appointment of appointments) {
                newQueueNumber += 1; // Increment queue number for each appointment

                // Create a new queue entry for the appointment with default values
                await Queue.create({ 
                    QUEUE_NUMBER: newQueueNumber,
                    APPOINTMENT_ID: appointment.id, // Ensure this is not null
                    QUEUE_MANAGEMENT_ID: queueManagement.id, // Ensure this is not null
                    MESSAGE_ID: '',       // Default value
                    PROGRESS: 'pending',  // Default value
                    STATUS: 'waiting',    // Default value
                    SERVED: 'no',         // Default value
                }, { transaction });
            }
        } else {
            // If no appointments, you should not set APPOINTMENT_ID as null since it's required. Either skip this or handle it differently.
            await Queue.create({ 
                QUEUE_NUMBER: 0, // Default queue number
                APPOINTMENT_ID: null, // This will still fail since AppointmentId is required
                QUEUE_MANAGEMENT_ID: queueManagement.id, // Ensure this is not null
                MESSAGE_ID: '',       // Default value
                PROGRESS: 'pending',  // Default value
                STATUS: 'waiting',    // Default value
                SERVED: 'no',         // Default value
            }, { transaction });
        }

        // Update the status of all appointments with the given scheduleId
        await Appointment.update({ STATUS: status }, { where: { SCHEDULE_ID: scheduleId }, transaction });

        // Commit the transaction
        await transaction.commit();

        // Fetch the newly created queue for the given scheduleId
        const queueEntries = await Queue.findAll({
            where: { QUEUE_MANAGEMENT_ID: queueManagement.id },
            order: [['QUEUE_NUMBER', 'ASC']]
        });

        res.status(200).json({
            message: 'Queue created successfully',
            queue: queueEntries
        });
    } catch (error) {
        await transaction.rollback();
        console.error('Database error:', error);
        res.status(500).json({ message: 'Database error', error });
    }
});

// View Queue for a specific schedule
router.get('/viewQueue/:scheduleId', auth('Secretary'), async (req, res) => {
    const { scheduleId } = req.params;

    try {
        // Fetch the QueueManagement entry for the given scheduleId
        const queueManagement = await QueueManagement.findOne({
            where: { SCHEDULE_ID: scheduleId }
        });

        if (!queueManagement) {
            return res.status(404).json({ message: 'No queue found for the given schedule ID' });
        }

        // Fetch all queue entries related to the QueueManagement entry
        const queueEntries = await Queue.findAll({
            where: { QUEUE_MANAGEMENT_ID: queueManagement.id },
            order: [['QUEUE_NUMBER', 'ASC']]
        });

        if (!queueEntries.length) {
            return res.status(404).json({ message: 'No queue entries found for the given schedule ID' });
        }

        // Respond with the queue entries
        res.status(200).json({
            message: 'Queue fetched successfully',
            queue: queueEntries
        });
    } catch (error) {
        console.error('Error fetching queue:', error);
        res.status(500).json({ message: 'Database error', error });
    }
});

// // View Queue based on current date and time from QueueManagement
// router.get('/viewQueue', auth('Secretary'), async (req, res) => {
//     try {
//         // Get the current date and time
//         const currentDateTime = new Date();

//         // Fetch all QueueManagement entries that are currently active
//         const queueManagementEntries = await QueueManagement.findAll({
//             where: {
//                 DATE: {
//                     [sequelize.Op.eq]: currentDateTime.toISOString().split('T')[0] // Compare only the date part
//                 },
//                 START_TIME: {
//                     [sequelize.Op.lte]: currentDateTime // Start time should be less than or equal to now
//                 },
//                 END_TIME: {
//                     [sequelize.Op.gte]: currentDateTime // End time should be greater than or equal to now
//                 }
//             }
//         });

//         if (!queueManagementEntries.length) {
//             return res.status(404).json({ message: 'No active queues found for the current date and time' });
//         }

//         // Prepare to fetch all associated queue entries for the active QueueManagement entries
//         const queuePromises = queueManagementEntries.map(async (queueManagement) => {
//             return await Queue.findAll({
//                 where: { QUEUE_MANAGEMENT_ID: queueManagement.id },
//                 order: [['QUEUE_NUMBER', 'ASC']],
//                 include: [{
//                     model: Appointment,
//                     attributes: ['FIRST_NAME', 'LAST_NAME', 'APPOINTMENT_DATE'], // Fetch related appointment details
//                 }]
//             });
//         });

//         // Resolve all queue entries for the QueueManagement entries
//         const allQueueEntries = await Promise.all(queuePromises);

//         // Flatten the array of queue entries
//         const flattenedQueueEntries = allQueueEntries.flat();

//         res.status(200).json({
//             message: 'Queue fetched successfully',
//             queue: flattenedQueueEntries
//         });
//     } catch (error) {
//         console.error('Error fetching queue:', error);
//         res.status(500).json({ message: 'Database error', error });
//     }
// });


module.exports = router;
