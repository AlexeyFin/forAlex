class PubManager {

    //DOM
    searchForm = document.forms['searchForm'];
    menu = document.getElementById('menu-list');

    //Props
    apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

    cocktails = [];

    constructor() {
    }

    init() {
        this.events();

        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(response => response.json())
            .then(json => console.log(json))

    }

    searchForCocktail(query) {
        fetch(`${this.apiUrl}/search.php?s=${query}`, {
            method: 'GET'
        })
            .then(resp => resp.json())
            .then(resp => {
                this.cocktails = resp.drinks;
                this.generateList()
            })

    }

    events() {
        this.searchForm.addEventListener('submit', event => {
            event.preventDefault();

            const query = this.searchForm.elements['search'].value;
            this.searchForCocktail(query)

        })
    }

    getCocktailTemplate(cocktail) {
        return `
            <div class="col-6">
                <div class="card">
                    <div class="card-header">
                        ${cocktail.strDrink}
                    </div>
                </div>
            </div>        
        `
    };

    addCocktail(cocktail) {
        this.menu.insertAdjacentHTML('afterbegin', this.getCocktailTemplate(cocktail))
    }

    generateList() {
        this.cocktails.forEach(cocktail => {
            this.addCocktail(cocktail)
        })
    }


}
