import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AdminMenuIndex from "../views/admin/menus";
import AdminMenuCreate from "../views/admin/menus/create";
import AdminMenuEdit from "../views/admin/menus/edit";
import Index from "../views";
import SaleIndex from "../views/sales";
import PurchaseIndex from "../views/purchases";
import TransactionIndex from "../views/transactions";
import Purchases from "../views/transactions/purchase";
import Sales from "../views/transactions/sale";
import PurchaseDetail from "../views/purchases/detail";
import SaleDetail from "../views/sales/detail";
import AdminMenuUploadImage from "../views/admin/menus/image";
import AdminDashboard from "../views/admin/dashboard/index"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "../views/auth/login";
import AdminMaterialIndex from "../views/admin/materials";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/admin/dashboard" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login"/>} />

      <Route path="/admin/menus" element={isAuthenticated ? <AdminMenuIndex /> : <Navigate to="/login"/>}/>
      <Route path="/admin/menus/create" element={isAuthenticated ? <AdminMenuCreate /> : <Navigate to="/login"/>}/>
      <Route path="/admin/menus/edit/:id" element={isAuthenticated ? <AdminMenuEdit /> : <Navigate to="/login"/>}/>
      <Route path="/admin/menus/image/:id" element={isAuthenticated ? <AdminMenuUploadImage /> : <Navigate to="/login"/>}/>

      <Route path="/admin/materials" element={isAuthenticated ? <AdminMaterialIndex /> : <Navigate to="/login"/>}/>

      <Route path="/login" element={isAuthenticated ? <Navigate to="/admin/dashboard"/> : <Login />} />

      <Route path="/" element={<Index />} />

      <Route path="/sales" element={<SaleIndex />} />
      <Route path="/sales/:id/detail" element={<SaleDetail />} />
      <Route path="/sales/history" element={<Sales />} />

      <Route path="/purchases" element={<PurchaseIndex />} />
      <Route path="/purchases/:id/detail" element={<PurchaseDetail />} />
      <Route path="/purchases/history" element={<Purchases />} />

      <Route path="/transactions" element={<TransactionIndex />} />
      <Route path="/transactions/purchases" element={<Purchases />} />
      <Route path="/transactions/sales" element={<Sales />} />
    </Routes>
  )
}