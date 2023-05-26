import { Button, Navbar, Modal } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

function NavbarComponent() {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}api/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ items: cart.items, amount: cart.getTotalCost().toFixed(2) })
        });
        const data = await response.json();
        if (data.url) {
            window.location.assign(data.url); // Forwarding user to Stripe
        }
    };

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACK_URL}api/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            cart.setProducts(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar expand='sm'>
                <Navbar.Brand href='/'>Ecommerce Store</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className='justify-content-end'>
                    <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ? (
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant='success' onClick={checkout}>
                                Purchase items!
                            </Button>
                        </>
                    ) : (
                        <h1>There are no items in your cart!</h1>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NavbarComponent;
