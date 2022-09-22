class ProductManager {

    products = [];

    constructor() {
    }

    init() {
        this.products = JSON.parse(localStorage.getItem('products')) || [];
    }

    getProducts() {
        return this.products
    }

    getProduct(id) {
        return this.products.filter(product => product.id === id)[0];
    }

    addProduct(product) {
        this.products.unshift(product)
    }

    deleteProduct(id) {
        this.products = this.products.filter((product) => {
            // if product.id равен переданному id мы удаляем его из массива продуктов
            return product.id !== id
        });
    }

    saveProductsInStorage() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    createProduct(preProduct) {
        return {
            id: this.generateId(),
            ...preProduct
        }
    }

    generateId() {

        let id = '';
        let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        for (let i = 0; i < 15; i++) {
            let position = Math.floor(Math.random() * words.length);
            id += words[position];
        }
        return id;
    }


}
