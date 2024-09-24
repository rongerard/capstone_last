import React from 'react';
import styles from '../styles/HomePatient.module.css';
import { Notifications, AccountCircle } from '@mui/icons-material';
import doctor from '../images/doctor.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>Good Day Patrick!</h1>
          <p>How are you feeling today?</p>
        </div>
        <div className={styles.headerActions}>
          <Notifications style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          <div className={styles.userInfo}>
            <AccountCircle style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
            <span className={styles.userName}>Patrick Santos</span>
          </div>
        </div>
      </div>
      
        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <img src={doctor} alt="Doctor Illustration" className={styles.bannerImage} />
            <div className={styles.bannerText}>
              <p>Schedule an Appointment with a Specialist to<br></br>
              Begin Your Journey to Healing and Wellness.</p>
              <button className={styles.findDoctorButton}><Link to="/patient/doctors" className={styles.doctorsLink}>Find Your Doctor Now!</Link></button>
            </div>
          </div>
        </div>

      <div className={styles.appointmentsSection}>
        <div className={styles.appointmentsContainer}>
          <h2>Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>AppId</th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ~database~
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.completedAppointmentsSection}>
        <div className={styles.completedAppointmentsContainer}>
          <h2>Completed Appointments</h2>
          <table>
            <thead>
              <tr>
                <th>AppId</th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ~database~
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.notificationsSection}>
        <div className={styles.notificationsContainer}>
          <h2><Notifications /> Notifications</h2>
        </div>
      </div>

      <div className={styles.datetimeSection}>
        <div className={styles.datetimeContainer}>
          <h2>Date & Time</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
