import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Person, EventNote, Chat, Logout } from '@mui/icons-material';
import styles from '../styles/SidebarPatient.module.css';
import logo from '../images/logo.png';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <nav className={styles.nav}>
        <NavLink to="/patient/home" className={styles.navItem} activeClassName={styles.active}>
          <Home />
          <span>Home</span>
        </NavLink>
        <NavLink to="/patient/doctors" className={styles.navItem} activeClassName={styles.active}>
          <Person />
          <span>Doctors</span>
        </NavLink>
        <NavLink to="/patient/appointment" className={styles.navItem} activeClassName={styles.active}>
          <EventNote />
          <span>Appointment</span>
        </NavLink>
        <NavLink to="/patient/message" className={styles.navItem} activeClassName={styles.active}>
          <Chat />
          <span>Message</span>
        </NavLink>
        <NavLink to="/" className={styles.out} activeClassName={styles.active}>
          <Logout />
          <span>Log Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
