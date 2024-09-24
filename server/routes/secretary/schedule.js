const express = require('express');
const Schedule = require('../../models/schedule');
const auth = require('../../middleware/auth');

const router = express.Router();

router.put('/updateSchedule/:doctorId', auth('Secretary'), async (req, res) => {
    const { schedules } = req.body;
    const { doctorId } = req.params;

    // Validate required fields
    if (!schedules || !Array.isArray(schedules)) {
        return res.status(400).json({ error: 'An array of schedules is required' });
    }

    try {
        // Begin transaction for updating schedules
        const result = await sequelize.transaction(async (t) => {
            // Find the doctor by ID
            const doctor = await Doctor.findByPk(doctorId, { transaction: t });

            if (!doctor) {
                return res.status(404).json({ error: 'Doctor not found' });
            }

            // Get the count of existing schedules for the doctor
            const scheduleCount = await Schedule.count({ where: { DOCTOR_ID: doctorId }, transaction: t });

            // Iterate over the schedules array and update or create schedules
            const updatedSchedules = await Promise.all(schedules.map(async (schedule, index) => {
                const { schedule_id, day_of_week, start_time, end_time, slot_count } = schedule;

                // Validate schedule fields
                if (!day_of_week || !start_time || !end_time || !slot_count) {
                    throw new Error('All schedule fields are required');
                }

                if (schedule_id) {
                    // If schedule_id is provided, update the existing schedule
                    const existingSchedule = await Schedule.findOne({ where: { SCHEDULE_ID: schedule_id, DOCTOR_ID: doctorId }, transaction: t });

                    if (!existingSchedule) {
                        throw new Error('Schedule not found');
                    }

                    // Update the existing schedule
                    return existingSchedule.update({
                        DAY_OF_WEEK: day_of_week,
                        START_TIME: start_time,
                        END_TIME: end_time,
                        SLOT_COUNT: slot_count
                    }, { transaction: t });
                } else {
                    // If schedule_id is not provided, create a new schedule
                    return Schedule.create({
                        DOCTOR_ID: doctorId, // Use the doctor's ID
                        DAY_OF_WEEK: day_of_week,
                        START_TIME: start_time,
                        END_TIME: end_time,
                        SLOT_COUNT: slot_count,
                        SCHED_COUNTER: scheduleCount + index + 1 // Increment SCHED_COUNTER for new schedules
                    }, { transaction: t });
                }
            }));

            return { doctor, updatedSchedules };
        });

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
