import React from 'react';
import { NavLink } from 'react-router-dom';
import { Notifications, AccountCircle, Add } from '@mui/icons-material';
import styles from '../styles/messagesSecre.module.css'; // Import CSS module

const messages = () => {
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
          <h2>Message</h2>
          <p>This is the latest update for the last 7 days. Check now!</p>
        </div>
        <button className={styles.addDoctorBtn}><Add style={{fontSize: '30px'}}/> New Message</button>
      </div>
      {/* Message Container */}
      <div className={styles.messageContainer}>
        {/* Sidebar for message threads */}
        <div className={styles.messageSidebar}>
          <div className={styles.sidebarHeader}>
            <input type="text" placeholder= "Search Message" className={styles.sidebarSearch} />
          </div>
          <div className={styles.messageItem}>
            <div className={styles.messageUser}>
              <AccountCircle style={{fontSize: '40px'}}/>
              <div className={styles.userDetails}>
                <h4>Ejay Domen</h4>
                <p>Good Morning Sec...</p>
              </div>
            </div>
            <span className={styles.messageTime}>1:15pm</span>
          </div>
          <div className={styles.messageItem} style={{ backgroundColor: '#fff'}}>
            <div className={styles.messageUser}>
              <AccountCircle style={{fontSize: '40px'}}/>
              <div className={styles.userDetails}>
                <h4>Frenz Benobo</h4>
                <p>Good Morning Sec...</p>
              </div>
            </div>
            <span className={styles.messageTime}>10:37am</span>
          </div>
        </div>

        {/* Chatbox */}
        <div className={styles.messagePanel}>
          <div className={styles.messageHeader}>
            <AccountCircle style={{fontSize: '40px', marginTop: '-5px' }}/>
            <h3>Ejay Domen</h3>
          </div>
          <div className={styles.messageBody}>
            {/* Empty space where the conversation would be */}
          </div>
          <div className={styles.messageInput}>
            <input type="text" placeholder="Your message here...." className={styles.inputBox} />
            <button className={styles.sendButton}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default messages;
