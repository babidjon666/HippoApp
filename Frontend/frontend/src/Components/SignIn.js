import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FaHippo } from 'react-icons/fa6';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './HippoPages/UserContext'; 

const SignIn = ({ toggleForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const { setUser } = useContext(UserContext);

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:5130/api/SignIn', null, {
        params: {
          userName: username,
          userPassword: password
        }
      });

      if (response.status === 200) {
        message.success('Login Successful');
        console.log('User data:', response.data);
        setUser(response.data);
        navigate('/main/HippoApp');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        message.warning('Username or Password is incorrect');
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
        <h2>LOG IN</h2>
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
          <FontAwesomeIcon icon={faLock} className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleSignIn}>Login</button>
        <a href="/SignUp" className="forgot-password" onClick={toggleForm}>Sign Up</a>
      </div>
    </div>
  );
};

export default SignIn;