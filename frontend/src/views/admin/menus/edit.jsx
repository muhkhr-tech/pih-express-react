import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AdminMenuEdit() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)

  const [validation, setValidation] = useState([])

  const { id } = useParams()

  const fetchDetailMenu = async () => {
    await api.get(`/api/menus/${id}`)
      .then(response => {
        setName(response.data.data.name)
        setDescription(response.data.data.description)
        setPrice(response.data.data.price)
      })
  }

  useEffect(() => {
    fetchDetailMenu()
  }, [])

  const updateMenu = async (e) => {
    e.preventDefault()

    await api.put(`/api/admin/menus/${id}`, {
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
    <div>
      <Link to="/admin/menus">Back</Link>
      {
        validation.errors && (
          <div>
            {
              validation.map((error, index) => (
                <p key={index}>{error.path}: {error.msg}</p>
              ))
            }
          </div>
        )
      }

      <form onSubmit={updateMenu}>
        <label htmlFor="">Nama Menu</label>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
        <label htmlFor="">Deskripsi</label>
        <input type="text" onChange={(e) => setDescription(e.target.value)} value={description}/>
        <label htmlFor="">Harga</label>
        <input type="text" onChange={(e) => setPrice(e.target.value)} value={price}/>
        <button type="submit">Simpan</button>
      </form>
    </div>
  )
}