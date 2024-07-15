import { useEffect } from "react";
import api from "../../../services/api";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar";
import SingleFileUploader from "../../../components/admin/SingleFileUploader";

export default function AdminMenuUploadImage() {

  const { id } = useParams()

  const fetchDetailMenu = async () => {
    await api.get(`/api/admin/menus/${id}`)
      .then(response => {
        setName(response.data.data.image)
        console.log(response.data.data.image)
        setDescription(response.data.data.description)
        setPrice(response.data.data.price)
      })
      .catch(error => {
        setValidation(error.response.data)
      })
  }

  useEffect(() => {
    fetchDetailMenu()
  }, [])

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-4">
          <div className="card border-0">
            <div className="card-body">
              <h5 className="card-title mb-5">Upload Image Menu</h5>
              <SingleFileUploader/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}