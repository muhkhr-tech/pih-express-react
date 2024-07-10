import { useEffect, useState } from "react"
import api from "../services/api"
import Navbar from "../components/Navbar"

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
      <Navbar totalItem={totalItem}/>
      <div className="container">
        <div className="row" id="container-menu">
          {
            menus.length > 0
              ? menus.map((menu, index) => (
                <div className="col-md-3 mb-3" key={index}>
                  <div className={"card shadow shadow-sm"} style={{minHeight: '260px', maxHeight: '260px'}}>
                    {cart.findIndex((item) => item.id == menu.id) > -1
                      ? (<span className="bg-warning badge" style={{ position: 'absolute', top: '5px', right: '10px' }}>
                        {cart[cart.findIndex((item) => item.id == menu.id)].amount} porsi</span>) : ''}
                    <div className="card-body">
                      <h5 className="card-title">{menu.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">Rp{menu.price}</h6>
                      <p className="card-text" style={{fontSize: '13px', minHeight: '70px', maxHeight: '70px'}}>{menu.description}</p>
                      <button onClick={() => addToCart(menu)} className="card-link btn btn-outline-primary w-100">Add to cart</button>
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