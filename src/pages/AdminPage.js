import { Table, Button } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
import ModalEdit from "../components/ModalEdit";

function Store() {
    const cart = useContext(CartContext);
    const [show, setShow] = useState(false);
    const [editProduct, setEditProduct] = useState({});
    const hideModal = () => {
        setEditProduct({});
        setShow(false);
    };
    const showModal = (product) => {
        setEditProduct(product);
        setShow(true);
    };

    const deleteHandler = async (product) => {
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}api/products/${product._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.status === 200) {
            const newProducts = cart.allProducts.filter((p) => p._id !== product._id);
            cart.setProducts(newProducts);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACK_URL}api/orders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            cart.setOrders(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <ModalEdit show={show} onHide={hideModal} product={editProduct} />
            <h1 align='center' className='p-3'>
                Items:
            </h1>
            {cart.allProducts.length !== 0 ? (
                <div>
                    <Table className='mb-0 align-middle'>
                        <thead>
                            <th>Title</th>
                            <th>Stripe price</th>
                            <th>Price</th>
                            <th>&nbsp;</th>
                        </thead>

                        <tbody>
                            {cart.allProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.title}</td>
                                    <td>{product.id}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Button className='me-3' onClick={() => showModal(product)}>
                                            Edit
                                        </Button>
                                        <Button onClick={() => deleteHandler(product)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className='pt-3'>
                    <div>No results found</div>
                </div>
            )}
            <Button className='mt-3' onClick={() => showModal({})}>
                Add new
            </Button>

            <h1 align='center' className='p-3'>
                Orders:
            </h1>
            {cart.allOrders.length !== 0 ? (
                <div>
                    <Table className='mb-0 align-middle'>
                        <thead>
                            <th>Time</th>
                            <th>Products</th>
                            <th>Amount</th>
                        </thead>

                        <tbody>
                            {cart.allOrders.map((order) => (
                                <tr key={order.id}>
                                    <td>{new Date(order.createdAt).toLocaleString("en-US")}</td>
                                    <td>
                                        {order.products.map((p) => (
                                            <tr>
                                                <td>{p.title}</td>
                                                <td>Quantity - {p.quantity}</td>
                                            </tr>
                                        ))}
                                    </td>
                                    <td>{order.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className='pt-3'>
                    <div>No results found</div>
                </div>
            )}
        </>
    );
}

export default Store;
