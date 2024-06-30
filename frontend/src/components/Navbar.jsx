import { Link } from "react-router-dom"

export default function Navbar(props) {
  const { totalItem } = props

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-3 border-bottom shadow-sm">
      <div className="container">
        <Link to={'/'}><img src={'./logo.png'} style={{ width: '80px' }} /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <Link to={'/'} className="nav-link">Home</Link>
            </li> */}
            <li className="nav-item" style={{ position: 'relative' }}>
              <Link to={'/sellings'} className="nav-link">
                <i className={totalItem > 0 ? "fa-solid fa-cart-shopping text-warning" : "fa-solid fa-cart-shopping text-secondary"}></i>
                {totalItem > 0 ?
                  <span className="bg-warning rounded-circle d-flex justify-content-center align-items-center text-white fw-bold" style={{ width: '20px', height: '20px', position: 'absolute', top: '0px', right: '-15px', fontSize: '13px' }}>{totalItem}</span> : ''}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}