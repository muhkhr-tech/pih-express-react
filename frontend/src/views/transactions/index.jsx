import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Purchase from "../../components/transaction/Purchase"
import Sale from "../../components/transaction/Sale"

export default function TransactionIndex() {
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
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6"><Purchase /></div>
              <div className="col-md-6"><Sale /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}