
let appProducts = products
// const { img, brand, title, description, price } = appProducts

/* function for creating buttons Brands */
function displayBrands() {
    const brands = ["Todas", ...new Set(appProducts.map(prodBrand => prodBrand = prodBrand.brand))]
    const divBrands = document.querySelector("div.brands")
    divBrands.innerHTML = brands.map(elem => elem = `<button id="${elem.split(' ').join('')}" class="brandButton ">${elem}</button>`).join("")
}


/* function which create the articles containing products and displaing them */
function displayProducts() {
    const divBagsCards = document.querySelector(".bagsCards")
    const input = document.querySelector("#search")
    if (appProducts.length === 0) {
        divBagsCards.innerHTML=""
        const div = document.createElement("div")
        div.innerHTML = `Su búsqueda no arroja resultados. 
                         Por favor vuelva a intentar`
        div.classList.add("notSerachingFound")
        div.classList.add("displayCenter")
        divBagsCards.insertAdjacentElement("afterbegin", div)
        input.value = ""
        setTimeout(() => {
            divBagsCards.removeChild(div)
            appProducts = products
            displayProducts()
        },4000)
    }
    else {
           
        divBagsCards.innerHTML =  appProducts.map(prod => {
            
            return `
                <article>   
                    <header>
                        <h2>${prod.title}</h2>
                        <h2 class="brandName">${prod.brand}</h2>
                    </header>
                    <main class="displayCenter">
                        <div >
                            <img src="${prod.img}" alt="${prod.title}">
                        </div>
                        <img src="imgs/heart.png" alt="corazon tranparente" class="heart">
                        <img src="imgs/redHeart.png" alt="corazon rojo" class="redHeart">
                    </main>
                    <footer>
                        <h3>$${new Intl.NumberFormat('de-DE').format(prod.price)}</h3>
                        <h4>${prod.delivery}</h4>
                        <div class="displayCenter">
                            <p>${prod.description}</p>
                        </div>
                    </footer>
                    <button>Enviar a carrito</button>
                    <p class="displayCenter stock">StocK disponoble: ${prod.stock}</p>
                </article>`
            }).join("")
    }
}



/* function to get input value and displaing products which matches with search */
function searchInput() {
    const input = document.querySelector("#search")
    const value = input.value.trim().toLowerCase()
    appProducts = products.filter(prod => prod.title.toLowerCase().includes(value))
    input.innerHTML = ""

    displayProducts()

}
function searchButton(t) {
    
    if (t.matches("#Todas")) {
        appProducts = products
        displayProducts()
    } else {
        console.log(appProducts);
        appProducts = products.filter(elem =>  elem.brand.split(' ').join('') === t.id)
        displayProducts()
    }
    
}