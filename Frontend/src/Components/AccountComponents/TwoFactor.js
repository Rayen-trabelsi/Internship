import React from 'react';
import axios from 'axios';
import './TwoFactor.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function TwoFactor() {

    const navigate=useNavigate();

    const [code, setcode] = useState("")
    const [username, setusername] = useState("")
    const [CodeErrorMessage, setCodeErrorMessage] = useState(false)
    const [UsernameErrorMessage, setUsernameErrorMessage] = useState(false)

    const login = async () => {
        console.log(code)
        console.log(username)
        try {
            await axios.post('https://localhost:7010/api/Authentication/login-2FA',null,{
            params: {
                code: code,
                username: username,
            }
        })
            
                .then((response) => {
                    console.log('test',response)
                    console.log(response.data);
                    Cookies.set("jwt", response.data.token);
                    navigate("/DashboardAdmin")
                })
        } catch (error) {
            console.log('test',error)
            console.error("Error:", error.response);
        }

    }

    return (

        <div className="confirmed-app">
  <div className="container with-background" style={{ width: "100vh", borderRadius: "10px", backdropFilter: "blur(30px)" }}>
    <h1 className="mt-5">We sent you a Two factor authentication code to your inbox.</h1>
    <p className="mb-5">
      <b>Please enter it here :</b>
    </p>

    <div className="d-flex justify-content-center mb-4">
      <input type="text" className="form-control form-control-lg form-SignIn text-center" placeholder="2FA code" aria-label="code" name="code" value={code} onChange={(e) => setcode(e.target.value)} required style={{ maxWidth: "250px" }} />
    </div>

    {CodeErrorMessage && (
      <Alert variant="danger" className="mt-1">
        <div className="form-icon-wrapper" style={{ height: "20px", fontSize: "14px", marginTop: "-11px", marginBottom: "-13px", fontWeight: "bold" }}>
          Code is incorrect! Check your 2FA code!
        </div>
      </Alert>
    )}

<div className="d-flex justify-content-center mb-4"> 
      <input type="text" className="form-control form-control-lg form-SignIn text-center" placeholder="Username" aria-label="username" name="username" value={username} onChange={(e) => setusername(e.target.value)} required style={{ maxWidth: "250px" }} />
    </div>

    {UsernameErrorMessage && (
      <Alert variant="danger" className="mt-1">
        <div className="form-icon-wrapper" style={{ height: "20px", fontSize: "14px", marginTop: "-11px", marginBottom: "-13px", fontWeight: "bold" }}>
        Username is incorrect! Check your username!
        </div>
      </Alert>
    )}

    <div className="d-flex justify-content-center"> 
      <Button variant="warning" onClick={() => login()}>
        Continue
      </Button>
    </div>
  </div>
</div>

    );
}
export default TwoFactor;