const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const patient = require('../../models/patient');
const { Op } = require('sequelize');
const auth = require('../../middleware/auth');


const router = express.Router();

router.post('/patientregister', async (req, res) => {
    const {
        FIRST_NAME,
        LAST_NAME,
        EMAIL,
        CONTACT_NUMBER,
        PASSWORD
    } = req.body;

    try {
        // Check if a patient with the same email or contact number already exists
        const existingPatient = await patient.findOne({
            where: {
                [Op.or]: [
                    { EMAIL },
                    { CONTACT_NUMBER }
                ]
            }
        });

        if (existingPatient) {
            return res.status(409).json({ error: 'A patient with this email or contact number already exists.' });
        }

        const hashedPassword = await bcrypt.hash(PASSWORD, 10);

        const newPatient = await patient.create({
            FIRST_NAME,
            MIDDLE_NAME: '',
            LAST_NAME,
            EMAIL,
            CONTACT_NUMBER,
            ADDRESS: '',
            SEX: '',
            BIRTHDAY: '',
            AGE: '',
            USER_LEVEL_ID: '3',
            PASSWORD: hashedPassword,
            VERIFIED:'false',
            PROFILE_PIC:''
        });

        res.status(201).json(newPatient);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log('error:', error.message);
    }
});

router.put('/:id', auth('Patient'), async (req,res)=>{
    const {id} = req.params;
    const {VERIFIED} = req.body;

    try{
        const Patient = await patient.findOne({where: {id}});
        if(!Patient){
            return res.status(404).json({error: 'Patient not found'});
        }
        Patient.VERIFIED = VERIFIED;

        await Patient.save()

        res.status(200).json(Patient)
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

router.put('/:id', auth('Patient'), async (req,res)=>{
    const {id} = req.params;
    const {FIRST_NAME, LAST_NAME, MIDDLE_NAME, ADDRESS, SEX, BIRTHDAY, AGE} = req.body;

    try{

        const Patient = await patient.findOne({where: {id}});
        if(!Patient){
            return res.status(404).json({error: 'Patient not found'})
        }
        Patient.FIRST_NAME= FIRST_NAME;
        Patient.LAST_NAME= LAST_NAME;
        Patient.MIDDLE_NAME= MIDDLE_NAME;
        Patient.ADDRESS= ADDRESS;
        Patient.SEX= SEX;
        Patient.BIRTHDAY= BIRTHDAY;
        Patient.AGE= AGE;

        await Patient.save();
        res.status(200).json(Patient);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
});
module.exports = router;
