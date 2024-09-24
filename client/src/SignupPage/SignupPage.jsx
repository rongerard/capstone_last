import React, { useState } from 'react';
import axios from 'axios';
import styles from './SignupPage.module.css';
import logoImage from './images/logo.png';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    confirmPassword: '',
    requiredFields: '',
    terms: '',
    server: '',
    email: '',
    phoneNumber: '',
  });

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    setIsTermsChecked(e.target.checked);
  };

  const validateForm = () => {
    let valid = true;
    setErrors({ confirmPassword: '', requiredFields: '', terms: '', server: '', email: '', phoneNumber: '' });

    if (formValues.password !== formValues.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
      valid = false;
    }

    for (const key in formValues) {
      if (formValues[key].trim() === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          requiredFields: 'All fields are required.',
        }));
        valid = false;
        break;
      }
    }

    if (!isTermsChecked) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        terms: 'You must agree to the Terms and Privacy Policy.',
      }));
      valid = false;
    }

    return valid;
  };

  const handleCreateAccount = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post('/signup/patientregister', {
          FIRST_NAME: formValues.firstName,
          LAST_NAME: formValues.lastName,
          EMAIL: formValues.email,
          CONTACT_NUMBER: formValues.phoneNumber,
          PASSWORD: formValues.password,
        });

        if (response.status === 201) {
          navigate('/verification');
        }
      } catch (err) {
        if (err.response && err.response.status === 409) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            server: 'A patient with this email or contact number already exists.',
          }));
        } else {
          console.error('Signup error:', err);
          setErrors((prevErrors) => ({
            ...prevErrors,
            server: 'An unexpected error occurred. Please try again later.',
          }));
        }
      }
    }
  };

  const inlineBodyStyle = {
    margin: '0',
    padding: '0',
    boxSizing: 'border-box',
    background: `url(${require('./images/AceBldg.png')}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    minHeight: '100vh',
  };

  const buttonStyle = {
    marginTop: '20px',
    width: '400px',
    fontSize: '1.2em',
    padding: '15px 0',
    borderRadius: '8px',
    backgroundColor: '#3d9d3b',
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#1b5e20',
    transform: 'translateY(-2px)',
  };

  return (
    <div style={inlineBodyStyle}>
      <div className={styles.signupContainer}>
        <div className={styles.formSection}>
          <div className={styles.formContent}>
            <img src={logoImage} alt="logo" className={styles.logoImage} />
            <h2 className={styles.title}>
              GET STARTED WITH <span className={styles.gradientText}>ACE QUEUE</span>
            </h2>
            <p className={styles.text}>Create an account now!</p>

            {/* All error messages above First Name and Last Name fields */}
            {(errors.requiredFields || errors.server || errors.confirmPassword || errors.terms || errors.email || errors.phoneNumber) && (
              <p className={styles.errorText}>
                {errors.requiredFields || errors.server || errors.confirmPassword || errors.terms || errors.email || errors.phoneNumber}
              </p>
            )}

            <div className={styles.inputGroup}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                className={styles.inputField}
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                className={styles.inputField}
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                className={styles.inputField}
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
                type="email"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                className={styles.inputField}
                name="phoneNumber"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                className={styles.inputField}
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                className={styles.inputField}
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            </div>

            <div className={styles.checkbox}>
              <div className={styles.box1}>
                <FormControlLabel
                  control={<Checkbox name="rememberMe" color="primary" />}
                  label="Remember me"
                />
              </div>
              <div className={styles.box2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms"
                      color="primary"
                      checked={isTermsChecked}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <>
                      I agree to all the <a href="#" className={styles.termsLink}>Terms</a> and <a href="#" className={styles.privacyLink}>Privacy policy</a>
                    </>
                  }
                />
              </div>
            </div>

            <Button
              variant="contained"
              color="success"
              fullWidth
              style={buttonStyle}
              onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
