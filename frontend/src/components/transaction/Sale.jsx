import { Link } from "react-router-dom";

export default function Sale() {
  return (
    <Link to={'/transactions/sales'}>
      <div className="card p-0 mb-1">
        <div className="card-body d-flex justify-content-center">
          <h6 className="card-title" style={{ fontSize: '14px' }}>Sale</h6>
        </div>
      </div>
    </Link>
  )
}