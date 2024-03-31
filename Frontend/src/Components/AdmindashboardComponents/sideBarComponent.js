import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { Button } from "react-bootstrap";



function SidebarAdmin(props) {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const token = Cookies.get('jwt');
    if (token) {
      const decodedToken = jwt_decode(token);
      console.log(decodedToken)
      const userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      setUserName(userName);
    }

  }, []);
  return (
    <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
        <a className="navbar-brand m-0 " target="_blank">
          <img src="./assets/images/userlogo.png " className="navbar-brand-img h-100 mb-1" alt="main_logo" />
          <span className="ms-1 font-weight-bold " style={{ fontSize: "18px" }}>{`${userName}`}</span>
        </a>
      </div>
      <hr className="horizontal dark mt-0" />
      <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/DashboardAdmin" className="nav-link">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Dashboard</span>
            </NavLink>
          </li>
          {/* <li className="nav-item">
          <NavLink to="/ListServices"  className="nav-link">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-calendar-grid-58 text-warning text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1"> Services </span>
          </NavLink>
        </li> */}
          <li className="/nav-item">
            <NavLink to="/ListUsers" className="nav-link">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-02 text-dark text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Users</span>
            </NavLink>
          </li>
          <li className="/nav-item">
            <NavLink to="/ListPass" className="nav-link">
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-02 text-dark text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">My passwords</span>
            </NavLink>
          </li>

          <li className="nav-item" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button className="mt-3" onClick={()=>{navigate("/AddNewPasswordAdmin")}}>Add new password</Button>
          </li>

        </ul>
      </div>
    </aside>
  );
}

export default SidebarAdmin;