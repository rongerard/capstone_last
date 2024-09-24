import React from 'react';
import { NavLink } from 'react-router-dom';
import { Notifications, AccountCircle, FilterAlt } from '@mui/icons-material';
import styles from '../styles/patientsSecre.module.css';  // Import the CSS module

const patient = () => {
  return (
    <div className={styles.doctorsSection}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>TIME</h1>
          <p>DATE</p>
        </div>
        <div className={styles.headerActions}>
          <Notifications style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          <NavLink to="/secretary/profile" className={styles.profileIcon}>
            <AccountCircle style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          </NavLink>
          <span className={styles.userName}>Catherine C. Bautista</span>
        </div>
      </div>

      {/* Patient Section */}
      <div className={styles.doctorsHeader}>
        <div>
          <h2>Patients</h2>
          <p>This is the latest update for the last 7 days. Check now!</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.searchAppointment}>
        <input type="text" placeholder="Search Appointment" />
        <div className={styles.actionButtons}>
          <button className={styles.filterBtn}><FilterAlt/></button>
        </div>
      </div>

      {/* Patient Table Headers */}
      <div className={styles.tableHeader}>
        <span>Patient ID</span>
        <span>Patient Name</span>
        <span>Number</span>
        <span>Doctor</span>
        <span>Date of last visit</span>
      </div>
    </div>
  );
};

export default patient;
