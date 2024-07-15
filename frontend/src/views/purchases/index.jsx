import { useEffect, useState } from "react"
import api from "../../services/api"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

export default function PurchaseIndex() {
  const navigate = useNavigate()

  let initCart = []
  let initTotalItem = 0

  if (localStorage.getItem('purchase_cart')) {
    if (JSON.parse(localStorage.getItem('purchase_cart')).length >= 0) {
      initCart = JSON.parse(localStorage.getItem('purchase_cart'))
    }
  }

  if (localStorage.getItem('cartTotalItem')) {
    initTotalItem = localStorage.getItem('cartTotalItem')
  }

  const [materials, setMaterials] = useState([])
  const [totalItem, setTotalItem] = useState(initTotalItem)

  const [purchaseDate, setPurchaseDate] = useState('')
  const [description, setDescription] = useState('Pembelian barang')
  const [stores, setStores] = useState([])
  const [storeName, setStoreName] = useState('')
  const [storePhone, setStorePhone] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [validation, setValidation] = useState([])

  const [searchMaterial, setSearchMaterial] = useState('')
  const [cart, setCart] = useState(initCart)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isUpdateTotal, setIsUpdteTotal] = useState(false)
  const [isSaveStore, setIsSaveStore] = useState(false)
  
  const [isSearchInputClean, setIsSearchInputClean] = useState(false)

  const fetchDataMaterials = async () => {
    try {
      const response = await api.get('/api/materials')
      setMaterials(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the materials!", error);
    }
  }

  const searchDataMaterials = async () => {
    try {
      const response = await api.get(`/api/materials?search=${searchMaterial}`)
      setMaterials(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the materials!", error);
    }
  }

  const createPurchase = async (e) => {
    e.preventDefault()

    let updatedCart = initCart.map(item => {
      let { id, name, ...rest } = item
      return rest
    })

    if (isSaveStore) {
      await api.post('/api/stores', {
        name: storeName,
        phone: storePhone,
        address: storeAddress
      })
    }

    await api.post('/api/purchases', {
      purchaseDate: purchaseDate,
      description: description,
      storeName: storeName,
      storePhone: storePhone,
      storeAddress: storeAddress,
      price: totalPrice,
      materials: updatedCart

    })
      .then(() => {
        localStorage.removeItem('purchase_cart')
        navigate('/')
      })
      .catch(error => {
        setValidation(error.response.data)
      })
  }

  const addCart = (material) => {
    const updateCart = [...cart]
    let itemIndex = updateCart.findIndex((item) => item.id == material.id)

    if (itemIndex > -1) {
      updateCart[itemIndex].amount += 1
      setCart([...updateCart])
    } else {
      material.amount = 1
      material.material = {
        connect: {
          id: material.id
        }
      }
      setCart([...cart, material])
    }

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
      }
    }

    setCart([...updateItem])
    setIsUpdteTotal(!isUpdateTotal)
  }

  useEffect(() => {

    let updatedTotal = 0
    if (document.getElementsByClassName('price').length > 0) {
      for (let i = 0; i < document.getElementsByClassName('price').length; i++) {
        updatedTotal += parseInt(document.getElementsByClassName('price')[i].textContent)
      }
    }

    setTotalPrice(updatedTotal)
  }, [isUpdateTotal])

  useEffect(() => {
    fetchDataMaterials()
  }, [isSearchInputClean])

  useEffect(() => {
    localStorage.setItem('purchase_cart', JSON.stringify(cart))
  }, [cart])

  const cleanSearchInput = () => {
    setSearchMaterial('')
    setIsSearchInputClean(!isSearchInputClean)
  }

  const fetchDataStores = async () => {
    try {
      const response = await api.get('/api/stores')
      setStores(response.data.data)
    } catch (error) {
      console.error("There was an error fetching the stores!", error);
    }
  }

  useEffect(() => {
    fetchDataStores()
  }, [])

  const selectStore = (e) => {
    const store = JSON.parse(e.target.value)

    setStoreName(store.name)
    setStorePhone(store.phone)
    setStoreAddress(store.address)
  }

  return (
    <div>
      <Header/>
      <Navbar totalItem={totalItem} />
      <div className="container">
        <div className="row mb-4">
          <Link to={"/purchases/history"}><i className="fa-solid fa-file-lines"></i> History</Link>
        </div>
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
          <div className="col-md-4">
            <div className="row">
              <div className="d-flex p-1 gap-1 mb-2">
                <div className="d-flex position-relative w-100">
                <input type="text" value={searchMaterial} onChange={(e) => setSearchMaterial(e.target.value)} className="form-control" placeholder="search material" />
                {
                  searchMaterial != '' && <div className="text-danger position-absolute" style={{ right: '10px', top: '5px', cursor: 'pointer'}}>
                    <i className="fa fa-times" onClick={() => cleanSearchInput()}></i></div>
                }
                </div>
                <button onClick={searchDataMaterials} className="btn btn-primary">Search</button>
              </div>
            </div>
            {
              materials.length > 0
                ?
                <div className="row">
                  {materials.map((material, index) => (
                    <div className="col-md-6 p-1" key={index}>
                      <div className="card p-1">
                        <div className="card-body">
                          <div>
                            <h6 className="card-title fw-bold" style={{ fontSize: '13px' }}>{material.name}</h6>
                            <h6 className="card-subtitle mb-2 text-muted" style={{ fontSize: '13px' }}>Rp{material.price} - {material.unit}</h6>
                            {
                              cart.findIndex((item) => item.id == material.id) > -1
                                ? <i className="fa fa-check-circle text-success"></i>
                                : <button onClick={() => addCart(material)} className="btn btn-sm btn-light w-100">+</button>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <p>Data belum tersedia!</p>
            }
          </div>

          <div className="col-md-4">
            <div className="card pt-0 border-0">
              <div className="card-body">
                <h5 className="card-title">Data Pembelian Barang</h5>
                {
                  cart.length > 0
                    ? cart.map((item, index) => (
                      <div className="card p-0 mb-1" key={index}>
                        <div className="card-body p-2">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="card-title">{item.name}</h6>
                              <p className="card-text" style={{ fontSize: '14px' }}>Satuan:{item.unit}</p>
                              <div className="d-flex gap-1">
                                <button onClick={() => minusItem(item)} className="btn btn-sm btn-outline-danger">-</button>
                                <button onClick={() => addCart(item)} className="btn btn-sm btn-outline-success">+</button>
                              </div>
                            </div>
                            <div>
                              {item.amount} x Rp{item.price}
                              <h4>Rp<span className="price">{item.amount * item.price}</span></h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    : <p>Anda belum menambahkan barang!</p>
                }
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card pt-0 border-0">
              <div className="card-body">
                {/* <h5 className="card-title mb-5">Data Pembelian Barang</h5> */}
                <form onSubmit={createPurchase}>
                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Tanggal Beli</label>
                    <input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="form-control" placeholder="" />
                  </div>

                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Keterangan</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control"
                      placeholder="" />
                  </div>

                  <div className="form-group mb-3">
                      <label className="mb-1 fw-bold">Toko</label>
                      <select className="form-select" onChange={(e) => selectStore(e)}>
                        <option value="">-Pilih-</option>
                        {stores.map((store, index) => (
                          <option key={index} value={JSON.stringify(store)}>{store.name}</option>
                        ))}
                      </select>
                    </div>

                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Nama Toko</label>
                    <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} className="form-control"
                      placeholder="" />
                  </div>

                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Nomor HP Toko</label>
                    <input type="text" value={storePhone} onChange={(e) => setStorePhone(e.target.value)} className="form-control"
                      placeholder="" />
                  </div>

                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Alamat Toko</label>
                    <textarea name="" id="" className="form-control" value={storeAddress} onChange={(e) => setStoreAddress(e.target.value)}></textarea>
                  </div>

                  <div className="form-group mb-3">
                      <input type="checkbox" id="isSave" value={isSaveStore} onChange={(e) => setIsSaveStore(e.target.value)} />
                      <label className="ms-1 mb-1 fw-bold" htmlFor="isSave">Simpan data toko</label>
                    </div>

                  <div className="form-group mb-3">
                    <label className="mb-1 fw-bold">Total</label>
                    <input type="text" readOnly value={totalPrice} className="form-control bg-light"
                      placeholder="" />
                  </div>

                  <button className="btn btn-primary w-100" type="submit">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}