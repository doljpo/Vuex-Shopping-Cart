/**
 * Mocking client-server processing
 */
const _products = [
    {
        "id": 1,
        "title": "Apple iPad 10.2-inch Tablet",
        "price": 429.00,
        "inventory": 2,
        "image": "https://i.ebayimg.com/images/g/f~kAAOSwhw5evudj/s-l1600.jpg",
        "description": "An Apple iPad."
    },
    {
        "id": 2,
        "title": "NASA Official Logo Blaco T-Shirt",
        "price": 9.99,
        "inventory": 10,
        "image": "https://cdn.shopify.com/s/files/1/1557/3797/products/n1_345x.png?v=1502392177",
        "description": "A black t-shirt."
    },
    {
        "id": 3,
        "title": "Samsung S10 128GB 6.1-inch",
        "price": 478.00,
        "inventory": 5,
        "image": "https://i.ebayimg.com/images/g/BfUAAOSwvXNeoqXx/s-l1600.png",
        "description": "A Samsung smartphone."
    }
]

export default {
    getProducts(cb) {
        setTimeout(() => cb(_products), 1500)
    },

    buyProducts(products, cb, errorCb) {
        setTimeout(() => {
            // simulate random checkout failure.
            (Math.random() > 0.5 || navigator.webdriver)
                ? cb()
                : errorCb()
        }, 100)
    }
}