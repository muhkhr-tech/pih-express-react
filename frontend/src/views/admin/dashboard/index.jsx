import Sidebar from "../../../components/admin/Sidebar";

export default function Index() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            hello
          </div>
        </div>
      </div>
    </div>
  )
}