import React, { useState } from 'react';
import './App.css';
import { Home } from './components/Home';
import { Signup } from './components/Singup';
import { Login } from './components/Login';
import { UserAuth } from './components/UserAuth'
import { SignOut } from './components/SignOut';
import { NavBar } from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Jwt } from './components/Jwt';
import { Verify } from './components/Verify';


function App() {
  const [spinner, setSpinner] = useState("")
  const [authName, setAuthName] = useState("")
  const [jwtToken, setJwtToken] = useState("")

  const getData = (data: any) => {
    setSpinner("app");
  }

  const getUser = (data: any) => {
        console.log("app.js", data)
        setAuthName(data)
  }

  const getJWT = (data:any) => {
    setJwtToken(data);
  }
  //<Kokeilu Tokeni={jwtToken}/>
  return (
    <div className="App">
      <Router>
        <div>
          <>
          <NavBar UserName={authName}/>
          
          <Jwt JWT={getJWT} spinner={spinner}/>
          
          </>
          <Routes>
          <Route path='/' element={<Home UserName={authName} Tokeni={jwtToken}/>}/>
          <Route path='Login' element={<Login onSubmit={getData}/>}/>
          <Route path='Login/Register' element={<Signup/>}/>
          </Routes>
      <UserAuth spinner={spinner} user={getUser}/>
      </div>
      </Router>
    </div>
  );
}

export default App;
