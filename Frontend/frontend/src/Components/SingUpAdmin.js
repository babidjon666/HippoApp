// SignUp.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faBuilding} from '@fortawesome/free-solid-svg-icons';
import { FaHippo } from 'react-icons/fa6';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const SignUpAdmin = () => {
  const [username, setUsername] = useState('');
  const [companyname, setCompanyname] = useState('');
  const [companypassword, setCompanyPassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
        // Валидация
    if (password !== repeatPassword) {
      message.warning('Passwords do not match');
      return;
    }

    if (password.length <= 10) {
      message.warning('Password must be more than 10 characters long');
      return;
    }

    if (password.length > 30) {
      message.warning('The password must not contain more than 30 characters.');
      return;
    }

    if (username.length <= 5) {
      message.warning('Name must be more than 5 characters long');
      return;
    }

    if (username.length > 20) {
      message.warning('The name must not contain more than 20 characters.');
      return;
    }

    // Проверка, что имя не начинается с цифры
    if (/^\d/.test(username)) {
      message.warning('Name cannot start with a number');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5130/api/SignUp/SignUpAdmin`, null,{
        params: {
          UserName: username,
          Password: password,
          CompanyName: companyname,
          CompanyPassword: companypassword
        }
      });

      if (response.status === 201) {
        message.success("User registered successfully");
        setTimeout(() => { 
          navigate('/')
        }, 1000)
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.warning('Username is already taken');
      } else {
        message.error('Server error');
        console.error('There was an error!', error);
      }
    }
  };

  return (
    <div className="sign-box-container">
    <div className="sign-box">
      <FaHippo className="hippo-icon" />
      <h2>SIGN UP</h2>
      <div className="input-container">
        <FontAwesomeIcon icon={faUser} className="icon" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <FontAwesomeIcon icon={faBuilding} className="icon" />
        <input
          type="text"
          placeholder="Company Name"
          value={companyname}
          onChange={(e) => setCompanyname(e.target.value)}
        />
      </div>
      <div className="input-container">
        <FontAwesomeIcon icon={faLock} className="icon" />
        <input
          type="password"
          placeholder="Company Password"
          value={companypassword}
          onChange={(e) => setCompanyPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <FontAwesomeIcon icon={faLock} className="icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <FontAwesomeIcon icon={faLock} className="icon" />
        <input
          type="password"
          placeholder="Repeat Password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleSignUp}>Sign Up</button>
      <a href="/" className="forgot-password">Log In</a>
    </div>
  </div>
  );
  
};

export default SignUpAdmin;