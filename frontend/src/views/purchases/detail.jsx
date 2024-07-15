import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

export default function PurchaseDetail() {
  const navigate = useNavigate()

  const { id } = useParams()

  let initCart = []
  let initTotalItem = 0

  if (localStorage.getItem('purchase_cart')) {
    if (JSON.parse(localStorage.getItem('purchase_cart')).length >= 0) {
      initCart = JSON.parse(localStorage.getItem('purchase_cart'))
    }
  }

  if (localStorage.getItem('cartTotalItem')) {
    initTotalItem = localStorage.getItem('cartTotalItem')
  }

  const [purchase, setPurchase] = useState({})
  const [materials, setMaterials] = useState([])
  const [totalItem, setTotalItem] = useState(initTotalItem)
  const [totalPrice, setTotalPrice] = useState(0)

  const fetchDataPurchase = async () => {
    try {
      const response = await api.get(`/api/purchases/${id}`)
      setPurchase(response.data.data)
      setMaterials(response.data.data.materials)
    } catch (error) {
      console.error("There was an error fetching the purchases!", error);
    }
  }


  useEffect(() => {
    fetchDataPurchase()

  }, [])

  const formatDate = (date) => {
    return `${new Date(date).getDate()} ${new Date(date).toLocaleDateString('default', { month: 'long' })} ${new Date(date).getFullYear()}`
  }

  return (
    <div>
      <Header/>
      <Navbar totalItem={totalItem} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 mb-4">
          <Link to={"/purchases/history"}><i class="fa-solid fa-arrow-left"></i> Back</Link>
          </div>
          <div className="col-md-12">
            <div className="card shadow border-0">
              <div className="card-body">
                <h4 className="card-title">Invoice</h4>
                <div className="card p-0 mb-1 border-0">
                  <div className="card-body p-2">
                    <div className="row">
                      <div className="col-md-4 border-top border-bottom p-3">
                        <label htmlFor="">Tanggal Dibuat</label>
                        <h6 className="card-title">{formatDate(purchase.createdAt)}</h6>
                        <label htmlFor="">Tanggal Pembelian</label>
                        <h6 className="card-text">{formatDate(purchase.purchaseDate)}</h6>
                      </div>
                      <div className="col-md-4 border p-3">
                        <label>Nama toko</label>
                        <h6>{purchase.storeName}</h6>
                        <label>Nomor HP toko</label>
                        <h6>{purchase.storePhone}</h6>
                        <label>Alamat toko</label>
                        <h6>{purchase.storeAddress}</h6>
                      </div>
                      <div className="col-md-4 border-top border-bottom p-3">
                        <label htmlFor="">Keterangan</label>
                        <h6>{purchase.description}</h6>
                      </div>
                    </div>
                    <div className="mt-5">
                      <table className="table table-sm">
                        <thead>
                        <tr>
                          <th>Barang</th>
                          <th style={{width: '50px'}}>Jumlah</th>
                          <th style={{width: '80px'}}>Total</th>
                          <th style={{width: '80px'}}>Harga</th>
                        </tr>
                        </thead>
                        <tbody>
                          {materials.map((item, index) => (
                            <tr key={index} className="border-0">
                              <td>{item.material.name}</td>
                              <td>{item.price}</td>
                              <td>{item.amount}</td>
                              <td>{item.amount * item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3}></td>
                            <td>{materials.reduce((total, item) => total + (item.price * item.amount), 0)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}