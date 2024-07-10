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

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/menus" element={<AdminMenuIndex />} />
      <Route path="/admin/menus/create" element={<AdminMenuCreate />} />
      <Route path="/admin/menus/edit/:id" element={<AdminMenuEdit />} />

      <Route path="/admin/materials" element={<MaterialIndex />} />

      <Route path="/" element={<Index />} />

      <Route path="/sales" element={<SaleIndex />} />
      <Route path="/purchases" element={<PurchaseIndex />} />
      <Route path="/purchases/:id/detail" element={<PurchaseDetail />} />
      <Route path="/transactions" element={<TransactionIndex />} />
      <Route path="/transactions/purchases" element={<Purchases />} />
      <Route path="/transactions/sales" element={<Sales />} />
    </Routes>
  )
}