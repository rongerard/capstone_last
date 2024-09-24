import React, { useState, useEffect } from 'react';
import calendar from '../images/calendar.png';
import doctorLogo from '../images/doctor.png'; 
import styles from '../styles/dashboardSecre.module.css';
import { NavLink } from 'react-router-dom';
import { Notifications, AccountCircle} from '@mui/icons-material'; // Import icons for Total Appointment and Doctors

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString());
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>{currentTime}</h1>
          <p>{currentDate}</p>
        </div>
        <div className={styles.headerActions}>
          <Notifications style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          <NavLink to="/secretary/profile" className={styles.profileIcon}>
            <AccountCircle style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          </NavLink>
          <span className={styles.userName}>Catherine C. Bautista</span>
        </div>
      </div>

      
      {/* First Row: Outpatient Department, Total Appointments, Doctors */}
      <div className={styles.outpatientDepartment}>
        <h3>Outpatient Department</h3>
        <p>For Room <strong>420</strong></p>
      </div>

      {/* Total Appointments Section */}
      <div className={styles.totalAppointments}>
        <div className={styles.iconContainer}>
          <img 
            src={calendar} 
            alt="calendar" 
            className={styles.icon} 
            style={{ width: '130px', height: '100px', padding: "20px" }} // Inline style example for image size
          /> {/* Icon for Total Appointments */}
        </div>
        <div>
          <h3>Total Appointments</h3>
          <p>187</p>
        </div>
      </div>


      {/* Doctors Section */}
      <div className={styles.doctors}>
        <div>
          <img 
            src={doctorLogo} 
            alt="doctor" 
            className={styles.icon} 
            width="130px" // Example size
            height="100px" // Example size
          /> {/* Icon for Doctors */}
        </div>
        <div>
          <h3>Doctors</h3>
          <p>13</p>
        </div>
      </div>

      {/* Second Row: Patient Attended, Notifications */}
      <div className={styles.patientAttended}>
        <h3>Patient Attended</h3>
        {/* Graph placeholder */}
        <div className={styles.patientGraph}>
          <p>Graph will be here</p>
        </div>
      </div>

      <div className={styles.notifications}>
        <h3>Notifications</h3>
        <p>No new notifications</p>
      </div>

      {/* Third Row: Today's Appointment and Queue List */}
      <div className={styles.tableRow}>
        {/* Today's Appointment Table */}
        <div className={styles.tableContainer}>
          <h3>Today's Appointment</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Patient Name</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Bautista, Kelsey C.</td>
                <td>21-Sep-2024</td>
                <td>10:00 AM</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Benobo, Frenz A.</td>
                <td>21-Sep-2024</td>
                <td>11:00 AM</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Contreras, Ron Gerard B.</td>
                <td>21-Sep-2024</td>
                <td>12:00 PM</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Domen, Ejay Matthew G.</td>
                <td>21-Sep-2024</td>
                <td>1:00 PM</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Santos, Patrick Bien D.</td>
                <td>21-Sep-2024</td>
                <td>2:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Today's Queue List Table */}
        <div className={styles.tableContainer}>
          <h3>Today's Queue List</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Que No.</th>
                <th>Patient Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>P-001</td>
                <td>Bautista, Kelsey C.</td>
                <td>ON-GOING</td>
              </tr>
              <tr>
                <td>P-002</td>
                <td>Benobo, Frenz A.</td>
                <td>NEXT</td>
              </tr>
              <tr>
                <td>P-003</td>
                <td>Contreras, Ron Gerard B.</td>
                <td>WAITING</td>
              </tr>
              <tr>
                <td>P-004</td>
                <td>Domen, Ejay Matthew G.</td>
                <td>WAITING</td>
              </tr>
              <tr>
                <td>P-005</td>
                <td>Santos, Patrick Bien D.</td>
                <td>WAITING</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
