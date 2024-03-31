import { NavLink, Navigate, useNavigate } from "react-router-dom";
import SideBarAdmin from "./sideBarComponent";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faPlus, faSign } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Cookies from 'js-cookie';

function AddNewPasswordAdmin() {

    const logOut = () => {

        // Vider les cookies
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
        navigate("/signIn")
    }

    const navigate = useNavigate();
    const [website, setwebsite] = useState("");
    const [password, setpassword] = useState("");
    const [visible, setvisible] = useState(false);
    const [userId, setuserId] = useState("");
    const [errorMessage1, setErrorMessage1] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");

    // const [PasswordErrorMessage, setPasswordErrorMessage] = useState("");
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;




    const AddNewPass = async () => {
        const token = Cookies.get('jwt');
        if (token) {
            const decodedToken = jwt_decode(token);
            setuserId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            console.log(userId)
           const result1= await axios.get(`https://localhost:7010/api/User/${userId}`);
           console.log(result1)
           setErrorMessage1("");
        setErrorMessage2("");
        // setPasswordErrorMessage("");
        // console.log(Role)
        
        await axios.post(`https://localhost:7010/api/User/CreatePassword`,{
            website: website,
            password: password,
            visible: visible,
            userId: userId,
            service:result1.data.service
          })

            .then((response) => {
                console.log(response.data)
                navigate("/ListPass")
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const { status, message } = error.response.data;
                    console.log(status, message); // Logging the status and message for debugging

                    if (status === "Error" && message === "An error occurred while creating the password.") {
                        setErrorMessage1("An error occurred while creating the password.");
                    }
                } 
                if (!website || !password ) {
                    setErrorMessage2("All fields are required!")
                }
                // Password validation regular expression


                //   if (!passwordRegex.test(password)) {
                //     setPasswordErrorMessage(
                //       "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
                //     );
                //   }
            })

        }
        
        
    }


    return (
        <>
            <div>
                <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin1.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.9 }}></div>

                <SideBarAdmin></SideBarAdmin>
                <main className="main-content position-relative border-radius-lg ">
                    {/* Navbar */}
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                        <div className="container-fluid py-1 px-3">

                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
                                <ul className="navbar-nav  justify-content-end">
                                    <li className="nav-item d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white font-weight-bold px-0 pt-3 ">
                                            <Button variant="warning" onClick={() => { logOut() }}>
                                                <FontAwesomeIcon icon={faLock} className="px-2" />Log Out
                                            </Button>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    {/* End Navbar */}




                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <form >
                                        <div className="mt-4 mb-3 px-4">
                                            <h3>New Password Information</h3>

                                        </div>
                                        <div className="card-body">
                                            <form role="form">

                                                <div className="mb-3">
                                                    <input type="text" className="form-control form-control-lg form-SignIn" placeholder="Website's name" aria-label="Website" name="Website" value={website} onChange={(e) => setwebsite(e.target.value)} required />
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <input type="text" className="form-control form-control-lg form-SignIn" placeholder="Password" aria-label="Password" name="Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                                                </div>
                                                {errorMessage1 && (
                                                    <Alert variant="danger" className="mt-1">
                                                        <div
                                                            className="form-icon-wrapper"
                                                            style={{
                                                                height: "20px",
                                                                fontSize: "14px",
                                                                marginTop: "-11px",
                                                                marginBottom: "-13px",
                                                                fontWeight: "bold"

                                                            }}
                                                        >
                                                            {errorMessage1}
                                                        </div>
                                                    </Alert>
                                                )}

{errorMessage2 && (
                                                    <Alert variant="danger" className="mt-1">
                                                        <div
                                                            className="form-icon-wrapper"
                                                            style={{
                                                                height: "20px",
                                                                fontSize: "14px",
                                                                marginTop: "-11px",
                                                                marginBottom: "-13px",
                                                                fontWeight: "bold"

                                                            }}
                                                        >
                                                            {errorMessage2}
                                                        </div>
                                                    </Alert>
                                                )}

                                                



                                                <input type="checkbox" className="custom-control-input mt-3" id="customCheck1" checked={visible} onChange={(e) => setvisible(e.target.checked)} />
                                                <label className="custom-control-label px-2" htmlFor="customCheck1">Make visible to all of this service users</label><br></br>
                                                <div className="px-3 d-flex mt-4">
                                                    <div className="px-3">
                                                    <Button variant="success" onClick={() => AddNewPass()} className="mt-3" >
                                                        Add new password
                                                    </Button>
                                                    </div>
                                                    

                                                    <Button variant="warning" onClick={() => { navigate("/ListPass") }} className="mt-3" >
                                                        Cancel
                                                    </Button>
                                                </div>

                                            </form>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default AddNewPasswordAdmin;
