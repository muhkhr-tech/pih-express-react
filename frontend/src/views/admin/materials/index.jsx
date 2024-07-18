import { useEffect, useState } from "react"
import api from "../../../services/api"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../../components/Navbar"
import Sidebar from "../../../components/admin/Sidebar"

export default function AdminMaterialIndex() {
  const navigate = useNavigate()

  const [materials, setMaterials] = useState([])

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const fetchDataMaterials = async () => {
    try {
      const response = await api.get('/api/admin/materials')
      setMaterials(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the materials!", error);
    }
  }

  const createMaterial = async (e) => {
    e.preventDefault()

    try {
      await api.post('/api/admin/materials', {
        name: name,
        price: price,
        unit: unit
      })

      setFormSuccess(!formSuccess)

      setName('')
      setPrice('')
      setUnit('')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  useEffect(() => {
    fetchDataMaterials()
  }, [formSuccess])

  const getMaterial = (material) => {
    setId(material.id)
    setName(material.name)
    setPrice(material.price)
    setUnit(material.unit)
    setIsEdit(true)
  }

  const editMaterial = async (e) => {
    e.preventDefault()

    try {
      await api.put(`/api/admin/materials/${id}`, {
        name: name,
        price: price,
        unit: unit
      })

      setFormSuccess(!formSuccess)
      setIsEdit(false)

      setName('')
      setPrice('')
      setUnit('')
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          
          {
            materials.length > 0
              ? <div className="col-md-6">
                <div className="card border-0">
                  <div className="card-body">
                    <h5 className="card-title mb-5">Data Bahan</h5>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Harga</th>
                          <th scope="col">Satuan<br></br>Jumlah</th>
                          <th scope="col">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>

                        {materials.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.unit}</td>
                            <td>
                              <button onClick={() => getMaterial(item)} className="btn btn-sm btn-primary">Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              : <div className="col-md-6">
                <p>Data belum tersedia!</p>
              </div>
          }

          <div className="col-md-4">
            <div className="card border-0">
              <div className="card-body">
                <h5 className="card-title mb-5">Form Data Bahan</h5>
                <form onSubmit={isEdit? editMaterial : createMaterial}>
                <div className="form-group mb-3">
                    <input type="text" value={id} onChange={setId} className="form-control"
                      placeholder="" hidden/>
                  </div>
                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Nama</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control"
                      placeholder="" />
                  </div>

                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Harga</label>
                    <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className="form-control"
                      placeholder="" />
                  </div>

                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Satuan</label>
                    <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} className="form-control"
                      placeholder="" />
                  </div>

                  <button className="btn btn-success w-100" type="submit">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}