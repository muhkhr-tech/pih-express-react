import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link, useNavigate, useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

export default function SaleDetail({props}) {
  const navigate = useNavigate()

  const { id } = useParams()

  let initCart = []
  let initTotalItem = 0

  if (localStorage.getItem('sale_cart')) {
    if (JSON.parse(localStorage.getItem('sale_cart')).length >= 0) {
      initCart = JSON.parse(localStorage.getItem('sale_cart'))
    }
  }

  if (localStorage.getItem('cartTotalItem')) {
    initTotalItem = localStorage.getItem('cartTotalItem')
  }

  const [sale, setSale] = useState({})
  const [menus, setMenus] = useState([])
  const [totalItem, setTotalItem] = useState(initTotalItem)

  const fetchDataSale = async () => {
    try {
      const response = await api.get(`/api/sales/${id}`)
      setSale(response.data.data)
      setMenus(response.data.data.menus)
    } catch (error) {
      console.error("There was an error fetching the sales!", error);
    }
  }


  useEffect(() => {
    fetchDataSale()

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
          <Link to={"/sales/history"}><i class="fa-solid fa-arrow-left"></i> Back</Link>
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
                        <h6 className="card-title">{formatDate(sale.createdAt)}</h6>
                        <label htmlFor="">Tanggal Pembelian</label>
                        <h6 className="card-text">{formatDate(sale.saleDate)}</h6>
                      </div>
                      <div className="col-md-4 border p-3">
                        <label>Nama pelanggan</label>
                        <h6>{sale.customerName}</h6>
                        <label>Nomor HP pelanggan</label>
                        <h6>{sale.customerPhone}</h6>
                        <label>Alamat pelanggan</label>
                        <h6>{sale.customerAddress}</h6>
                      </div>
                      <div className="col-md-4 border-top border-bottom p-3">
                        <label htmlFor="">Keterangan</label>
                        <h6>{sale.description}</h6>
                      </div>
                    </div>
                    <div className="mt-5">
                      <table className="table table-sm">
                        <thead>
                          <tr>
                            <th>Barang</th>
                            <th style={{ width: '50px' }}>Jumlah</th>
                            <th style={{ width: '80px' }}>Total</th>
                            <th style={{ width: '80px' }}>Harga</th>
                          </tr>
                        </thead>
                        <tbody>
                          {menus.map((item, index) => (
                            <tr key={index} className="border-0">
                              <td>{item.menu.name}</td>
                              <td>{item.price}</td>
                              <td>{item.amount}</td>
                              <td>{item.amount * item.price}</td>
                            </tr>
                          ))}
                          <tr className="border-0">
                            <td></td>
                            <td colSpan={2}>Ongkir</td>
                            <td>{sale.ongkir}</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={3}></td>
                            <td>{menus.reduce((total, item) => total + (item.price * item.amount), 0) + sale.ongkir}</td>
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