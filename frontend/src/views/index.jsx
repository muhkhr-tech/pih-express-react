import { useEffect, useState } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"
import Header from "../components/Header"

export default function Index() {
  let initCart = []
  let initTotalItem = 0

  if (localStorage.getItem('cart')) {
    if (JSON.parse(localStorage.getItem('cart')).length >= 0) {
      initCart = JSON.parse(localStorage.getItem('cart'))
    }
  }

  if (localStorage.getItem('cartTotalItem')) {
    initTotalItem = localStorage.getItem('cartTotalItem')
  }

  const [menus, setMenus] = useState([])
  const [cart, setCart] = useState(initCart)
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

  const addToCart = async (menu) => {
    const updateCart = [...cart]
    let itemIndex = updateCart.findIndex((item) => item.id == menu.id)

    if (itemIndex > -1) {
      updateCart[itemIndex].amount += 1
      setCart([...updateCart])
    } else {
      menu.amount = 1
      menu.unit = 'porsi'
      menu.menu = {
        connect: {
          id: menu.id
        }
      }
      setCart([...cart, menu])
      setTotalItem(parseInt(totalItem) + 1)
    }
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('cartTotalItem', cart.length)
  }, [cart, totalItem])

  return (
    <div>
      <Header/>
      <Navbar totalItem={totalItem} />
      <div className="container">
        <div className="row" id="container-menu">
          {
            menus.length > 0
              ? menus.map((menu, index) => (
                <div className="col-md-3 px-4 mb-5" key={index}>
                  <div className={"card border-0 p-1"} style={{ minHeight: '260px', maxHeight: '500px' }}>
                    {cart.findIndex((item) => item.id == menu.id) > -1
                      ? (<span className="bg-warning badge" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '999' }}>
                        {cart[cart.findIndex((item) => item.id == menu.id)].amount} porsi</span>) : ''}
                    <div style={{ width: '100%', height: '250px' }} className="d-flex justify-content-center align-items-center shadow-sm rounded bg-white mb-2">
                      <img src={`${process.env.BASE_URL}/${menu.image}`} className="rounded" style={{ objectFit: 'cover', width: '98%', height: '98%' }} />
                    </div>
                    <div className="card-body p-0">
                      <h5 className="card-title">{menu.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Rp{menu.price}</h6>
                      <p className="card-text" style={{ fontSize: '13px', minHeight: '70px', maxHeight: '70px' }}>{menu.description}</p>
                      <button onClick={() => addToCart(menu)} className="card-link btn btn-outline-danger w-100">Add to cart</button>
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