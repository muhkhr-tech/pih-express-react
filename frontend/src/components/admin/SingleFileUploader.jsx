import { useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";

export default function SingleFileUploader() {
  const { id } = useParams()
  const formData = new FormData()

  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e) => {
    setStatus('uploading')

    formData.append('image', file)

    await api.post(`/api/admin/menus/${id}/upload`, formData)
    .then(() => {
      setStatus('success')
    })
    .catch(error => {
      setStatus('fail')
    })
  }

  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} className="form-control"/>
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button onClick={handleUpload} className="btn btn-sm btn-primary">Upload a file</button>}

      <Result status={status}/>
    </>
  )
} 

const Result = ({ status }) => {
  if (status === "success") {
    return <p>✅ File uploaded successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};