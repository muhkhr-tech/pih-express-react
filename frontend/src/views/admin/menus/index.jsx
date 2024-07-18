import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import api from "../../../services/api";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar";

export default function AdminMenuIndex() {
  const [menus, setMenus] = useState([])
  const [changeStatus, setChangeStatus] = useState(false)

  const fetchDataMenu = async () => {
    const token = Cookies.get('token')

    if (token) {
      api.defaults.headers.common['Authorization'] = token
      
      try {
        const response = await api.get('/api/admin/menus')

        setMenus(response.data.data)
      } catch (error) {
        console.error("There was an error fetching the menus!", error);
      }
    } else {
      console.log('Token is not available')
    }
  }

  useEffect(() => {
    fetchDataMenu()
  }, [changeStatus])

  const updateStatusMenu = async (id) => {

    try {
      await api.put(`/api/admin/menus/${id}/change-status`)
      setChangeStatus(!changeStatus)
    } catch (error) {
      console.error("There was an error change staus of the menu!", error);
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="card border-0 rounded">
            <div className="d-flex justify-content-between align-items-center">
              <span>Menu</span>
              <Link to="/admin/menus/create" className="btn btn-sm btn-success rounded shadow-sm border-0">Add new</Link>
            </div>
            <div className="card-body">
              <table className="table">
                <thead className="">
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Food/Beverage</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                    <th scope="col">Status</th>
                    <th scope="col" style={{ width: "30%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    menus.length > 0
                      ? menus.map((menu, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{menu.name}</td>
                          <td>{menu.price}</td>
                          <td>{menu.image ? <i className="fa fa-check text-success"></i> : <i className="fa fa-times text-danger"></i>}</td>
                          <td style={{ minWidth: "20px", maxWidth: "20px" }}>{menu.active ? <span className="bg-success badge">Active</span> : <span className="bg-secondary badge">Inactive</span>}</td>
                          <td className="text-center">
                            <Link to={`/admin/menus/edit/${menu.id}`} className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2">Edit</Link>
                            <Link to={`/admin/menus/image/${menu.id}`} className="btn btn-sm btn-warning rounded-sm shadow border-0 me-2">Upload Image</Link>
                            <button onClick={() => updateStatusMenu(menu.id)} className="btn btn-sm btn-secondary rounded-sm shadow border-0">Status</button>
                          </td>
                        </tr>
                      ))

                      : <tr>
                        <td colSpan="4" className="text-center">
                          <div className="alert alert-danger mb-0">
                            Data Belum Tersedia!
                          </div>
                        </td>
                      </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}