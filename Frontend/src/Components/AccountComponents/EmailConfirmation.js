import React from 'react';
import axios from 'axios';
import './TwoFactor.css';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

function EmailConfirmation() {

    const navigate=useNavigate();

    const Inbox = async () => {
      window.open('https://mail.google.com', '_blank');
    }

    const Next = async () => {
      navigate("/signIn");
    }

    return (
      <div className="confirmed-app">
        <div className="container" style={{ width: "100vh", borderRadius: "10px", backdropFilter: "blur(30px)" }}>
          <h1 className="mt-5">We sent you a confirmation link to your inbox.</h1>
          <p className="mb-5">
            <b>Please click on it.</b>
          </p>

          <div className="d-flex justify-content-center"> {/* Add this wrapper div */}
            <div className='px-3'>
              <Button variant="warning" onClick={() => Inbox()}>
                Open inbox
              </Button>
            </div>
            <div className='px-4'> 
              <Button variant='success' onClick={()=>Next()}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EmailConfirmation;
