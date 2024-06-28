import { useEffect, useState } from "react"
import api from "../../services/api"

export default function MenuIndex() {
  const [menus, setMenus] = useState([])

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

  return (
    <div>
      {
        menus.length > 0
          ? menus.map((menu, index) => (
            <div key={index}>{menu.name}</div>
          ))
          : <p>Data belum tersedia!</p>
      }
    </div>
  )
}