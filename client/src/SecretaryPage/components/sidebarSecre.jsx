import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Person, Groups2, EventNote, Queue, Message, Assessment, Logout } from '@mui/icons-material';
import logo from '../images/logo.png'; // Adjust the path to the logo image
import styles from '../styles/sidebarSecre.module.css'; // Use CSS module

const Sidebar = () => {
  return (
    <div className={styles.sidebar1}>
      <div className={styles.logo1}>
        <img src={logo} alt="Logo" />
      </div>
      <nav className={styles.nav1}>
        <NavLink to="/secretary/dashboard" className={styles.navItem1} activeClassName={styles.aactive1}>
          <Home />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/secretary/doctors" className={styles.navItem1} activeClassName={styles.aactive1}>
          <Person />
          <span>Doctors</span>
        </NavLink>
        <NavLink to="/secretary/patients" className={styles.navItem1} activeClassName={styles.aactive1}>
          <Groups2 />
          <span>Patients</span>
        </NavLink>
        <NavLink to="/secretary/appointments" className={styles.navItem1} activeClassName={styles.aactive1}>
          <EventNote />
          <span>Appointment</span>
        </NavLink>
        <NavLink to="/secretary/queue" className={styles.navItem1} activeClassName={styles.aactive1}>
          <Queue />
          <span>Queue</span>
        </NavLink>
        <NavLink to="/secretary/messages" className={styles.navItem1} activeClassName={styles.aactive1}>
          <Message />
          <span>Message</span>
        </NavLink>
        <NavLink to="/secretary/report" className={styles.navItem1} activeClassName={styles.aactive1}>
          <Assessment />
          <span>Report</span>
        </NavLink>
        <NavLink to="/" className={styles.logout} activeClassName={styles.aactive1}>
          <Logout />
          <span>Log Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
