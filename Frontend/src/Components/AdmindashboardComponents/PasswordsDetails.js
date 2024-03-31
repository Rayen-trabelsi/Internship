import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPencil, faPlus, faTrash, faLock,} from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate} from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import SideBarAdmin from "./sideBarComponent";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';

function PasswordsDetails() {
    var { userrId } = useParams();
    const navigate = useNavigate()
    const [Passwords, setPasswords] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [deletePasswordId, setDeletePasswordId] = useState(null);
    const [userId, setuserId] = useState("");
    const [userName, setuserName] = useState("");


    const deleteItem = (id) => {
        setDeletePasswordId(id);
        setShowModal(true);
      };
    
      const confirmDelete = async () => {
        if (deletePasswordId) {
          try {
            await axios.delete(`https://localhost:7010/api/User/DeletePassword/${deletePasswordId}`);
            setShowModal(false);
            
            // Fetch the updated user list after successful delete
            const token = Cookies.get('jwt');
            if (token) {
                const decodedToken = jwt_decode(token);
            setuserId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
              axios.get(`https://localhost:7010/api/User/GetPasswordsByUserId/${userId}`)
                .then((response) => {
                  console.log(response.data)
                  setPasswords(response.data);
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
        setDeletePasswordId(null);
        setShowModal(false);
      };




      useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('jwt');
            const test=await axios.get(`https://localhost:7010/api/User/${userrId}`)
            setuserName(test.data.userName);
            if (token) {
                const decodedToken = jwt_decode(token);
                const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

                try {
                    // Fetch the user data
                    const result1 = await axios.get(`https://localhost:7010/api/User/${userId}`);

                    // Fetch user passwords
                    const result3 = await axios.get(`https://localhost:7010/api/User/GetPasswordsByUserId/${userId}`);
                    const userPasswords = result3.data;
                    console.log(userPasswords);
                    console.log(userPasswords);

                    // Set the unique passwords in state
                    setPasswords(userPasswords);
                } catch (error) {
                    if (error.response && error.response.data) {
                        const { status, message } = error.response.data;
                        console.log(status, message);
                    }
                }
            }
        };

        fetchData();
    }, []); // Empty dependency array, so it runs once after initial render

    // Any side effects or code that depends on the updated state should go here
    useEffect(() => {
        // Place any side effects here
        console.log(userId);
    }, [userId]); // Dependency array includes userId

    
    

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
                                        <h6>{userName}'s passwords</h6>



                                    </div>


                                    <div className="card-body px-0 pt-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9"> Website</th>
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Password</th>
                                                         <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Username</th> 
                                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-9 ps-2">Action</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Passwords.map((e) => (
                                                        <tr key={e.userId}>
                                                            <td>
                                                                <div className="d-flex px-2 py-1">
                                                                    <div className="d-flex flex-column justify-content-center">
                                                                        <p className="text-xs font-weight-bold mb-0 ps-2">{e.website}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <p className="text-xs font-weight-bold mb-0">{e.password}</p>
                                                            </td>
                                                             <td>
                                                                <p className="text-xs font-weight-bold mb-0">{e.userName}</p>
                                                            </td> 


                                                            <td className="align-middle text-center text-sm">
                                                                <Button variant="danger" onClick={() => deleteItem(e.passwordId)}>
                                                                    <FontAwesomeIcon icon={faTrash}/> 
                                                                </Button>
                                                            </td>
                                                            <td className="align-middle text-center text-sm">
                                                                <Button variant="warning" onClick={() => navigate(`/UpdatePasss/${e.passwordId}`)}>
                                                                    <FontAwesomeIcon icon={faPencil}/> 
                                                                </Button>
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

export default PasswordsDetails;