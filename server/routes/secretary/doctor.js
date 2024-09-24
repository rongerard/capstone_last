const express = require('express');
const sequelize = require('../../config/database');
const Doctors = require('../../models/doctor');
const auth = require('../../middleware/auth');
const Schedule = require('../../models/schedule');
const router = express.Router();

// add a doctor and its schedule
router.post('/addDoctor', auth('Secretary'), async (req, res) => {
    const {
        FIRST_NAME,
        LAST_NAME,
        GENDER,
        HEALTH_PROFESSIONAL_ACRONYM,
        DEPARTMENT,
        YEARS_OF_EXPERIENCE,
        EXPERTISE,
        schedules // Expect an array of schedules in the request body
    } = req.body;

    // Validate required fields for doctor
    if (!FIRST_NAME || !LAST_NAME || !GENDER || !HEALTH_PROFESSIONAL_ACRONYM ||
        !DEPARTMENT || !YEARS_OF_EXPERIENCE || !EXPERTISE || !schedules || !Array.isArray(schedules)) {
        return res.status(400).json({ error: 'All fields are required, including an array of schedules' });
    }

    try {
        // Check if req.user is defined
        if (!req.user || !req.user.id) {
            return res.status(403).json({ error: 'Unauthorized: Secretary information not found' });
        }

        // Begin transaction for creating doctor and schedules together
        const result = await sequelize.transaction(async (t) => {
            // Create doctor
            const doctor = await Doctors.create({
                FIRST_NAME,
                LAST_NAME,
                GENDER,
                HEALTH_PROFESSIONAL_ACRONYM,
                DEPARTMENT,
                YEARS_OF_EXPERIENCE,
                EXPERTISE,
                DOCTOR_STATUS: '--------',
                SECRETARY_ID: req.user.id // Ensure req.user is defined
            }, { transaction: t });

            // Get the count of existing schedules for the doctor
            const scheduleCount = await Schedule.count({ where: { DOCTOR_ID: doctor.id }, transaction: t });

            // Iterate over the schedules array and create schedules for the newly created doctor
            const newSchedules = await Promise.all(schedules.map(async (schedule, index) => {
                const { day_of_week, start_time, end_time, slot_count } = schedule;

                // Validate schedule fields
                if (!day_of_week || !start_time || !end_time || !slot_count) {
                    throw new Error('All schedule fields are required');
                }

                // Log the schedule data
                console.log('Creating schedule:', {
                    DOCTOR_ID: doctor.id,
                    DAY_OF_WEEK: day_of_week,
                    START_TIME: start_time,
                    END_TIME: end_time,
                    SLOT_COUNT: slot_count,
                    SCHED_COUNTER: scheduleCount + index + 1
                });

                // Create each schedule with SCHED_COUNTER starting from 1
                return Schedule.create({
                    DOCTOR_ID: doctor.id, // Use doctor.id from the created doctor
                    DAY_OF_WEEK: day_of_week,
                    START_TIME: start_time,
                    END_TIME: end_time,
                    SLOT_COUNT: slot_count,
                    SCHED_COUNTER: scheduleCount + index + 1 // Increment counter
                }, { transaction: t });
            }));

            return { doctor, newSchedules };
        });

        res.status(201).json(result);
    } catch (error) {
        console.error('Error in /addDoctor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// view all doctor
router.get('/', auth('Secretary'), async (req, res) => {
    try{
        const doctor = await Doctors.findAll();
        res.status(200).json(doctor);
    } catch(error){
        res.status(400).json({error: error.message});
    }
});

//view one doctor
router.get('/:id', auth('Secretary'), async (req, res) =>{
    const {id} = req.params;
    try{
        const doctor = await Doctors.findOne({where: {id}});
        const schedule = await Schedule.findAll({where: {DOCTOR_ID: id}})
        if(!doctor){
            return res.status(404).json({error: 'Doctor not found'})
        }

        res.status(200).json({ doctor, schedule });
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

//update doctors details
router.put('/updateDoctor/:id', auth('Secretary'), async (req, res) => {
    const { id } = req.params; // Doctor ID
    const {
        FIRST_NAME,
        LAST_NAME,
        GENDER,
        HEALTH_PROFESSIONAL_ACRONYM,
        DEPARTMENT,
        YEARS_OF_EXPERIENCE,
        EXPERTISE,
        schedules // Expect an array of schedules in the request body
    } = req.body;

    try {
        // Validate required fields for doctor and schedules
        if (!FIRST_NAME || !LAST_NAME || !GENDER || !HEALTH_PROFESSIONAL_ACRONYM ||
            !DEPARTMENT || !YEARS_OF_EXPERIENCE || !EXPERTISE || !schedules || !Array.isArray(schedules)) {
            return res.status(400).json({ error: 'All fields are required, including an array of schedules' });
        }

        // Begin transaction for updating doctor and associated schedules
        const result = await sequelize.transaction(async (t) => {
            // Update the doctor
            const doctorUpdated = await Doctor.update({
                FIRST_NAME,
                LAST_NAME,
                GENDER,
                HEALTH_PROFESSIONAL_ACRONYM,
                DEPARTMENT,
                YEARS_OF_EXPERIENCE,
                EXPERTISE
            }, {
                where: { id },
                transaction: t
            });

            // If no doctor was found, return a 404 error
            if (!doctorUpdated[0]) {
                return res.status(404).json({ error: 'Doctor not found' });
            }

            // Delete existing schedules for the doctor (before re-adding updated ones)
            await Schedule.destroy({ where: { doctor_id: id }, transaction: t });

            // Get the count of schedules that will be added (starting from 1)
            const scheduleCount = await Schedule.count({ where: { doctor_id: id }, transaction: t });

            // Add updated schedules
            const updatedSchedules = await Promise.all(schedules.map((schedule, index) => {
                const { day_of_week, start_time, end_time, slot_count } = schedule;

                // Validate schedule fields
                if (!day_of_week || !start_time || !end_time || !slot_count) {
                    throw new Error('All schedule fields are required');
                }

                // Create each schedule with SCHED_COUNTER starting from 1
                return Schedule.create({
                    DOCTOR_ID: id, // Use doctor.id from the created doctor
                    DAY_OF_WEEK: day_of_week,
                    START_TIME: start_time,
                    END_TIME: end_time,
                    SLOT_COUNT: slot_count,
                    SCHED_COUNTER: scheduleCount + index + 1 // Increment counter
                }, { transaction: t });
            }));

            return { doctorUpdated, updatedSchedules };
        });

        res.status(200).json({ message: 'Doctor and schedules updated successfully', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



//update doctor status
router.put('/updateDoctorStatus/:id', auth('Secretary'), async (req, res) => {
    const { id } = req.params; // Doctor ID
    const { DOCTOR_STATUS } = req.body; // New status to be updated

    // Validate that the status field is provided
    if (!DOCTOR_STATUS) {
        return res.status(400).json({ error: 'Doctor status is required' });
    }

    try {
        // Update only the doctor's status
        const doctorUpdated = await Doctor.update(
            { DOCTOR_STATUS },
            { where: { id } }
        );

        // If no doctor was updated, return a 404 error
        if (!doctorUpdated[0]) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// delete doctor and its schedule
router.delete('/deleteDoctor/:id', auth('Secretary'), async (req, res) => {
    const { id } = req.params; // Doctor ID

    try {
        // Begin transaction for deleting doctor and associated schedules
        await sequelize.transaction(async (t) => {
            // Delete associated schedules first
            await Schedule.destroy({
                where: { doctor_id: id },
                transaction: t
            });

            // Delete the doctor
            const doctorDeleted = await Doctor.destroy({
                where: { id: id },
                transaction: t
            });

            // If no doctor was deleted, send a 404 response
            if (!doctorDeleted) {
                return res.status(404).json({ error: 'Doctor not found' });
            }
        });

        res.status(200).json({ message: 'Doctor and associated schedules deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
