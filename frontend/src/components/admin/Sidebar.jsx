import { Link, Navigate, useNavigate } from 'react-router-dom'
import React, { useContext } from 'react'
import Cookies from 'js-cookie'

export default function Sidebar() {
  const navigate = useNavigate()
  const path = location.pathname

  const handleLogout = () => {
    try {
      Cookies.remove('token')
      Cookies.remove('user')
      navigate('/')
    } catch (error) {
      console.log('Cannot logout!');
    }
  }

  return (
    // <div className="">
    //     <div className="">
    //         MAIN MENU
    //     </div>
    //     <div className="">
    //         <div className="list-group">
    //             <Link to="/admin/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>

    //             <Link to="/admin/users" className="list-group-item list-group-item-action">Users</Link>
    //             <a className="list-group-item list-group-item-action" style={{ cursor: 'pointer' }}>Logout</a>
    //         </div>
    //     </div>
    // </div>
    <div className="bg-white">
      <div className="row mx-0 flex-nowrap h-100">
        <div className="px-sm-2 px-0 h-100">
          <div className="pt-2 text-white min-vh-100 h-100">
            <a
              href="/"
              className="d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 d-none d-sm-inline">Menu</span>
            </a>
            <ul
              className="d-flex flex-column nav nav-pills py-0 flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              {/* <li>
                <a
                  href="#submenu1"
                  data-bs-toggle="collapse"
                  className="nav-link text-primary px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                </a>
                <ul
                  className="collapse show nav flex-column ms-1"
                  id="submenu1"
                  data-bs-parent="#menu"
                >
                  <li className="w-100">
                    <Link to="/admin/menus" className='nav-link text-primary px-0'>Menu</Link>
                  </li>
                  <li>
                  <Link to="/admin/materials" className='nav-link text-primary px-0'>Material</Link>
                  </li>
                </ul>
              </li> */}
              <li className={path=='/admin/dashboard' ? 'w-100 bg-primary rounded px-2':''}>
                <Link to="/admin/dashboard" className={`nav-link text-primary p-0 align-middle ${path=='/admin/dashboard' ? "text-white": ''}`}>
                
                  <i className="fs-4 bi-people" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                  </Link>
              </li>
              <li className={path=='/admin/menus' ? 'w-100 bg-primary rounded px-2':''}>
                <Link to="/admin/menus" className={`nav-link text-primary p-0 align-middle ${path=='/admin/menus' ? "text-white": ''}`}>
                
                  <i className="fs-4 bi-people" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Menu</span>{" "}
                  </Link>
              </li>
              <li className={path=='/admin/materials' ? 'w-100 bg-primary rounded px-2':''}>
                <Link to="/admin/materials" className={`nav-link text-primary p-0 align-middle ${path=='/admin/materials' ? "text-white": ''}`}>
                
                  <i className="fs-4 bi-people" />{" "}
                  <span className="ms-1 d-none d-sm-inline">Material</span>{" "}
                  </Link>
              </li>
            </ul>
            <hr />
            <ul
              className="d-flex flex-column nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
            <li>
                <button onClick={handleLogout} className='btn bg-0 ps-0'>
                
                  <i className="fs-4 bi-people" />{" "}
                  <span className="ms-1 d-none d-sm-inline text-danger">Logout</span>{" "}
                  </button>
              </li>
            </ul>
            {/* <div className="dropdown pb-4">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="hugenerd"
                  width={30}
                  height={30}
                  className="rounded-circle"
                />
                <span className="d-none d-sm-inline mx-1">loser</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        {/* <div className="col py-3">Content area...</div> */}
      </div>
    </div>

  )
}