const express = require('express');
const sequelize = require('../../config/database');
const appointment = require('../../models/appointment');
const schedule = require('../../models/schedule');
const Patient = require('../../models/patient');
const Doctor = require('../../models/doctor')
const auth = require('../../middleware/auth');


const router = express.Router();

router.post('/createAppointment', auth('Patient'), async (req, res) => {
    const { Reason, doctor_id, schedule_id } = req.body;
    const patientId = req.user.id;

    if (!patientId) {
        return res.status(400).json({ error: 'Patient information is missing or incomplete' });
    }

    const transaction = await sequelize.transaction();  // Initialize the transaction here

    try {
        // Retrieve patient details
        const patient = await Patient.findByPk(patientId);
        if (!patient) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Retrieve schedule details
        const scheduleDetails = await schedule.findOne({
            where: {
                schedule_id: schedule_id,
                DOCTOR_ID: doctor_id
            }
        });

        if (!scheduleDetails) {
            await transaction.rollback();
            return res.status(404).json({ error: 'Schedule not found' });
        }

        // Use the schedule's available appointment time
        const AppointmentTime = scheduleDetails.START_TIME; // Assuming scheduleDetails has this field

        // Check for duplicate appointment
        const duplicateAppointment = await appointment.findOne({
            where: {
                CONTACT_NUMBER: patient.CONTACT_NUMBER,
                SCHEDULE_ID: schedule_id
            }
        });

        if (duplicateAppointment) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Appointment already exists for this contact number and schedule' });
        }

        const existingAppointments = await appointment.count({
            where: {
                DOCTOR_ID: doctor_id,
                SCHEDULE_ID: schedule_id,
            }
        });

        if (existingAppointments >= scheduleDetails.slot_count) {
            await transaction.rollback();
            return res.status(400).json({ error: 'No available slots' });
        }
        // Format the appointment date as the day of creation (today's date)
        const appointmentDate = new Date().toLocaleDateString('en-CA'); // 'en-CA' formats as 'YYYY-MM-DD'

        // Fetch doctor's full name
        const doctor = await Doctor.findByPk(doctor_id);
        const doctorName = `${doctor.FIRST_NAME} ${doctor.LAST_NAME}`;

        const newAppointment = await appointment.create({
            FIRST_NAME: patient.FIRST_NAME,
            MIDDLE_NAME: patient.MIDDLE_NAME,
            LAST_NAME: patient.LAST_NAME,
            AGE: patient.AGE,
            CONTACT_NUMBER: patient.CONTACT_NUMBER,
            REASON: Reason,
            DOCTOR_NAME: doctorName,
            TYPE: "Online",
            STATUS: "pending",
            APPOINTMENT_TIME: AppointmentTime,
            APPOINTMENT_DATE: appointmentDate,
            PATIENT_ID: patientId,
            DOCTOR_ID: doctor_id,
            SCHEDULE_ID: schedule_id,
            SECRETARY_ID: null
        }, { transaction });  // Associate this operation with the transaction

        await transaction.commit();  // Commit the transaction if all operations succeed
        res.status(201).json(newAppointment);
    } catch (error) {
        await transaction.rollback();  // Rollback the transaction in case of error
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// View appointments for the logged-in patient
router.get('/viewAppointments', auth('Patient'), async (req, res) => {
    const patientId = req.user.id;

    try {
        // Find all appointments for the logged-in patient
        const patientAppointments = await appointment.findAll({
            where: {
                PATIENT_ID: patientId
            }
        });

        if (patientAppointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this patient' });
        }

        res.status(200).json(patientAppointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the appointments' });
    }
});


module.exports = router;