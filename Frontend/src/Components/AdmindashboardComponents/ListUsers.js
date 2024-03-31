import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPencil, faPlus, faTrash, faLock, faEye,} from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import SideBarAdmin from "./sideBarComponent";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

function ListUsers() {
    const { idService } = useParams()
    const navigate = useNavigate()
    const [doctors, setdoctors] = useState([])
    const [Users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    const deleteItem = (id) => {
        setDeleteUserId(id);
        setShowModal(true);
      };
    
      const confirmDelete = async () => {
        if (deleteUserId) {
          try {
            await axios.delete(`https://localhost:7010/api/User/${deleteUserId}`);
            setShowModal(false);
            
            // Fetch the updated user list after successful delete
            const token = Cookies.get('jwt');
            if (token) {
              axios.get(`https://localhost:7010/api/User`)
                .then((response) => {
                  const tokenData = jwt_decode(token);
                  console.log(response.data)
                  // Filter out the user with the same email as the one in the token
                  const filteredUsers = response.data.filter(user => user.email !== tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
                  setUsers(filteredUsers);
                })
                .catch((error) => {
                  if (error.response && error.response.data) {
                    const { status, message } = error.response.data;
                    console.log(status, message);
                  }
                });
            }
          } catch (error) {
            if (error.response && error.response.data) {
              const { status, message } = error.response.data;
              console.log(status, message);
            }
            setShowModal(false);
          }
        }
      };
      
    
      const cancelDelete = () => {
        setDeleteUserId(null);
        setShowModal(false);
      };

    // const deleteItem = (id) => {
    //     axios.delete(`https://localhost:7010/api/${id}`)
    //             .then((response) => {
    //                 console.log(response.data)
    //             })
    //             .catch((error) => {
    //                 if (error.response && error.response.data) {
    //                     const { status, message } = error.response.data;
    //                     console.log(status, message);
    //                 }
    //             });
    // }



    useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('jwt');
            if (token) {
                const decodedToken = jwt_decode(token);
                try {
                    const result = await axios.get(`https://localhost:7010/api/User/${decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]}`);
        
                    const response = await axios.get(`https://localhost:7010/api/User`);
                    const tokenData = jwt_decode(token);
                    // Filter out the user with the same email as the one in the token
                    const filteredUsers = response.data.filter(user => user.email !== tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] && user.service === result.data.service);
                    setUsers(filteredUsers);
                } catch (error) {
                    if (error.response && error.response.data) {
                        const { status, message } = error.response.data;
                        console.log(status, message);
                    }
                }
            }
        };
    
        fetchData();
    }, []);
    
    

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
                <div className="position-absolute w-100 min-height-300 top-0 " style={{ backgroundImage: 'url("assets/images/admin1.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', opacity: 0.9 }}></div>

                <SideBarAdmin></SideBarAdmin>
                <main className="main-content position-relative border-radius-lg ">
                    {/* Navbar */}
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
                        <div className="container-fluid py-1 px-3">

                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 justify-content-end" id="navbar">
                                <ul className="navbar-nav  justify-content-end">
                                    <li className="nav-item d-flex align-items-center">
                                        <a href="#" className="nav-link text-white font-weight-bold px-0 pt-3 ">
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
                                        <Button variant="success" onClick={() => navigate("/AddnewUser")} >
                                            <FontAwesomeIcon icon={faPlus} /> Add new user
                                        </Button>



                                    </div>


                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9"> First Name</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Last Name</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Username</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Email </th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Role</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Service</th>
                                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-9">Action</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Users.map((e) => (
                                                        <tr key={e.userId}>
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
                                                            <td>
                                                                <p className="text-xs font-weight-bold mb-0">{e.userName}</p>
                                                            </td>
                                                            <td className="align-middle text-center text-sm">
                                                                <p className="text-xs font-weight-bold mb-0">{e.email}</p>
                                                            </td>
                                                            <td className="align-middle text-center text-sm">
                                                                <p className="text-xs font-weight-bold mb-0"><b>{e.roles}</b></p>
                                                            </td>
                                                            <td className="align-middle text-center text-sm">
                                                                <p className="text-xs font-weight-bold mb-0"><b>{e.service}</b></p>
                                                            </td>

                                                            <td className="align-middle text-center text-sm">
                                                                <div className="" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                    <div >
                                                                <Button variant="danger" onClick={() => deleteItem(e.userId)}>
                                                                    <FontAwesomeIcon icon={faTrash}/> 
                                                                </Button>
                                                                </div>
                                                                <div className="mx-3">
                                                                <Button variant="primary" onClick={() => navigate(`/PasswordsDetails/${e.userId}`)}>
                                                                    <FontAwesomeIcon icon={faEye}/> 
                                                                </Button>
                                                                </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>


                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {/* Modal */}
      {showModal && (
        <div className="custom-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Confirm Delete</h5>
              <Button variant="secondary" onClick={cancelDelete}>
                <FontAwesomeIcon icon={faClose} />
              </Button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this user?</p>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={cancelDelete} >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
        </>
    );
}

export default ListUsers;