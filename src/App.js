import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cancel from "./pages/Cancel";
import AdminPage from "./pages/AdminPage";
import Store from "./pages/Store";
import Success from "./pages/Success";
import CartProvider from "./CartContext";

function App() {
    return (
        <CartProvider>
            <Container>
                <NavbarComponent></NavbarComponent>
                <BrowserRouter>
                    <Routes>
                        <Route path='store_admin' element={<AdminPage />} />
                        <Route path='store' element={<Store />} />
                        <Route path='success' element={<Success />} />
                        <Route path='cancel' element={<Cancel />} />
                        <Route path='*' element={<Navigate replace to='store' />} />
                    </Routes>
                </BrowserRouter>
            </Container>
        </CartProvider>
    );
}

export default App;
