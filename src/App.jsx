import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Reservation from "./pages/Reservation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Reservations from "./pages/Reservations";
import Quotation from "./pages/Quotation";
import Profile from "./pages/Profile";
import Announcement from "./pages/Announcement";
import Ratings from "./pages/Ratings";
import Transaction from "./pages/Transacations";
import Staff from "./pages/Staff";
import Samp from "./pages/Samp";

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
                <Route
                    path="/reservation/:event_type_param"
                    element={<Reservation />}
                />
                <Route path="/reservations" element={<Reservations />} />
                <Route
                    path="/quotation/:reservation_id"
                    element={<Quotation />}
                />
                <Route path="/user/:page" element={<Profile />} />
                <Route path="/announcements" element={<Announcement />} />
                <Route path="/ratings" element={<Ratings />} />
                <Route path="/transactions" element={<Transaction />} />
                {/* for /staff */}
                <Route path="/staff" element={<Staff />} />
                <Route path="/sample" element={<Samp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
