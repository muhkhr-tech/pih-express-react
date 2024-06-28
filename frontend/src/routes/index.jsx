import { Route, Routes } from "react-router-dom";
import MenuIndex from "../views/menus";
import AdminMenuIndex from "../views/admin/menus";
import AdminMenuCreate from "../views/admin/menus/create";
import AdminMenuEdit from "../views/admin/menus/edit";
import Index from "../views";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/admin/menus" element={<AdminMenuIndex/>}/>
            <Route path="/admin/menus/create" element={<AdminMenuCreate/>}/>
            <Route path="/admin/menus/edit/:id" element={<AdminMenuEdit/>}/>

            <Route path="/" element={<Index/>}/>
            <Route path="/menus" element={<MenuIndex/>}/>
        </Routes>
    )
}