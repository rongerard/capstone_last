import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { TextField, Button } from '@mui/material';
import styles from './ResetPassword.module.css'; // Assuming you've created a CSS module for styling

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const validatePasswords = () => {
    // Password requirements regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      console.log('Passwords match and meet the requirements! Proceed with password reset.');
      // Navigate to the success page
      navigate('/resetSuccess');
    } else {
      console.log('Validation failed. Please correct the errors and try again.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <img src={require('./images/logo.png')} alt="logo" className={styles.logo} />
        <h2 className={styles.title}>
          GET STARTED WITH <span className={styles.highlight}>ACE QUEUE</span>
        </h2>
        <p className={styles.subtitle}>Create a new password</p>

        <form onSubmit={handleSubmit}>
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className={styles.passwordCriteria}>
            Password must:
            <ul>
              <li>be at least a minimum of 8 characters.</li>
              <li>include one uppercase letter.</li>
              <li>include one lowercase letter.</li>
              <li>include one number.</li>
            </ul>
          </p>
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            className={styles.inputField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={!!error}
            helperText={error}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#3d9d3b',
              color: 'white',
              marginBottom: '20px',
              marginTop: '20px',
              height: '50px',
              width: '550px',
              '&:hover': {
                backgroundColor: '#2e7d32', // Darker green on hover
              },
            }}
            type="submit" // Ensure this button submits the form
          >
            Reset Password
          </Button>

        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
