import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import Sidebar from "../../../components/admin/Sidebar";

export default function Index() {
  const [user, setUser] = useState([])

  useEffect(() => {
    const userData = Cookies.get('user')

    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            hello {user?.name}
          </div>
        </div>
      </div>
    </div>
  )
}