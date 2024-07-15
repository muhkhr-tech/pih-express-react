import { Link } from "react-router-dom"

export default function Header() {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white my-3">
      <div className="container px-0">
      <h4 style={{fontFamily: 'Playwrite CU'}} className="text-danger">Pawon<br></br>Ibu Hamna</h4>
        {/* <Link to={'/'}><img src={'../../logo.png'} style={{ width: '80px' }} /></Link> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav align-items-center d-flex justify-content-end w-100">
            {/* <li className="nav-item">
              <Link to={'/purchases'} className="nav-link">Purchase <i className="fa-solid fa-shopping-bag"></i></Link>
            </li>
            <li className="nav-item" style={{ position: 'relative' }}>
              <Link to={'/sales'} className="nav-link">
                Sale <i className={totalItem > 0 ? "fa-solid fa-cart-shopping" : "fa-solid fa-cart-shopping"}></i>
                {totalItem > 0 ?
                  <span className="bg-warning rounded-circle d-flex justify-content-center align-items-center text-white fw-bold" style={{ width: '20px', height: '20px', position: 'absolute', top: '0px', right: '-15px', fontSize: '13px' }}>{totalItem}</span> : ''}
              </Link>
            </li> */}
            <img src={'../../logo.png'} style={{ width: '80px' }} />
            {/* <h4 style={{fontFamily: 'Playwrite CU'}}>Pawon<br></br>Ibu Hamna</h4> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}