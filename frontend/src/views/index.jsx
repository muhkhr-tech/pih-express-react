import { useEffect, useState } from "react"
import api from "../services/api"

export default function Index() {
  const [menus, setMenus] = useState([])

  const fetchDataMenu = async () => {
    try {
      const response = await api.get('/api/menus?active=true')

      setMenus(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the menus!", error);
    }
  }

  useEffect(() => {
    fetchDataMenu()
  }, [])

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light mb-5">
        <div class="container-fluid">
          <img src={'./logo.png'} style={{width: '80px'}}/>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row">
        {
          menus.length > 0
            ? menus.map((menu, index) => (
              <div className="col-3 mb-3" key={index}>
                <div className="card" style={{ width: "18rem;", minHeight: "300px" }}>
                  <div className="card-body">
                    <h5 className="card-title">{menu.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Rp{menu.price}</h6>
                    <p className="card-text">{menu.description}</p>
                    <a href="#" className="card-link">Order</a>
                    {/* <a href="#" className="card-link">Another link</a> */}
                  </div>
                </div>
              </div>
            ))
            : <p>Data belum tersedia!</p>
        }
      </div>
    </div>
  )
}