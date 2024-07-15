import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

export default function Purchases() {
  const navigate = useNavigate()

  let initTotalItem = 0

  if (localStorage.getItem('cartTotalItem')) {
    initTotalItem = localStorage.getItem('cartTotalItem')
  }

  const [totalItem, setTotalItem] = useState(initTotalItem)
  const [purchases, setPurchases] = useState([])
  const [totalPurchases, setTotalPurchases] = useState([])
  const [isShowTotal, setIsShowTotal] = useState(false)

  const fetchDataPurchases = async () => {
    try {
      const response = await api.get('/api/purchases')
      setPurchases(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the pruchases!", error);
    }
  }

  const handleChange = async (e) => {
    setIsShowTotal(!isShowTotal)

    if (!isShowTotal) {
      try {
        const response = await api.get('/api/purchases/total')
        setTotalPurchases(response.data.data)
        setPurchases([])
      } catch (error) {
        console.error("There was an error fetching the purchases!", error);
      }
    } else {
      fetchDataPurchases()
      setTotalPurchases([])
    }
  }

  useEffect(() => {
    fetchDataPurchases()
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
              <Link to={"/purchases"}><i class="fa-solid fa-arrow-left"></i> Back</Link>
            </div>
            <div className="border rounded px-2">
              <input type="checkbox" value={isShowTotal} onChange={(e) => handleChange(e)} id="total" />
              <label htmlFor="total" className="ms-1 text-primary pointer">Total</label>
            </div>
          </div>
          <div className="col-md-12">
            {
              totalPurchases.length > 0
                ?
                <div className="row">
                  {totalPurchases.map((purchase, index) => (
                    <div className="card p-0 mb-1" key={index}>
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <h6 className="card-title" style={{ fontSize: '14px' }}>{formatDate(purchase.purchaseDate)}</h6>
                        </div>
                        <h5 className="mb-0">Rp{purchase.total}</h5>
                      </div>
                    </div>
                  ))}
                </div>
                : <div className="row">
                  {purchases.map((purchase, index) => (
                    <div className="card p-0 mb-1" key={index}>
                      <div className="card-body d-flex justify-content-between">
                        <div>
                          <h6 className="card-title" style={{ fontSize: '14px' }}>{purchase.description} - {formatDate(purchase.purchaseDate)}</h6>
                          <Link to={`/purchases/${purchase.id}/detail`} style={{ fontSize: '13px' }}><i className="fa-solid fa-file-lines"></i> Detail</Link>
                        </div>
                        <h5 className="mb-0">Rp{purchase.price}</h5>
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