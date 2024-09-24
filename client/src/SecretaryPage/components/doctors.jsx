import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Notifications, AccountCircle, FilterAlt, Add } from '@mui/icons-material';
import styles from '../styles/doctorsSecre.module.css'; // Import the CSS module
import axios from 'axios'; // Assuming you're using axios for API calls
import Modal from 'react-modal'; // You will need to install this

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]); // State to hold doctors data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Selected doctor for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Fetch doctors from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('/secretary/doctors/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setDoctors(response.data); // Set the fetched doctors
        setLoading(false); // Stop loading once data is fetched
      } catch (err) {
        setError(err.message); // Handle any errors
        setLoading(false);
      }
    };

    fetchDoctors(); // Fetch doctors when component mounts
  }, []);

  // Fetch detailed doctor information when a row is clicked
  const handleDoctorClick = async (doctorId) => {
    try {
      const response = await axios.get(`/secretary/doctors/${doctorId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Response Data:', response.data); // Check the API response
      setSelectedDoctor(response.data); // Ensure the state is being updated
      console.log('Selected Doctor State:', response.data); // Log the state update
      setIsModalOpen(true); // Open the modal
    } catch (err) {
      console.error('Failed to fetch doctor details:', err.message);
    }
  };
  

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.doctorsSection}>
      {/* Existing Header Section */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>TIME</h1>
          <p>DATE</p>
        </div>
        <div className={styles.headerActions}>
          <Notifications style={{ fontSize: '60px', padding: '10px', cursor: 'pointer', color: 'gray' }} />
          <NavLink to="/secretary/profile" className={styles.profileIcon}>
            <AccountCircle style={{ fontSize: '60px', padding: '10px',cursor: 'pointer', color: 'gray' }} />
          </NavLink>
          <span className={styles.userName}>Catherine C. Bautista</span>
        </div>
      </div>

      {/* Existing Doctors Section */}
      <div className={styles.doctorsHeader}>
        <div>
          <h2>Doctors</h2>
          <p>This is the latest update for the last 7 days. Check now!</p>
        </div>
        <button className={styles.addDoctorBtn}><Add style={{fontSize: '30px'}}/> Add Doctor</button>
      </div>

      {/* Existing Search and Filter Section */}
      <div className={styles.searchAppointment}>
        <input type="text" placeholder="Search Appointment" />
        <div className={styles.actionButtons}>
          <button className={styles.filterBtn}><FilterAlt /></button>
        </div>
      </div>

      {/* Existing Doctors Table */}
      <div className={styles.tableHeader}>
        <span>No</span>
        <span>ID</span>
        <span>Doctor Name</span>
        <span>Specialty</span>
        <span>Status</span>
      </div>

      {/* Render doctors data in table rows */}
      <div className={styles.tableBody}>
        {doctors.map((doctor, index) => (
          <div key={doctor.id} className={styles.tableRow} onClick={() => handleDoctorClick(doctor.id)}>
            <span>{index + 1}</span>
            <span>{doctor.id}</span>
            <span>{`${doctor.FIRST_NAME} ${doctor.LAST_NAME}`}</span>
            <span>{doctor.EXPERTISE}</span>
            <span>{doctor.DOCTOR_STATUS}</span>
          </div>
        ))}
      </div>

      <Modal
  isOpen={isModalOpen && selectedDoctor}
  onRequestClose={closeModal}
  contentLabel="Doctor's Information"
  className={styles.modal}
  overlayClassName={styles.modalOverlay}
>
  {selectedDoctor && (
    <div style={{ color: 'black' }}> {/* Black text color applied here */}
      <h2>Doctor's Information</h2>

      <div>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {selectedDoctor.FIRST_NAME} {selectedDoctor.LAST_NAME}</p>
        <p><strong>Gender:</strong> {selectedDoctor.GENDER}</p>
        <p><strong>Expertise:</strong> {selectedDoctor.EXPERTISE}</p>
        <p><strong>Professional Acronyms:</strong> {selectedDoctor.HEALTH_PROFESSIONAL_ACRONYM}</p>
      </div>

      <div>
        <h3>Clinic Information</h3>
        <p><strong>Department:</strong> {selectedDoctor.DEPARTMENT}</p>
        <p><strong>Years of Expertise:</strong> {selectedDoctor.YEARS_OF_EXPERIENCE}</p>
      </div>

      <div>
        <h3>Schedule</h3>
        {selectedDoctor.schedule && selectedDoctor.schedule.length > 0 ? (
          selectedDoctor.schedule.map((schedule, idx) => (
            <p key={idx}>
              <strong>Day:</strong> {schedule.day} <br />
              <strong>Time:</strong> {schedule.start_time} - {schedule.end_time}
            </p>
          ))
        ) : (
          <p>No schedule available</p>
        )}
      </div>

      <button onClick={closeModal} className={styles.backButton}>Back</button>
      <button className={styles.editButton}>Edit</button>
    </div>
  )}
</Modal>
    </div>
  );
};

export default DoctorsSection;
