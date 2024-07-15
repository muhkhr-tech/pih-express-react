import { Route, Routes } from "react-router-dom";
import AdminMenuIndex from "../views/admin/menus";
import AdminMenuCreate from "../views/admin/menus/create";
import AdminMenuEdit from "../views/admin/menus/edit";
import Index from "../views";
import SaleIndex from "../views/sales";
import PurchaseIndex from "../views/purchases";
import MaterialIndex from "../views/admin/materials";
import TransactionIndex from "../views/transactions";
import Purchases from "../views/transactions/purchase";
import Sales from "../views/transactions/sale";
import PurchaseDetail from "../views/purchases/detail";
import SaleDetail from "../views/sales/detail";
import AdminMenuUploadImage from "../views/admin/menus/image";
import AdminDashboard from "../views/admin/dashboard/index"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/admin/menus" element={<AdminMenuIndex />} />
      <Route path="/admin/menus/create" element={<AdminMenuCreate />} />
      <Route path="/admin/menus/edit/:id" element={<AdminMenuEdit />} />
      <Route path="/admin/menus/image/:id" element={<AdminMenuUploadImage />} />

      <Route path="/admin/materials" element={<MaterialIndex />} />

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