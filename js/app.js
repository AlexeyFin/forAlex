
const productsManager = new ProductManager();
productsManager.init();

const cartManager = new CartManager();
cartManager.init();

const view = new ViewManager(productsManager, cartManager,'admin');
view.init();
