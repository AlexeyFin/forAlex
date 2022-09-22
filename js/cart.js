class CartManager {

    products = []

    constructor() {
    }

    init() {
        this.products = JSON.parse(localStorage.getItem('cart')) || [];

    }

    setProducts(products) {
        this.products = products
    }

    addProduct(product) {

        if (!this.products.filter(item => item.id === product.id).length) {
            this.products.push(product);
        } else {
            console.log('Already in cart')
        }

    }

    saveCartInStorage() {
        localStorage.setItem('cart', JSON.stringify(this.products));
    }

    getPrice() {
        return this.products.reduce((prev, curr) => {
            return prev + +curr.price
        }, 0)
    }

    removeProduct(id) {
        this.products = this.products.filter(item => item.id !== id);
    }



}
