import React from 'react';
import { NavLink } from 'react-router-dom';
import { Notifications, AccountCircle, FilterAlt, Add } from '@mui/icons-material';
import styles from '../styles/queuesSecre.module.css'; // Import CSS module

const queue = () => {
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

      {/* Doctors Section */}
      <div className={styles.doctorsHeader}>
        <div>
          <h2>Queue List</h2>
          <p>This is the list of doctors and their status & queue. Check now!</p>
        </div>
        <button className={styles.addDoctorBtn}><Add style={{fontSize: '30px'}}/> Add Queue</button>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.searchAppointment}>
        <input type="text" placeholder="Search Appointment" />
        <div className={styles.actionButtons}>
          <button className={styles.filterBtn}><FilterAlt /></button>
        </div>
      </div>

      {/* Doctors Table Headers */}
      <div className={styles.tableHeader}>
        <span>No</span>
        <span>QID</span>
        <span>Doctor's Name</span>
        <span>Specialty</span>
        <span>Time</span>
        <span>Status</span>
        <span>Queue</span>
      </div>
    </div>
  );
};

export default queue;
