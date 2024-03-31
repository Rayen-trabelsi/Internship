import { NavLink, Navigate, useNavigate } from "react-router-dom";
import SideBarAdmin from "./sideBarComponent";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSign } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
function DashboardAdmin() {
  const [Hospital, setHospital] = useState({})
  const navigate = useNavigate()

  // useEffect(() => {
  //   const token = localStorage.getItem('jwtToken');
  //   if (token) {
  //     const decodedToken = jwt_decode(token);
  //     axios.get(`http://localhost:5000/hospital/getHospitalById/${decodedToken.id}`)
  //       .then((response) => {
  //         console.log(response.data)
  //         setHospital(response.data)
  //       })
  //       .catch((error) => {
  //         if (error.response.data.error) {
  //           console.log(error.response.data.error)
  //         }
  //       })

  //   }
  // }, []);

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


  return (
    <>
      <div>
        <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin1.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.7 }}></div>
        <SideBarAdmin></SideBarAdmin>
        <main className="main-content position-relative border-radius-lg ">
          {/* Navbar */}
          <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
            <div className="container-fluid py-1 px-3">

              <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">

                <ul className="navbar-nav  ">
                <li className="nav-item d-flex align-items-center">
                                        <a href="javascript:;" className="nav-link text-white font-weight-bold px-0 pt-3 ">
                                            <Button variant="warning"  onClick={()=>{logOut()}}>
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
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Number of hospitals</p>
                          <h5 className="font-weight-bolder">
                            $53,000
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                          <i className="fa-solid fa-wave-pulse text-lg opacity-10" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Today's Users</p>
                          <h5 className="font-weight-bolder">
                            2,300
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                          <i className="ni ni-world text-lg opacity-10" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">New Clients</p>
                          <h5 className="font-weight-bolder">
                            +3,462
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                          <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-uppercase font-weight-bold">Sales</p>
                          <h5 className="font-weight-bolder">
                            $103,430
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                          <i className="ni ni-cart text-lg opacity-10" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            {/* tableaux */}
            <div className="row mt-4">
              <div className="col-lg-7 mb-lg-0 mb-4">
                <div className="card ">
                  <div className="card-header pb-0 p-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-2">List of hospitals with more appointments</h6>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center ">
                      <tbody>
                        <tr>
                          <td className="w-30">
                            <div className="d-flex px-2 py-1 align-items-center">

                              <div className="ms-4">
                                <p className="text-xs font-weight-bold mb-0">Hospital Name:</p>
                                <h6 className="text-sm mb-0">United States</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <p className="text-xs font-weight-bold mb-0">Address:</p>
                              <h6 className="text-sm mb-0">2500</h6>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <p className="text-xs font-weight-bold mb-0">Admin Email:</p>
                              <h6 className="text-sm mb-0">$230,900</h6>
                            </div>
                          </td>
                          <td className="align-middle text-sm">
                            <div className="col text-center">
                              <p className="text-xs font-weight-bold mb-0">Number of Appointments:</p>
                              <h6 className="text-sm mb-0">29.9%</h6>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="card ">
                  <div className="card-header pb-0 p-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-2">List of hospitals With the number of complaints</h6>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-items-center ">
                      <tbody>
                        <tr>
                          <td className="w-30">
                            <div className="d-flex px-2 py-1 align-items-center">

                              <div className="ms-4">
                                <p className="text-xs font-weight-bold mb-0">Hospital Name:</p>
                                <h6 className="text-sm mb-0">United States</h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-center">
                              <p className="text-xs font-weight-bold mb-0">Number of Complaints:</p>
                              <h6 className="text-sm mb-0">2500</h6>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>



      </div>
    </>
  );
}

export default DashboardAdmin;