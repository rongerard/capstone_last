const express = require('express');
const sequelize = require('../../config/database');
const appointment = require('../../models/appointment');
const schedule = require('../../models/schedule');
const auth = require('../../middleware/auth');
const QueueManagement = require('../../models/queueManagement');
const Queue = require('../../models/queue');
const Doctor = require('../../models/doctor');

const router = express.Router();


router.post('/createAppointment', auth('Secretary'), async (req, res) => {
    const { fName, mName, lName, Age, ContactNumber, Reason, Type, doctor_id, schedule_id } = req.body;

    if (!req.user || !req.user.id) {
        return res.status(400).json({ error: 'Secretary information is missing or incomplete' });
    }

    const transaction = await sequelize.transaction();

    try {
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

        const duplicateAppointment = await appointment.findOne({
            where: {
                CONTACT_NUMBER: ContactNumber,
                SCHEDULE_ID: schedule_id
            }
        });

        if (duplicateAppointment) {
            await transaction.rollback();
            return res.status(400).json({ error: 'Appointment already exists for this contact number and schedule' });
        }

        const appointmentTime = scheduleDetails.START_TIME;

        // Format the appointment date as the day of creation (today's date)
        const appointmentDate = new Date().toLocaleDateString('en-CA'); // 'en-CA' formats as 'YYYY-MM-DD'

        const existingAppointments = await appointment.count({
            where: {
                DOCTOR_ID: doctor_id,
                SCHEDULE_ID: schedule_id,
                APPOINTMENT_DATE: appointmentDate
            }
        });

        if (existingAppointments >= scheduleDetails.slot_count) {
            await transaction.rollback();
            return res.status(400).json({ error: 'No available slots' });
        }

        // Fetch doctor's full name
        const doctor = await Doctor.findByPk(doctor_id);
        const doctorName = `${doctor.FIRST_NAME} ${doctor.LAST_NAME}`;

        const newAppointment = await appointment.create({
            FIRST_NAME: fName,
            MIDDLE_NAME: mName,
            LAST_NAME: lName,
            AGE: Age,
            CONTACT_NUMBER: ContactNumber,
            REASON: Reason,
            TYPE: Type,
            DOCTOR_NAME: doctorName,
            STATUS: "pending",
            APPOINTMENT_TIME: appointmentTime,  // Use appointment time from schedule
            APPOINTMENT_DATE: appointmentDate,  // Use today's date as appointment date
            SECRETARY_ID: req.user.id,
            DOCTOR_ID: doctor.id,
            SCHEDULE_ID: schedule_id
        }, { transaction });

        // Check if a queue already exists for the given schedule_id
        const existingQueue = await QueueManagement.findOne({
            where: { SCHEDULE_ID: schedule_id }
        });

        if (existingQueue) {
            const lastQueueEntry = await Queue.findOne({
                where: { QUEUE_MANAGEMENT_ID: existingQueue.id },
                order: [['QUEUE_NUMBER', 'DESC']]
            });

            let newQueueNumber = lastQueueEntry ? lastQueueEntry.QueueNumber : 0;
            newQueueNumber += 1;

            await Queue.create({
                QUEUE_NUMBER: newQueueNumber,
                APPOINTMENT_ID: newAppointment.id,
                QUEUE_MANAGEMENT_ID: existingQueue.id,
                MESSAGE_ID: '',  // Default value
                PROGRESS: 'pending',  // Default value
                STATUS: 'waiting',  // Default value
                SERVED: 'no',  // Default value
            }, { transaction });
        }

        await transaction.commit();
        res.status(201).json(newAppointment);
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});




// show all appointments
router.get('/', auth('Secretary'), async (req, res) => {
    try{
        const Appointment = await appointment.findAll();
        res.status(200).json(Appointment);
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

// show one appointment by id
router.get('/:id', auth('Secretary'), async (req, res) =>{
    const {id} = req.params;
    try{
        const Appointment = await appointment.findOne({where: {id}});
        if(!Appointment){
            return res.status(404).json({error: 'Appointment not Found'});
        }
        res.status(200).json(Appointment);
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

//update appointment by id
router.put('/:id', auth('Secretary'), async (req, res)=> {
    const {id} = req.params;
    const {DoctorName, AppointmentTime, Reason, ContactNumber, Type} = req.body;
    try{
        const Appointment = await appointment.findOne({ where: {id}});
        if(!Appointment){
            return res.status(404).json({error: 'Appointment not found'});
        }
        Appointment.DoctorName = DoctorName;
        Appointment.AppointmentTime = AppointmentTime;
        Appointment.Reason = Reason;
        Appointment.ContactNumber = ContactNumber;
        Appointment.Type = Type;
        await Appointment.save();
        res.status(200).json(Appointment);
    } catch (error){
        res.status(400).json({ error: error.message});
    }
});


//delete appointment by id
router.delete('/:id', auth('Secretary'), async (req, res) => {
    const { id } = req.params;
    try {
        const Appointment = await appointment.findOne({ where: { id } });
        if (!Appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        await Appointment.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//update appointment status by id
router.put('/:id', auth('Secretary'), async (req, res)=> {
    const {id} = req.params;
    const {status} = req.body;
    try{
        const Appointment = await appointment.findOne({ where: { id }});
        if (!Appointment)
            {
                return res.status(404).json({ error: 'Appointment not found' });
            }
        Appointment.status = status;
        await Appointment.save();
        res.status(200).json(Appointment); 
    } catch (error){
        res.status(400).json({ error: error.message});
    }
});

router.put('/reschedule/:id', auth('Secretary'), async (req, res)=>{
    const {id} = req. params;
    const {schedule_id} = req. body;
    try{
        const Appointment = await appointment.findOne({where: {id}});
        if (!Appointment)
        {
            return res. status(404).json({error: 'Appointment not found'});
        }

    Appointment.schedule_id= schedule_id;
    await Appointment.save();
    res.status(400).json({error:message});
    } catch(error){
        res.status(400).json({error:error.message});
    }
});

module.exports = router;