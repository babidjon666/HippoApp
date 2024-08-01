import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHippo } from 'react-icons/fa6';

const SignUp = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sign-box-container">
      <div className="sign-box">
          <FaHippo className="hippo-icon" />
          <h2>Select Your Role</h2>
          <button onClick={() => handleNavigation('/AdminSignUp')} className="login-button">I'm Owner</button>
          <button onClick={() => handleNavigation('/EmployeeSignUp')} className="login-button">I'm Employee</button>
        </div>
    </div>
  );
};

export default SignUp;