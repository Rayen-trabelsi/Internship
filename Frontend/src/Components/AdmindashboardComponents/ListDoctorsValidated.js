import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import SideBarAdmin from "./sideBarComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faList, faPencil, faPlus, faTrash, faLock, faHistory, faTruckPickup, faCheck } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import "./Popup.css"

function ListUsers() {
    const navigate = useNavigate()
    const [Services, setServices] = useState([])
    const [Hospital, setHospital] = useState({})
    const [checkService, setcheckService] = useState("")
    const [Doctors, setDoctors] = useState([])
    const [idService, setidService] = useState("")

    const [showModelDelete, setshowModelDelete] = useState(false)
    const [showModelBlock, setshowModelBlock] = useState(false)
    const [showModelArchive, setshowModelArchive] = useState(false)
    const [showModelActive, setshowModelActive] = useState(false)

    const [idUserToDelete, setidUserToDelete] = useState("")
    const [idUserToblock, setidUserToblock] = useState("")
    const [idUserToArchive, setidUserToArchive] = useState("")
    const [idUserToActive, setidUserToActive] = useState("")


    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const decodedToken = jwt_decode(token);
            axios.get(`http://localhost:5000/service/gethospitalservices/${decodedToken.id}`)
                .then((response) => {
                    console.log(response.data)
                    setServices(response.data)
                })
                .catch((error) => {
                    if (error.response.data.message) {
                        console.log(error.response.data.message)
                    }
                })
            console.log(Services)

            axios.get(`http://localhost:5000/hospital/getHospitalById/${decodedToken.id}`)
                .then((response) => {
                    console.log(response.data)
                    setHospital(response.data)
                })
                .catch((error) => {
                    if (error.response.data.error) {
                        console.log(error.response.data.error)
                    }
                })

            axios.get(`http://localhost:5000/admin/getDoctorsConfirmedValidatedbyIdHspital/${decodedToken.id}`)
                .then((response) => {
                    console.log(response.data)
                    setDoctors(response.data)
                    console.log(Doctors)

                })
                .catch((error) => {
                    if (error.response.data.error) {
                        console.log(error.response.data.error)
                    }
                })
        }
    }, []);

    const getAllDoctors = async (event) => {
        setidService(event.target.value)


        if (event.target.value === "") {
            axios.get(`http://localhost:5000/admin/getDoctorsConfirmedValidatedbyIdHspital/${Hospital._id}`)
                .then((response) => {
                    console.log(response.data)
                    setDoctors(response.data)
                    console.log(Doctors)

                })
                .catch((error) => {
                    if (error.response.data.error) {
                        console.log(error.response.data.error)
                    }
                })
        }
        else {
            await axios.get(`http://localhost:5000/admin/getdoctorsconfirmedvalidated/${event.target.value}`)
                .then((response) => {
                    console.log(response.data)
                    setDoctors(response.data)
                    console.log(Doctors)

                })
                .catch((error) => {
                    if (error.response.data.error) {
                        console.log(error.response.data.error)
                    }
                })
        }
    }

    const logOut = () => {
        localStorage.clear();

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




    const blockUser = () => {
        const token = localStorage.getItem('jwtToken');
        const decodedToken = jwt_decode(token);

        axios.put(`http://localhost:5000/accountStatus/blockuser/${idUserToblock}`)
            .then((response) => {
                console.log(response.data)
                axios.get(`http://localhost:5000/admin/getDoctorsConfirmedValidatedbyIdHspital/${decodedToken._id}`)
                    .then((response) => {

                        setDoctors(response.data)

                    })

            })
            .catch((error) => {

                if (error.response.data.message) {
                    console.log(error.response.data.message)
                }
            })
    }

    const ArchiveUser = () => {
        const token = localStorage.getItem('jwtToken');
        const decodedToken = jwt_decode(token);

        axios.put(`http://localhost:5000/accountStatus/archiveuser/${idUserToArchive}`)
            .then((response) => {
                console.log(response.data)
                axios.get(`http://localhost:5000/admin/getDoctorsConfirmedValidatedbyIdHspital/${decodedToken._id}`)
                    .then((response) => {

                        setDoctors(response.data)

                    })

            })
            .catch((error) => {

                if (error.response.data.message) {
                    console.log(error.response.data.message)
                }
            })
    }

    const ActiveUser = () => {
        const token = localStorage.getItem('jwtToken');
        const decodedToken = jwt_decode(token);

        axios.put(`http://localhost:5000/accountStatus/activateuser/${idUserToActive}`)
            .then((response) => {
                console.log(response.data)
                axios.get(`http://localhost:5000/admin/getDoctorsConfirmedValidatedbyIdHspital/${decodedToken._id}`)
                    .then((response) => {

                        setDoctors(response.data)

                    })

            })
            .catch((error) => {

                if (error.response.data.message) {
                    console.log(error.response.data.message)
                }
            })
    }





    return (
        <>
  
            {/* /////////////////////////////////////////////////////////////////////// model block */}
            <Modal
                centered
                show={showModelBlock}
                onHide={() => setshowModelBlock(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Confirm if you want to Block this Doctor</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setshowModelBlock(false) }}>
                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon> Close
                    </Button>
                    <Button variant="primary" onClick={() => { blockUser(); setshowModelBlock(false) }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* /////////////////////////////////////////////////////////////////////// model archive */}
            <Modal
                centered
                show={showModelArchive}
                onHide={() => setshowModelArchive(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Confirm if you want to Archive this doctor</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setshowModelArchive(false) }}>
                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon> Close
                    </Button>
                    <Button variant="primary" onClick={() => { ArchiveUser(); setshowModelArchive(false) }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* /////////////////////////////////////////////////////////////////////// model activate */}
            <Modal
                centered
                show={showModelActive}
                onHide={() => setshowModelActive(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Confirmation
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Confirm if you want to Activate this Doctor account </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setshowModelActive(false) }}>
                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon> Close
                    </Button>
                    <Button variant="primary" onClick={() => { ActiveUser(); setshowModelActive(false) }}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>


            <div>
                <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin1.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.9 }}></div>

                {!showModelDelete && !showModelBlock && !showModelArchive && !showModelActive && <SideBarAdmin hospital={Hospital.HospitalName} ></SideBarAdmin>}
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
                            <div className="ms-md-auto pe-md-3 d-flex align-items-center col-4">
                                <div className="input-group">
                                    <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true" /></span>
                                    <input type="text" className="form-control" placeholder="Type here..." />
                                </div>
                            </div>
                            <div className="col-12 mt-2">
                                <div className="card mb-4">
                                    <div className="card-header pb-0 d-flex justify-content-between">
                                        <h6>List of users</h6>



                                    </div>
                                    <div className="card-body px-0 pt-0 pb-2">


                                        <label htmlFor="example-text-input" className="form-control-label mt-2">filter:</label>

                                        <div className="col-md-3 mx-2">

                                            <select className="form-control bg-light p-1 m-1" name='ServiceName' onChange={getAllDoctors} >
                                                <option value="" selected className="text-sm">All Services</option>
                                                {Services.map((serv) => (
                                                    <option value={serv._id}  >
                                                        {serv.ServiceName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>


                                    </div>
                                    <div className="table-responsive p-0 mt-5">
                                        <table className="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9"> First Name</th>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Last Name</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Email </th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">phone number</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">state</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9"></th>

                                                </tr>
                                            </thead>

                                            {
                                                Doctors.map((e) => {
                                                    return (

                                                        <>


                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <div className="d-flex px-2 py-1">
                                                                            <div className="d-flex flex-column justify-content-center">
                                                                                <p className="text-xs font-weight-bold mb-0 ps-2">{e.firstName}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-xs font-weight-bold mb-0">{e.lastName}</p>
                                                                    </td>
                                                                    <td className="align-middle text-center text-sm">
                                                                        <p className="text-xs font-weight-bold mb-0">{e.email}</p>
                                                                    </td>
                                                                    <td className="align-middle text-center text-sm">
                                                                        <p className="text-xs font-weight-bold mb-0">{e.phoneNumber}</p>
                                                                    </td>
                                                                    <td className="align-middle text-center text-sm">
                                                                        <p className="text-xs font-weight-bold mb-0" style={{ color: e.status === "active" ? "green" : e.status === "blocked" ? "red" : e.status === "archived" ? "black" : "inherit" }}>
                                                                            {e.status}
                                                                        </p>
                                                                    </td>
                                                                    <td className="  ">
                                                                   

                                                                        <Button variant="success" className="mx-2" onClick={() => { setidUserToActive(e._id); setshowModelActive(true) }} title="Activate doctor" >
                                                                            <FontAwesomeIcon icon={faCheck} />
                                                                        </Button>
                                                                        
                                                                        <Button variant="warning" onClick={() => { setidUserToblock(e._id); setshowModelBlock(true) }} title="Block doctor">
                                                                            <FontAwesomeIcon icon={faLock} />
                                                                        </Button>
                                                                        <Button variant="secondary" className="mx-2" onClick={() => { setidUserToArchive(e._id); setshowModelArchive(true) }} title="Archive doctor" >
                                                                            <FontAwesomeIcon icon={faHistory} />
                                                                        </Button>



                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </>
                                                    )
                                                })}
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

export default ListUsers;