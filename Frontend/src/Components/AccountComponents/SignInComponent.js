import "./styleAccount.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

function SignInComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");

  const login = async () => {
    setErrorMessage1("");
    setErrorMessage2("");
    setErrorMessage3("");

    try {
      const response = await axios.post(
        "https://localhost:7010/api/Authentication/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (!response.data.token) {
        navigate("/TwoFactor");
      } else {
        Cookies.set("jwt", response.data.token);
        //test if the user is admin or not
        const decodedToken = jwt_decode(response.data.token);
        if(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]==="User"){
          navigate("/ListPasswords")
        }
        else{
          navigate("/DashboardAdmin");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { status, message } = error.response.data;
        console.log(status, message); // Logging the status and message for debugging
  
        if (status === "Error" && message === "User not found. Please check the email and try again.") {
          setErrorMessage1("Email is not registered! Check your email.");
        } else if (status === "Error" && message === "Invalid username or password.") {
          setErrorMessage2("Password is incorrect! Check your password.");
        }else if (status === "Error" && message === "Email not confirmed. Please check your email for the confirmation link.") {
          setErrorMessage3("Your Email is not confirmed. Please check your inbox for the confirmation link.");
        } else {
          setErrorMessage3("An unexpected error occurred.");
        }
      } else {
        setErrorMessage3("An unexpected error occurred.");
      }
      if (!email||!password){
        setErrorMessage3("email and password are required!")
    }
    }
  };
  

  return (
    <>
      <main className="main-content mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                  <div className="card card-plain card-signIn">
                    <div className="card-header pb-0 text-start  card-signIn">
                      <h4 className="font-weight-bolder">Sign In</h4>
                      <p className="mb-0 text-muted">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div className="card-body">
                      <form role="form">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control form-control-lg form-SignIn"
                            placeholder="email"
                            aria-label="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
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
                                fontWeight: "bold",
                              }}
                            >
                              {errorMessage1}
                            </div>
                          </Alert>
                        )}

                        <div className="mb-3">
                          <input
                            type="password"
                            className="form-control form-control-lg form-SignIn"
                            placeholder="Password"
                            aria-label="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>

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

                        <Button variant="primary" onClick={() => login()}>
                          Sign In
                        </Button>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1 card-signIn">
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account?
                        <a
                          href="/signUp"
                          className="text-primary text-gradient font-weight-bold"
                        >
                          {" "}
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                    style={{
                      backgroundImage:
                        'url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg")',
                      backgroundSize: "cover",
                    }}
                  >
                    <span className="mask bg-gradient-primary opacity-6" />
                    <h4 className="mt-5 text-white font-weight-bolder position-relative">
                      "Welcome to our Azure KeyVault App"
                    </h4>
                    <p className="text-white position-relative">
                      Where you can store your passwords in one click.
                    </p>
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

export default SignInComponent;
