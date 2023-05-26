import { Row, Col } from "react-bootstrap";
import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../CartContext";

function Store() {
    const cart = useContext(CartContext);
    return (
        <>
            <h1 align='center' className='p-3'>
                Welcome to the store!
            </h1>
            <Row xs={1} md={3} className='g-4'>
                {cart.allProducts.map((product, idx) => (
                    <Col align='center' key={idx}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default Store;
