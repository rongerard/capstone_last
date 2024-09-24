import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
import styles from '../styles/AppointmentPatient.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Notifications, AccountCircle, FilterAlt, ContentPaste, CalendarMonth } from '@mui/icons-material';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Use axios to fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('/patient/appointment/viewAppointments', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Assuming token-based authentication
          }
        });
        setAppointments(response.data);  // Set the fetched appointments
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };
  return (
    <div className={styles.doctorsSection}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>Appointment</h1>
          <p>Previous appointment and Queue</p>
        </div>
        <div className={styles.headerActions}>
          <Notifications style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          <AccountCircle style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
            <span className={styles.userName}>Patrick Santos</span>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.searchAppointment}>
        <input type="text" placeholder="Search Appointment" />
        <div className={styles.actionButtons}>
          <button className={styles.filterBtn}><FilterAlt /></button>
          <button className={styles.saveBtn}><ContentPaste />|<CalendarMonth /></button>
          <button className={styles.listBtn}>Queue List</button>
        </div>
      </div> 

      {/* Doctors Table Headers */}
      <div className={styles.tableHeader}>
        <span>AppID</span>
        <span>Doctor Name</span>
        <span>Date</span>
        <span>Time</span>
        <span>Queue no.</span>
        <span>Status</span>
        <span>Action</span>
      </div>
    {/* Appointments List */}
    <div className={styles.appointmentsList}>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div className={styles.appointmentRow} key={appointment.id} onClick={() => handleRowClick(appointment)}>
              <span>{appointment.id}</span>
              <span>{appointment.DOCTOR_NAME}</span>
              <span>{appointment.APPOINTMENT_DATE}</span>
              <span>{appointment.APPOINTMENT_TIME}</span>
              <span>{appointment.QUEUE_NUMBER || 'N/A'}</span>
              <span>{appointment.STATUS}</span>
              <span>
                <button className={styles.actionBtn}>View</button>
              </span>
            </div>
          ))
        ) : (
          <div>No appointments found</div>
        )}
      </div>

      {/* Bootstrap Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Appointment Details</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>First Name:</strong> {selectedAppointment.FIRST_NAME}</p>
                <p><strong>Middle Name:</strong> {selectedAppointment.MIDDLE_NAME || 'N/A'}</p>
                <p><strong>Last Name:</strong> {selectedAppointment.LAST_NAME}</p>
                <p><strong>Age:</strong> {selectedAppointment.AGE}</p>
                <p><strong>Doctor Name:</strong> {selectedAppointment.DOCTOR_NAME}</p>
                <p><strong>Appointment Date:</strong> {selectedAppointment.APPOINTMENT_DATE}</p>
                <p><strong>Appointment Time:</strong> {selectedAppointment.APPOINTMENT_TIME}</p>
                <p><strong>Reason:</strong> {selectedAppointment.REASON}</p>
                <p><strong>Contact Number:</strong> {selectedAppointment.CONTACT_NUMBER}</p>
                <p><strong>Type:</strong> {selectedAppointment.TYPE}</p>
                <p><strong>Status:</strong> {selectedAppointment.STATUS}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
