import React, { useState } from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import './adminlogin.css';

function Adminlogin() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const onClickLogin = async() => {
    let admin = {
      username: username,
      password: password
    }

    await axios.post('/login-admin', admin)
      .then((res) => {
        console.log(res.data);
        let path = `/home`
        history.push(path);
        localStorage.setItem('token', res.data.token);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      })
  }

    return (

<div className="setBackground">
    <div className="setBody">

        <div className="loginContainer" id="loginContainer">
          <div className="form-loginContainer sign-in-loginContainer">

          <h1 className="signinName">Sign in</h1> 

            <div className="loginForm">

              <input
                type="text"
                className="loginInput"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}     
              />
              
              <input
                type="password" 
                className="loginInput" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}     
              />

              <button className="signButton" onClick={onClickLogin}>Sign In</button>
            </div>
          </div>


          <div className="overlay-panel overlay-right">
                <img src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />

          </div>
         </div>

    </div>
</div>
    )
}

export default Adminlogin;