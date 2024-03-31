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

function AddNewUser() {

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
    const [email, setemail] = useState("")
    const [UserName, setUserName] = useState("")
    // const [Role, setRole] = useState("")
    const [password, setpassword] = useState("")
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [enableTwoFactorAuth, setEnableTwoFactorAuth] = useState(false);
    const [Service, setService] = useState("")
    const [errorMessage1, setErrorMessage1] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [errorMessage3, setErrorMessage3] = useState("");
    const [errorMessage4, setErrorMessage4] = useState("");
    const [errorMessage5, setErrorMessage5] = useState("");
    const [errorMessage6, setErrorMessage6] = useState("");
    // const [PasswordErrorMessage, setPasswordErrorMessage] = useState("");
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;




    const AddNewUser = async () => {
        const token = Cookies.get('jwt');
        if (token) {
            const decodedToken = jwt_decode(token);
           const result= await axios.get(`https://localhost:7010/api/User/${decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`);
console.log(result);
           setErrorMessage1("");
        setErrorMessage2("");
        setErrorMessage3("");
        setErrorMessage4("");
        setErrorMessage5("");
        setErrorMessage6("");
        // setPasswordErrorMessage("");
        // console.log(Role)
        console.log(UserName)
        console.log(email)
        console.log(password)
        console.log(enableTwoFactorAuth)
        
        await axios.post('https://localhost:7010/api/User/CreateUser', {
            firstName: FirstName,
            lastName: LastName,
            username: UserName,
            email: email,
            password: password,
            twoFactorEnabled: enableTwoFactorAuth,
            service: result.data.service
        }, {
            params: {
                role: "User"
            }
        })

            .then((response) => {
                console.log(response.data)
                navigate("/ListUsers")
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const { status, message } = error.response.data;
                    console.log(status, message); // Logging the status and message for debugging

                    if (status === "Error" && message === "User already exists!") {
                        setErrorMessage1("User already exists. Please use a different email.");
                    }
                    else if (status === "Error" && message === "User failed to create.") {
                        setErrorMessage2("User with this username exists already.");
                    }
                    else if (status === "Error" && message === "This role does not exist.") {
                        setErrorMessage4("Selected role does not exist. Please choose a valid role.");
                    }
                    else {
                        setErrorMessage3("An unexpected error occurred.");
                    }
                } else {
                    setErrorMessage3("An unexpected error occurred.");
                }
                if (!UserName || !email || !password || !LastName || !FirstName ) {
                    setErrorMessage3("All fields are required!")
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
                                    {/* <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white p-0" id="iconNavbarSidenav">
                                            <div className="sidenav-toggler-inner">
                                                <i className="sidenav-toggler-line bg-white" />
                                                <i className="sidenav-toggler-line bg-white" />
                                                <i className="sidenav-toggler-line bg-white" />
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item px-3 d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white p-0">
                                            <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown pe-2 d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fa fa-bell cursor-pointer" />
                                        </a>
                                    </li> */}
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
                                            <h3>User Information</h3>

                                        </div>
                                        <div className="card-body">
                                            <form role="form">

                                                <div className="mb-3">
                                                    <input type="FirstName" className="form-control form-control-lg form-SignIn" placeholder="FirstName" aria-label="FirstName" name="FirstName" value={FirstName} onChange={(e) => setFirstName(e.target.value)} required />
                                                </div>
                                                {errorMessage5 && (
                                                    <Alert variant="danger" className="mt-1">
                                                        <div
                                                            className="form-icon-wrapper"
                                                            style={{
                                                                height: "45px",
                                                                fontSize: "14px",
                                                                marginTop: "-11px",
                                                                marginBottom: "-13px",
                                                                fontWeight: "bold"

                                                            }}
                                                        >
                                                            {errorMessage5}
                                                        </div>
                                                    </Alert>
                                                )}

                                                <div className="mb-3">
                                                    <input type="LastName" className="form-control form-control-lg form-SignIn" placeholder="LastName" aria-label="LastName" name="LastName" value={LastName} onChange={(e) => setLastName(e.target.value)} required />
                                                </div>
                                                {errorMessage6 && (
                                                    <Alert variant="danger" className="mt-1">
                                                        <div
                                                            className="form-icon-wrapper"
                                                            style={{
                                                                height: "45px",
                                                                fontSize: "14px",
                                                                marginTop: "-11px",
                                                                marginBottom: "-13px",
                                                                fontWeight: "bold"

                                                            }}
                                                        >
                                                            {errorMessage6}
                                                        </div>
                                                    </Alert>
                                                )}

                                                <div className="mb-3">
                                                    <input type="text" className="form-control form-control-lg form-SignIn" placeholder="UserName" aria-label="UserName" name="UserName" value={UserName} onChange={(e) => setUserName(e.target.value)} required />
                                                </div>


                                                <div className="mb-3">
                                                    <input type="email" className="form-control form-control-lg form-SignIn" placeholder="Email" aria-label="Email" name="email" value={email} onChange={(e) => setemail(e.target.value)} required />
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

                                                <div className="mb-3">
                                                    <input type="password" className="form-control form-control-lg form-SignIn" placeholder="Password" aria-label="Password" name="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                                                </div>

                                                <Alert variant="" className="mt-1">
                                                    <div
                                                        className="form-icon-wrapper"
                                                        style={{
                                                            color: "red",
                                                            height: "75",
                                                            fontSize: "14px",
                                                            marginTop: "-11px",
                                                            marginBottom: "-13px",
                                                            fontWeight: "bold"

                                                        }}
                                                    >
                                                        * Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).
                                                    </div>
                                                </Alert>

                                                {/* <div className="mb-3">
                                                    <input type="text" className="form-control form-control-lg form-SignIn" placeholder="Service" aria-label="Service" name="Service" value={Service} onChange={(e) => setService(e.target.value)} required />
                                                </div> */}




                                                {/* <select
                                                    className="form-control form-control-lg form-SignIn"
                                                    placeholder="Role"
                                                    aria-label="Role"
                                                    name="Role"
                                                    onChange={(e) => setRole(e.target.value)}
                                                    required
                                                    value={Role}
                                                >
                                                    <option value="">Role</option>
                                                    <option value="Admin">Admin</option>
                                                    <option value="User">User</option>
                                                </select>

                                                {errorMessage4 && (
                                                    <Alert variant="danger" className="mt-1">
                                                        <div
                                                            className="form-icon-wrapper"
                                                            style={{
                                                                height: "45px",
                                                                fontSize: "14px",
                                                                marginTop: "-11px",
                                                                marginBottom: "-13px",
                                                                fontWeight: "bold"

                                                            }}
                                                        >
                                                            {errorMessage4}
                                                        </div>
                                                    </Alert>
                                                )} */}

                                               {errorMessage3 && (
                                                    <Alert variant="danger" className="mt-1">
                                                        <div
                                                            className="form-icon-wrapper"
                                                            style={{
                                                                height: "20px",
                                                                fontSize: "14px",
                                                                marginTop: "-11px",
                                                                marginBottom: "-13px",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            {errorMessage3}
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
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            {errorMessage2}
                                                        </div>
                                                    </Alert>
                                                )}



                                                <input type="checkbox" className="custom-control-input mt-3" id="customCheck1" checked={enableTwoFactorAuth} onChange={(e) => setEnableTwoFactorAuth(e.target.checked)} />
                                                <label className="custom-control-label px-2" htmlFor="customCheck1">Enable Two Factor Authentication</label><br></br>
                                                <div className="px-3 d-flex mt-4">
                                                    <div className="px-3">
                                                    <Button variant="success" onClick={() => AddNewUser()} className="mt-3" >
                                                        Add new user
                                                    </Button>
                                                    </div>
                                                    

                                                    <Button variant="warning" onClick={() => { navigate("/ListUsers") }} className="mt-3" >
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

export default AddNewUser;
