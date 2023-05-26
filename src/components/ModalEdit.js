import { useEffect, useState, useContext } from "react";
import { Modal, Button, Row, Form } from "react-bootstrap";
import { CartContext } from "../CartContext";

const ModalEdit = ({ show, onHide, product }) => {
    const cart = useContext(CartContext);
    const [form, setForm] = useState({});
    useEffect(() => {
        setForm(product);
    }, [product]);
    const createHandler = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}api/products/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
        if (response.status === 200) {
            const data = await response.json();

            cart.setProducts([...cart.allProducts, data]);
            onHide();
        }
    };
    const updateHandler = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}api/products/${product._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
        if (response.status === 200) {
            const data = await response.json();
            let newProducts = [...cart.allProducts];
            const index = newProducts.findIndex((p) => p._id === data._id);
            newProducts[index] = data;

            cart.setProducts(newProducts);
            onHide();
        }
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header className='justify-content-start border-0'>
                <Modal.Title className='d-flex align-items-center'>{product._id ? "Edit" : "Add"}</Modal.Title>
                <Button variant='close' onClick={onHide}></Button>
            </Modal.Header>
            <Modal.Body className='text-start'>
                <Row>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Stripe price</Form.Label>
                        <Form.Control type='text' value={form.id} onChange={(e) => setForm((prev) => ({ ...prev, id: e.target.value }))}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group>
                        <Form.Label>Price (should be like in the Stripe)</Form.Label>
                        <Form.Control
                            type='text'
                            value={form.price}
                            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}></Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Button className='mt-3' onClick={() => (product._id ? updateHandler() : createHandler())}>
                        {product._id ? "Save" : "Create"}
                    </Button>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEdit;
