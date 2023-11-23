import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";
import Quotation from "./pages/Quotation";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/client/reservation" element={<Reservation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservation" element={<Reservation />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route
                    path="/quotation/:reservation_id"
                    element={<Quotation />}
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/announcements" element={<Announcement />} />
                <Route path="/ratings" element={<Ratings />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
