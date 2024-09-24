import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './VerificationPage.module.css';
import logoImage from './images/logo.png';
import otpImage from './images/otp-image.png'; 

const OtpVerification = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    console.log("OTP Submitted", otpValue);

    // Add validation logic here if needed
    if (otpValue.length === 4) { // Example condition: all 4 digits are entered
      navigate('/accountSuccess'); // Navigate to the success page
    } else {
      alert("Please enter the complete OTP");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.verificationBox}>
        <img src={logoImage} alt="logo" className={styles.logo} />
        <h2 className={styles.title}>
          GET STARTED WITH <span className={styles.highlight}>ACE QUEUE</span>
        </h2>
        <img src={otpImage} alt="OTP Verification" className={styles.otpImage} />
        <p className={styles.otpVer}>OTP Verification</p>

        <div className={styles.otpInput}>
          {otp.map((data, index) => {
            return (
              <input
                className={styles.otpDigit}
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>

        <p>
          Didn’t you receive the OTP?{" "}
          <a href="#" className={styles.resendLink} onClick={handleResend}>
            Resend OTP
          </a>
        </p>

        <button className={styles.verifyButton} onClick={handleSubmit}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default OtpVerification;
