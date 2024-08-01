import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './Styles/Sign.css';
import './Styles/Hippo.css';
import './Styles/Company.css';
import './Styles/Profile.css';
import './Styles/Workers.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
        <App/>
    </div>
  </React.StrictMode>
);

reportWebVitals();