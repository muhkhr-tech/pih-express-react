import { useEffect, useState } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"

export default function Index() {
  let initChart = []
  let initTotalItem = 0

  if (localStorage.getItem('chart')) {
    if (JSON.parse(localStorage.getItem('chart')).length >= 0) {
      initChart = JSON.parse(localStorage.getItem('chart'))
    }
  }

  if (localStorage.getItem('chartTotalItem')) {
    initTotalItem = localStorage.getItem('chartTotalItem')
  }

  const [menus, setMenus] = useState([])
  const [chart, setChart] = useState(initChart)
  const [totalItem, setTotalItem] = useState(initTotalItem)

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

  const addToChart = async (menu) => {
    const updateChart = [...chart]
    let itemIndex = updateChart.findIndex((item) => item.id == menu.id)

    if (itemIndex > -1) {
      updateChart[itemIndex].amount += 1
      setChart([...updateChart])
    } else {
      menu.amount = 1
      menu.unit = 'porsi'
      menu.menu = {
        connect: {
          id: menu.id
        }
      }
      setChart([...chart, menu])
      setTotalItem(parseInt(totalItem) + 1)
    }
  }

  useEffect(() => {
    localStorage.setItem('chart', JSON.stringify(chart))
    localStorage.setItem('chartTotalItem', chart.length)
  }, [chart, totalItem])

  return (
    <div>
      <Navbar totalItem={totalItem}/>
      <div className="container">
        <div className="row">
          {
            menus.length > 0
              ? menus.map((menu, index) => (
                <div className="col-md-3 mb-3" key={index}>
                  <div className={"card shadow shadow-sm"} style={{minHeight: '260px', maxHeight: '260px'}}>
                    {chart.findIndex((item) => item.id == menu.id) > -1
                      ? (<span className="bg-warning badge" style={{ position: 'absolute', top: '5px', right: '10px' }}>
                        {chart[chart.findIndex((item) => item.id == menu.id)].amount} porsi</span>) : ''}
                    <div className="card-body">
                      <h5 className="card-title">{menu.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Rp{menu.price}</h6>
                      <p className="card-text" style={{fontSize: '13px', minHeight: '70px', maxHeight: '70px'}}>{menu.description}</p>
                      <button onClick={() => addToChart(menu)} className="card-link btn btn-outline-primary w-100">Add to chart</button>
                    </div>
                  </div>
                </div>
              ))
              : <p>Data belum tersedia!</p>
          }
        </div>
      </div>
    </div>
  )
}