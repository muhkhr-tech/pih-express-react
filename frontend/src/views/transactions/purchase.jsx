import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"

export default function Purchases() {
  const navigate = useNavigate()

  let initTotalItem = 0

  if (localStorage.getItem('cartTotalItem')) {
    initTotalItem = localStorage.getItem('cartTotalItem')
  }

  const [totalItem, setTotalItem] = useState(initTotalItem)
  const [purchases, setPurchases] = useState([])

  const fetchDataPruchases = async () => {
    try {
      const response = await api.get('/api/purchases')
      setPurchases(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the pruchases!", error);
    }
  }

  useEffect(() => {
    fetchDataPruchases()
  }, [])

  const formatDate = (date) => {
    return `${new Date(date).getDate()} ${new Date(date).toLocaleDateString('default', { month: 'long' })} ${new Date(date).getFullYear()}`
  }

  return (
    <div>
      <Navbar totalItem={totalItem} />
      <div className="container">
        <div className="row">
          {
            purchases.length > 0
              ? <div className="col-md-12">
                <div className="row">
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
              </div>
              : <div className="col-md-12"><p>Data belum tersedia!</p></div>
          }
        </div>
      </div>
    </div>
  )
}