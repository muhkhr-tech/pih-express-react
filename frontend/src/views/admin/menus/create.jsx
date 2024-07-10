import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar";

export default function AdminMenuCreate() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  const [validation, setValidation] = useState([])

  const storeMenu = async (e) => {
    e.preventDefault()

    await api.post('/api/admin/menus', {
      name: name,
      description: description,
      price: price
    })
      .then(() => {
        navigate('/admin/menus')
      })
      .catch(error => {
        setValidation(error.response.data)
      })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body">
              {
                validation.errors && (
                  <div className="alert alert-danger mt-2 pb-0">
                    {
                      validation.errors.map((error, index) => (
                        <p key={index}>{error.msg}</p>
                      ))
                    }
                  </div>
                )
              }
              <h5 className="card-title mb-5">Form Data Menu</h5>
              <form onSubmit={storeMenu}>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"
                    placeholder="" />
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Description</label>
                  <textarea name="" id="" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"></textarea>
                </div>
                <div className="form-group mb-3">
                  <label className="mb-1 fw-bold">Price</label>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control"
                    placeholder="" />
                </div>
                <button type="submit" className="btn btn-success w-100">Simpan</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}