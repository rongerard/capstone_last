import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowDropDown , Notifications, AccountCircle, FilterAlt, ContentPaste, CalendarMonth, Add} from '@mui/icons-material';
import styles from '../styles/appointmentsSecre.module.css'; // Importing module CSS

const Appointments = () => {
  const [selectedOption, setSelectedOption] = useState('Doctor\'s Appointments');

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

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

      {/* Doctors Header */}
      <div className={styles.doctorsHeader}>
        <div>
          <h2>Appointments</h2>
          <p>This is the list of schedule for the doctors this upcoming week. Check now!</p>
        </div>
        <button className={styles.addDoctorBtn}><Add style={{fontSize: '30px'}}/> New Appointment</button>
      </div>


      {/* Search and Filter Section */}
      <div className={styles.searchAppointment}>
        {/* Dropdown Section */}
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdown}>
            <div className={styles.dropdownHeader}>
              <span>{selectedOption}</span>
              <ArrowDropDown className={styles.dropdownIcon} />
            </div>
            <div className={styles.dropdownMenu}>
              <div onClick={() => handleDropdownChange('Doctor\'s Appointments')} className={styles.dropdownItem}>Doctor's Appointments</div>
              <div onClick={() => handleDropdownChange('Previous Appointments')} className={styles.dropdownItem}>Previous Appointments</div>
            </div>
          </div>
        </div>
        <input type="text" placeholder="Search Appointment" />
        <div className={styles.actionButtons}>
          <button className={styles.filterBtn}>
            <FilterAlt />
          </button>
          <button className={styles.saveBtn}>
            <ContentPaste />|<CalendarMonth />
          </button>
        </div>
      </div>

      {/* Doctors Table Headers */}
      <div className={styles.tableHeader}>
        <span>App ID</span>
        <span>Doctor Name</span>
        <span>Date</span>
        <span>Time</span>
        <span>Queue No</span>
        <span>Status</span>
        <span>Action</span>
      </div>
    </div>
  );
};

export default Appointments;
