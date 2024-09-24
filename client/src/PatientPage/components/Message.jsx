import React from 'react';
import { Notifications, AccountCircle } from '@mui/icons-material';
import styles from '../styles/MessagePatient.module.css';

const Message = () => {
  return (
    <div className={styles.doctorsSection}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>Message</h1>
        </div>
        <div className={styles.headerActions}>
          <Notifications style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          <div className={styles.userInfo}>
            <AccountCircle style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
            <span className={styles.userName}>Patrick Santos</span>
          </div>
        </div>
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
                <h4>Dr. Smith</h4>
                <p>Good Morning Sec...</p>
              </div>
            </div>
            <span className={styles.messageTime}>1:15pm</span>
          </div>
        </div>

        {/* Chatbox */}
        <div className={styles.messagePanel}>
          <div className={styles.messageHeader}>
            <AccountCircle style={{fontSize: '40px', marginTop: '10px' }}/>
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

export default Message;
