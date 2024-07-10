import { useEffect, useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"

export default function SaleIndex() {
  const navigate = useNavigate()

  const [saleDate, setSaleDate] = useState('')
  const [description, setDescription] = useState('Penjualan makanan')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [ongkir, setOngkir] = useState(0)
  const [price, setPrice] = useState(0)
  const [customers, setCustomers] = useState([])
  const [isSaveCustomer, setIsSaveCustomer] = useState(false)
  const [validation, setValidation] = useState([])

  let initCart = []
  let initTotalItem = 0
  let updatedTotal = 0

  if (localStorage.getItem('cart')) {
    if (JSON.parse(localStorage.getItem('cart')).length >= 0) {
      initCart = JSON.parse(localStorage.getItem('cart'))
    }
  }

  if (localStorage.getItem('cartTotalItem')) {
    initTotalItem = localStorage.getItem('cartTotalItem')
  }

  const [cart, setCart] = useState(initCart)
  const [totalItem, setTotalItem] = useState(initTotalItem)
  const [isUpdateTotal, setIsUpdteTotal] = useState(false)

  const createSale = async (e) => {
    e.preventDefault()

    let updatedCart = initCart.map(item => {
      let { id, name, description, active, ...rest } = item
      return rest
    })

    if (isSaveCustomer) {
      await api.post('/api/customers', {
        name: customerName,
        phone: customerPhone,
        address: customerAddress
      })
    }

    await api.post('/api/sales', {
      saleDate: saleDate,
      description: description,
      customerName: customerName,
      customerPhone: customerPhone,
      customerAddress: customerAddress,
      ongkir: ongkir,
      price: price,
      menus: updatedCart
    })
      .then(() => {
        navigate('/')
        localStorage.removeItem('cart')
        localStorage.removeItem('cartTotalItem')
        localStorage.removeItem('cartTotalPrice')
      })
      .catch(error => {
        setValidation(error.response.data)
      })
  }

  const plusItem = (item) => {
    const updateItem = [...cart]
    const indexItem = updateItem.findIndex((obj) => obj.id == item.id)

    if (indexItem > -1) {
      updateItem[indexItem].amount += 1
    }

    setCart([...updateItem])
    setIsUpdteTotal(!isUpdateTotal)
  }

  const minusItem = (item) => {
    let updateItem = [...cart]
    const indexItem = updateItem.findIndex((obj) => obj.id == item.id)

    if (indexItem > -1) {
      if (updateItem[indexItem].amount > 1) {
        updateItem[indexItem].amount -= 1
      } else {
        updateItem = updateItem.filter((obj) => obj.id != item.id)
        setTotalItem(cart.length)
      }
    }

    setCart([...updateItem])
    setIsUpdteTotal(!isUpdateTotal)
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    localStorage.setItem('cartTotalItem', cart.length)

    for (let i = 0; i < document.getElementsByClassName('subTotal').length; i++) {
      updatedTotal += parseInt(document.getElementsByClassName('subTotal')[i].textContent)
    }
    if (!isNaN(ongkir)) {
      updatedTotal += ongkir
    }
    setPrice(updatedTotal)

    if (cart.length < 1) {
      navigate('/')
    }
  }, [isUpdateTotal, cart, totalItem, ongkir])

  const fetchDataCustomers = async () => {
    try {
      const response = await api.get('/api/customers')
      setCustomers(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the customers!", error);
    }
  }

  useEffect(() => {
    fetchDataCustomers()
  }, [])


  const selectCustomer = (e) => {
    const customer = JSON.parse(e.target.value)

    setCustomerName(customer.name)
    setCustomerPhone(customer.phone)
    setCustomerAddress(customer.address)
  }

  return (
    <div>
      <Navbar totalItem={totalItem} />
      <div className="container">
        <div className="row">
          {
            validation.errors && (
              <div className="alert alert-danger mt-2 pb-0">
                {
                  validation.errors.map((error, index) => (
                    <p key={index}>{error.msg}</p>
                  ))
                }
              </div>
            )
          }
          {
            cart.length > 0
              ? <div className="col-md-6">
                {cart.map((item, index) => (
                  <div className="card mb-1 border-0" key={index}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h6 className="card-title">{item.name}</h6>
                          <h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: '13px' }}>Rp{item.price}</h6>
                          <p className="card-text" style={{ fontSize: '14px' }}>{item.description}</p>
                        </div>
                        <div>
                          <p>{item.amount} x {item.price}</p>
                          <h4>Rp<span className="subTotal">{item.amount * item.price}</span></h4>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <button onClick={() => minusItem(item)}>-</button>
                        <div className="px-3">{item.amount}</div>
                        <button onClick={() => plusItem(item)}>+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              : <p>Data belum tersedia!</p>
          }

          {
            cart.length > 0
            && <div className="col-md-6">
              <div className="card border-0">
                <div className="card-body">
                  <h5 className="card-title mb-5">Data Penjualan</h5>
                  <form onSubmit={createSale}>
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Tanggal Jual</label>
                      <input type="date" value={saleDate} onChange={(e) => setSaleDate(e.target.value)} className="form-control" placeholder="" />
                    </div>

                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Keterangan</label>
                      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"
                        placeholder="" />
                    </div>

                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Pelanggan</label>
                      <select className="form-select" onChange={(e) => selectCustomer(e)}>
                        <option value="">-Pilih-</option>
                        {customers.map((customer, index) => (
                          <option key={index} value={JSON.stringify(customer)}>{customer.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Nama Pelanggan</label>
                      <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="form-control"
                        placeholder="" />
                    </div>

                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Nomor HP Pelanggan</label>
                      <input type="text" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="form-control"
                        placeholder="" />
                    </div>

                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Alamat Pelanggan</label>
                      <textarea name="" id="" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="form-control"></textarea>
                    </div>

                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Ongkir</label>
                      <input type="number" value={ongkir} onChange={(e) => setOngkir(parseInt(e.target.value))} className="form-control"
                        placeholder="" />
                    </div>

                    <div className="form-group mb-3">
                      <input type="checkbox" id="isSave" value={isSaveCustomer} onChange={(e) => setIsSaveCustomer(e.target.value)}/>
                      <label className="ms-1 mb-1 fw-bold" htmlFor="isSave">Simpan data pelanggan</label>
                    </div>

                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Total</label>
                      <input type="number" value={price} readOnly={true} className="form-control bg-light"
                        placeholder="" />
                    </div>

                    <button className="btn btn-primary w-100" type="submit">Save</button>
                  </form>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}