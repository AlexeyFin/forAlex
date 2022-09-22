class ViewManager {

    productManager;
    cartManager;
    role = 'admin';

    //Form
    addFormWrap = document.querySelector('.form-wrap');
    addForm = document.forms['addForm'];
    formTitle = this.addForm.elements['title'];
    formPrice = this.addForm.elements['price'];
    formNumber = this.addForm.elements['number'];
    formSubmit = this.addForm.querySelector('.submit-btn');

    // Products list
    productsList = document.querySelector('#productsList');


    // Cart

    cartModal = document.getElementById('CartModal');



    constructor(productManager, cartManager, role) {
        this.productManager = productManager;
        this.cartManager = cartManager;
        this.role = role || 'admin';
    }

    init() {
        this.events();
        const products = this.productManager.getProducts();
        products.forEach(product => {
            this.addProductToList(product)
        });
        if (this.role !== 'admin') {
            this.addFormWrap.classList.add('d-none')
        } else {
            this.addFormWrap.classList.remove('d-none')
        }
    }

    productTemplate(product) {
        return `
            <div class="col-4" data-product-id="${product.id}">
                <div class="card product-card" >
                <div class="card-header">
                    <h2>${product.title}</h2>
                </div>
                <div class="card-body">
                    <div class="img-wrap d-flex justify-content-center">
                        <img src="https://fakeimg.pl/150x150/ff0000/" alt="">
                    </div>
                    <ul class="characteristic mt-3">
                        <li>
                            <span class="key">Price</span>
                            <span class="value">${product.price}</span>
                        </li>
                        <li>
                            <span class="key">Count in stock</span>
                            <span class="value">${product.number}</span>
                        </li>
                    </ul>
                    <div class="actions d-flex justify-content-center mt-3">
                        <button type="button" class="btn btn-primary mx-1 ${this.role === 'consumer'? 'd-block' : 'd-none'}"
                            data-id="${product.id}"
                         data-event="addToCart"
                         >
                            Add to cart
                        </button>
                        
                        <button type="button"
                         class="btn btn-warning mx-1 ${this.role === 'admin'? 'd-block' : 'd-none'}"
                         data-id="${product.id}"
                         data-event="deleteProduct"
                         >
                            Delete
                        </button> 
                    </div>

                </div>
            </div>
            </div>
        `;
    }

    addProductToList(product) {
        this.productsList.insertAdjacentHTML('afterbegin', this.productTemplate(product));
    }

    resetForm() {
        this.addForm.reset();
    }

    events() {
        this.addForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const preProduct = {
                title: this.formTitle.value,
                price: this.formPrice.value,
                number: +this.formNumber.value || 10
            };
            if (!preProduct.title || !preProduct.number || !preProduct.price) {
                return false
            };

            const product = this.productManager.createProduct(preProduct);
            this.productManager.addProduct(product);
            this.productManager.saveProductsInStorage();
            this.addProductToList(product);
            this.resetForm();

        });

        this.productsList.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;
            const eventType = target.dataset['event'];
            if (eventType === 'addToCart' && this.role === 'consumer') {
                const productId = target.dataset['id']
                const product = this.productManager.getProduct(productId);

                this.cartManager.addProduct(product);
                this.cartManager.saveCartInStorage();

            }
        });

        this.cartModal.addEventListener('show.bs.modal', (event => {
            console.log('Modal window is opening');
        }))
        this.cartModal.addEventListener('shown.bs.modal', (event => {
            console.log('Modal window is opened');
        }))

    }


}
