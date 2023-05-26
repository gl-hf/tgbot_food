import { createContext, useState } from "react";
import { getProductData } from "./productsStore";

export const CartContext = createContext({
    items: [],
    allProducts: [],
    allOrders: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
    setProducts: () => {}
});

export function CartProvider({ children }) {
    const [allProducts, setAllProducts] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find((product) => product.id === id)?.quantity;

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(cp) {
        const quantity = getProductQuantity(cp.id);

        if (quantity === 0) {
            setCartProducts([
                ...cartProducts,
                {
                    id: cp.id,
                    quantity: 1,
                    title: cp.title,
                    price: cp.price
                }
            ]);
        } else {
            // product is in cart
            setCartProducts(
                cartProducts.map(
                    (product) =>
                        product.id === cp.id // if condition
                            ? { ...product, quantity: product.quantity + 1 } // if statement is true
                            : product // if statement is false
                )
            );
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity == 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    (product) =>
                        product.id === id // if condition
                            ? { ...product, quantity: product.quantity - 1 } // if statement is true
                            : product // if statement is false
                )
            );
        }
    }

    function deleteFromCart(id) {
        // [] if an object meets a condition, add the object to array
        // [product1, product2, product3]
        // [product1, product3]
        setCartProducts((cartProducts) =>
            cartProducts.filter((currentProduct) => {
                return currentProduct.id != id;
            })
        );
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id, allProducts);
            totalCost += productData.price * cartItem.quantity;
        });
        return totalCost;
    }

    function setProducts(list) {
        setAllProducts(list);
    }

    function setOrders(list) {
        setAllOrders(list);
    }

    const contextValue = {
        items: cartProducts,
        allProducts,
        allOrders,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        setProducts,
        setOrders
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export default CartProvider;

// CODE DOWN HERE

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context
