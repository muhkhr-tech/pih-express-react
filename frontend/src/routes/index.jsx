import { Route, Routes } from "react-router-dom";
import MenuIndex from "../views/menus";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/menu" element={<MenuIndex/>}/>
        </Routes>
    )
}