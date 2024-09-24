import React from 'react';
import { Search, Notifications, AccountCircle, CalendarToday, PhoneAndroid } from '@mui/icons-material';
import styles from '../styles/profileSecre.module.css';  // Import as module

const profile = () => {
  return (
    <div className={styles.profileSection}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>TIME</h1>
          <p>DATE</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} />
            <input type="text" placeholder="Search" className={styles.searchBar} />
          </div>
          <Notifications className={styles.headerIcon} />
          <div className={styles.userInfo}>
            <AccountCircle className={styles.profileIcon} />
            <span className={styles.userName}>~ADMIN/SECRETARY</span>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className={styles.profileContainer}>
        {/* Left Side: Basic Info */}
        <div className={styles.profileLeft}>
          <div className={styles.profilePic}>
            <p className={styles.role}>Secretary</p>
          </div>
          <h2>Frenz A. Benobo</h2>
          <p>Age: 22</p>
          <p>Birthday: 09/22/2003</p>
          <p>Sex: Male</p>
          <p><PhoneAndroid /> Contact No.: +63123456789</p>
          <p>Email: frenzbenobo@gmail.com</p>

          <div className={styles.clinicDetails}>
            <h3>Clinic Details:</h3>
            <p>Department: Outpatient Department</p>
            <p>Room: 420</p>
            <p>Floor No.: 4th Floor</p>
            <p>Duty: 8:00 AM - 5:00 PM</p>
            <p>Notes: Secretary for Room 420</p>
          </div>
        </div>

        {/* Right Side: Form Details */}
        <div className={styles.profileRight}>
          <h3>Personal Information:</h3>
          <div className={styles.formGroup}>
            <label>Last Name:</label>
            <input type="text" placeholder="Dela Cruz" />
          </div>
          <div className={styles.formGroup}>
            <label>First Name:</label>
            <input type="text" placeholder="Juan" />
          </div>
          <div className={styles.formGroup}>
            <label>Middle Name:</label>
            <input type="text" placeholder="Dimagiba" />
          </div>
          <div className={styles.formGroup}>
            <label>Date of Birth:</label>
            <input type="text" placeholder="September 10, 2003" />
            <CalendarToday className={styles.icon} />
          </div>
          <div className={styles.formGroup}>
            <label>Age:</label>
            <input type="text" placeholder="21" />
          </div>
          <div className={styles.formGroup}>
            <label>Gender:</label>
            <input type="text" placeholder="Male" />
          </div>
          <div className={styles.formGroup}>
            <label>Contact Number:</label>
            <div className={styles.phoneInput}>
              <span>+63</span>
              <input type="text" placeholder="9123456789" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input type="text" placeholder="frenzbenobo@gmail.com" />
          </div>
          <div className={styles.formGroup}>
            <label>Additional Notes (optional):</label>
            <input type="text" placeholder="Secretary for Room 420" />
          </div>

          <h3>Clinic Details:</h3>
          <div className={styles.formGroup}>
            <label>Department:</label>
            <input type="text" placeholder="Outpatient Department" />
          </div>
          <div className={styles.formGroup}>
            <label>Room:</label>
            <input type="text" placeholder="420" />
          </div>
          <div className={styles.formGroup}>
            <label>Floor Number:</label>
            <input type="text" placeholder="4th Floor" />
          </div>
          <div className={styles.formGroup}>
            <label>Duty:</label>
            <input type="text" placeholder="8:00 AM - 5:00 PM" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
