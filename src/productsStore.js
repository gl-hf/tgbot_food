function getProductData(id, productsArray) {
    let productData = productsArray.find((product) => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { getProductData };
