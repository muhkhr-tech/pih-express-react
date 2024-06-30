import { useEffect, useState } from "react"
import api from "../../services/api"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"

export default function SellingIndex() {
  const navigate = useNavigate()

  const [sellingDate, setSellingDate] = useState('')
  const [description, setDescription] = useState('Penjualan makanan')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [ongkir, setOngkir] = useState(0)
  const [customers, setCustomers] = useState([])

  let initChart = []
  let initTotal = 0
  let initTotalItem = 0
  let updatedTotal = 0

  if (localStorage.getItem('chart')) {
    if (JSON.parse(localStorage.getItem('chart')).length >= 0) {
      initChart = JSON.parse(localStorage.getItem('chart'))
    }
  }

  if (localStorage.getItem('chartTotalItem')) {
    initTotalItem = localStorage.getItem('chartTotalItem')
  }

  if (localStorage.getItem('chartTotalPrice')) {
    initTotal = JSON.parse(localStorage.getItem('chartTotalPrice'))
  }

  const [chart, setChart] = useState(initChart)
  const [total, setTotal] = useState(initTotal)
  const [totalItem, setTotalItem] = useState(initTotalItem)
  const [isUpdateTotal, setIsUpdteTotal] = useState(false)

  const createSelling = async (e) => {
    e.preventDefault()

    try {
      let updatedChart = initChart.map(item => {
        let { id, name, description, active, ...rest } = item
        return rest
      })

      await api.post('/api/sellings', {
        sellingDate: sellingDate,
        description: description,
        customerName: customerName,
        customerPhone: customerPhone,
        customerAddress: customerAddress,
        ongkir: ongkir,
        menus: updatedChart
      })
        .then(() => {
          navigate('/')
          localStorage.removeItem('chart')
          localStorage.removeItem('chartTotalItem')
          localStorage.removeItem('chartTotalPrice')
        })

    } catch (error) {
      console.error("There was an error create selling!", error);
    }
  }

  const plusItem = (item) => {
    const updateItem = [...chart]
    const indexItem = updateItem.findIndex((obj) => obj.id == item.id)

    if (indexItem > -1) {
      updateItem[indexItem].amount += 1
    }

    setChart([...updateItem])
    setIsUpdteTotal(!isUpdateTotal)
    for (let i = 0; i < document.getElementsByClassName('subTotal').length; i++) {
      updatedTotal += parseInt(document.getElementsByClassName('subTotal')[i].textContent)
      setTotal(updatedTotal)
      console.log(document.getElementsByClassName('subTotal')[i], 'plus')
    }
  }

  const minusItem = (item) => {
    let updateItem = [...chart]
    const indexItem = updateItem.findIndex((obj) => obj.id == item.id)

    if (indexItem > -1) {
      if (updateItem[indexItem].amount > 1) {
        updateItem[indexItem].amount -= 1
      } else {
        updateItem = updateItem.filter((obj) => obj.id != item.id)
        setTotalItem(chart.length)
      }
    }

    setChart([...updateItem])
    setIsUpdteTotal(!isUpdateTotal)
    for (let i = 0; i < document.getElementsByClassName('subTotal').length; i++) {
      updatedTotal += parseInt(document.getElementsByClassName('subTotal')[i].textContent)
      setTotal(updatedTotal)
    }
  }

  useEffect(() => {
    localStorage.setItem('chart', JSON.stringify(chart))
    localStorage.setItem('chartTotalPrice', JSON.stringify(total))
    localStorage.setItem('chartTotalItem', chart.length)

    if (chart.length < 1) {
      setTotal(0)
    }

    if (chart.length < 1) {
      navigate('/')
    }
  }, [isUpdateTotal, total, chart, totalItem])

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
            chart.length > 0
              ? <div className="col-md-6">
                {chart.map((item, index) => (
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
                <div className="bg-light rounded-1 px-5 py-3 mt-2 mb-5 d-flex justify-content-between">
                  <h4 className="mb-0">Total</h4> <h4 className="mb-0">Rp{total}</h4>
                </div>
              </div>
              : <p>Data belum tersedia!</p>
          }

          {
            chart.length > 0
            && <div className="col-md-6">
              <div className="card border-0">
                <div className="card-body">
                  <h5 className="card-title mb-5">Data Penjualan</h5>
                  <form onSubmit={createSelling}>
                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Tanggal Jual</label>
                      <input type="date" value={sellingDate} onChange={(e) => setSellingDate(e.target.value)} className="form-control" placeholder="" />
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
                      {/* <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="form-control"
                        placeholder="" /> */}
                        <textarea name="" id="" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="form-control"></textarea>
                    </div>

                    <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Ongkir</label>
                      <input type="number" value={ongkir} onChange={(e) => setOngkir(e.target.value)} className="form-control"
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