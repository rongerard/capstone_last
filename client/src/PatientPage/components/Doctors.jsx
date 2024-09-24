import React from 'react';
import styles from '../styles/DoctorsPatient.module.css';
import {Notifications, AccountCircle, Tune, Send} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import doc from "../images/doc.jpg";

const doctors = [];

const DoctorList = () => {
  return (
    <div className={styles['doctor-list-container']}>
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>Book Appointment</h1>
          <p>Available Doctors</p>
        </div>
        <div className={styles['header-actions']}>
        <Notifications style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          <div className={styles.userInfo}>
            <AccountCircle style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
            <span className={styles.userName}>Patrick Santos</span>
          </div>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className={styles['search-bar']}
      />
      <IconButton className={styles['filter-button']} aria-label="filter">
        <Tune />
      </IconButton>
      <div className={styles['doctor-list']}>
        {doctors.map((doctor) => (
          <div className={styles['doctor-card']} key={doctor.id}>
            <div className={styles['doctor-info']}>
              <img src={doc} alt="Doctor" className={styles['profile-pic']} />
              <div className={styles['doctor-details']}>
                <h3>{doctor.name}</h3>
                <p className={styles.qualifications}>{doctor.qualifications}</p>
              </div>
            </div>
            <div className={styles['doctor-actions']}>
              <button className={styles['send-button']}>
                <Send />
              </button>
              <button className={styles['availability-button']}>
                <i className="fas fa-paper-plane"></i> Check Availability
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
