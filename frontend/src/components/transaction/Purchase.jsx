import { Link } from "react-router-dom";

export default function Purchase() {
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
    //   <div className="container">
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarNav">
    //       <ul className="navbar-nav">
    //         <li className="nav-item">
    //           <Link to={'/transactions'} className="nav-link">Purchase</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link to={'/purchases'} className="nav-link">Sale</Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <Link to={'/transactions/purchases'}>
      <div className="card p-0 mb-1">
        <div className="card-body d-flex justify-content-center">
          <h6 className="card-title" style={{ fontSize: '14px' }}>Purchase</h6>
        </div>
      </div>
    </Link>
  )
}