import "./styleAccount.css"
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
function SignUpComponent() {
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




    const login = async () => {
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
        await axios.post('https://localhost:7010/api/Authentication', {
            firstName: FirstName,
            lastName: LastName,
            username: UserName,
            email: email,
            password: password,
            twoFactorEnabled: enableTwoFactorAuth,
            service:Service
        }, {
            params: {
                role: "Admin"
            }
        })

            .then((response) => {
                console.log(response.data)
                navigate("/EmailConfirmation")
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    const { status, message } = error.response.data;
                    console.log(status, message); // Logging the status and message for debugging

                    if (status === "Error" && message === "User already exists!") {
                        setErrorMessage1("User already exists. Please use a different email.");
                    }
                    else if (status === "Error" && message === "User failed to create.") {
                        setErrorMessage2("User registration failed. Please try again later.");
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
                if (!UserName || !email || !password || !LastName || !FirstName || !Service) {
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

    return (
        <>




            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-100">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                                    <div className="card card-plain card-signIn">
                                        <div className="card-header pb-0 text-start  card-signIn">
                                            <h4 className="font-weight-bolder">Sign Up</h4>
                                            <p className="mb-0 text-muted">Enter your Information to sign up</p>
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
                                                                height: "45px",
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

                                                <div className="mb-3">
                                                    <input type="text" className="form-control form-control-lg form-SignIn" placeholder="Service" aria-label="Service" name="Service" value={Service} onChange={(e) => setService(e.target.value)} required />
                                                </div>




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
                                                                fontWeight: "bold"

                                                            }}
                                                        >
                                                            {errorMessage3}
                                                        </div>
                                                    </Alert>
                                                )}



                                                <input type="checkbox" className="custom-control-input mt-3" id="customCheck1" checked={enableTwoFactorAuth} onChange={(e) => setEnableTwoFactorAuth(e.target.checked)} />
                                                <label className="custom-control-label px-2" htmlFor="customCheck1">Enable Two Factor Authentication</label><br></br>

                                                <Button variant="primary" onClick={() => login()} className="mt-3" >
                                                    Sign Up
                                                </Button>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center pt-0 px-lg-2 px-1 card-signIn">
                                            <p className="mb-4 text-sm mx-auto">
                                                Already have an account?
                                                <a href="/signIn" className="text-primary text-gradient font-weight-bold"> Sign in</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                    <div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style={{ backgroundImage: 'url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg")', backgroundSize: 'cover' }}>
                                        <span className="mask bg-gradient-primary opacity-6" />
                                        <h4 className="mt-5 text-white font-weight-bolder position-relative">"Welcome to our Azure KeyVault App"</h4>
                                        <p className="text-white position-relative">Where you can store your passwords in one click.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default SignUpComponent;