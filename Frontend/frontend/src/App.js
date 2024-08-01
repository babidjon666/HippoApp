import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import SignUpEmployee from './Components/SignUpEmployee';
import SignUpAdmin from './Components/SingUpAdmin';
import HippoMain from './Components/HippoPages/HippoMain';
import { UserProvider } from './Components/HippoPages/UserContext'; // Импортируем UserProvider

const App = () => {
  return (
    <UserProvider>
       <Router>
         <Routes>
          <Route path="/" element={ <SignIn />}/>
          <Route path="/SignUp" element={ <SignUp />}/>
          <Route path="/EmployeeSignUp" element={ <SignUpEmployee />}/>
          <Route path="/AdminSignUp" element={ <SignUpAdmin />}/>

          <Route path="/main/HippoApp" element={ <HippoMain />}/>
          </Routes>
        </Router>
    </UserProvider>
   
  );
}

export default App;