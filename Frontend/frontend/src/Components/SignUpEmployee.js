import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock} from '@fortawesome/free-solid-svg-icons';
import { FaHippo } from 'react-icons/fa6';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const SignUpEmployee = () => {
  const [username, setUsername] = useState('');
  const [companyseedphase, setCompanySeedPhase] = useState('');
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
      const response = await axios.post(`http://localhost:5130/api/SignUp/SignUpUser`, null,{
        params: {
          UserName: username,
          Password: password,
          SeedPhase: companyseedphase
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
        <FontAwesomeIcon icon={faUser} className="icon" />
        <input
          type="text"
          placeholder="Company Seed Phase"
          value={companyseedphase}
          onChange={(e) => setCompanySeedPhase(e.target.value)}
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
      <a href="/" className="forgot-password" >Log In</a>
    </div>
  </div>
  );
  
};

export default SignUpEmployee;