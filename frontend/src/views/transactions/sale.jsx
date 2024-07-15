import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

export default function Sales() {
  const navigate = useNavigate()

  let initTotalItem = 0

  if (localStorage.getItem('cartTotalItem')) {
    initTotalItem = localStorage.getItem('cartTotalItem')
  }

  const [totalItem, setTotalItem] = useState(initTotalItem)
  const [sales, setSales] = useState([])
  const [totalSales, setTotalSales] = useState([])
  const [isShowTotal, setIsShowTotal] = useState(false)

  const fetchDataSales = async () => {
    try {
      const response = await api.get('/api/sales')
      setSales(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the sales!", error);
    }
  }

  const handleChange = async (e) => {
    setIsShowTotal(!isShowTotal)

    if (!isShowTotal) {
      try {
        const response = await api.get('/api/sales/total')
        setTotalSales(response.data.data)
        setSales([])
      } catch (error) {
        console.error("There was an error fetching the sales!", error);
      }
    } else {
      fetchDataSales()
      setTotalSales([])
    }
  }

  useEffect(() => {
    fetchDataSales()
  }, [])

  const formatDate = (date) => {
    return `${new Date(date).getDate()} ${new Date(date).toLocaleDateString('default', { month: 'long' })} ${new Date(date).getFullYear()}`
  }

  return (
    <div>
      <Header/>
      <Navbar totalItem={totalItem} />
      <div className="container">
        <div className="row">
          <div className="col-md-12 px-0 mb-4 d-flex justify-content-between">
            <div>
              <Link to={"/sales"}><i class="fa-solid fa-arrow-left"></i> Back</Link>
            </div>
            <div className="border rounded px-2">
              <input type="checkbox" value={isShowTotal} onChange={(e) => handleChange(e)} id="total" />
              <label htmlFor="total" className="ms-1 text-primary pointer">Total</label>
            </div>
          </div>
          <div className="col-md-12">
            {
              totalSales.length > 0
                ? <div className="row">
                  {totalSales.map((sale, index) => (
                    <div className="card p-0 mb-1" key={index}>
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <h6 className="card-title" style={{ fontSize: '14px' }}>{formatDate(sale.saleDate)}</h6>
                        </div>
                        <h5 className="mb-0">Rp{sale.total}</h5>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <div className="row">
                  {sales.map((sale, index) => (
                    <div className="card p-0 mb-1" key={index}>
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <h6 className="card-title" style={{ fontSize: '14px' }}>{sale.description} - {formatDate(sale.saleDate)}</h6>
                          <Link to={`/sales/${sale.id}/detail`} style={{ fontSize: '13px' }}><i className="fa-solid fa-file-lines"></i> Detail</Link>
                        </div>
                        <h5 className="mb-0">Rp{sale.price}</h5>
                      </div>
                    </div>
                  ))}
                </div>
            }
          </div>

        </div>
      </div>
    </div>
  )
}