
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
                    <button id=${prod.id} class="addCart">Enviar a carrito</button>
                    <p class="displayCenter stock">StocK disponible: ${prod.stock}</p>
                </article>`
            }).join("")
    }
}



/* function to get input value and displaying products which matches with search */
function searchInput() {
    const input = document.querySelector("#search")
    const value = input.value.trim().toLowerCase()
    appProducts = products.filter(prod => prod.title.toLowerCase().includes(value))
    input.innerHTML = ""

    displayProducts()

}

/* functio to search products by brand name */
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

/* whith this function I make a copy of array appProducts and I create a new array ordered from lower price */
function LowerPrice() {
    let products2 = [...appProducts]
    const fromLowerPrice = []
    let lower;

    while (products2.length > 0) {
            for (let i = 0; i < products2.length; i++) {
            lower = products2[i].price;
                for (let j = 0; j < products2.length; j++) {
                    
                if (lower > products2[j].price) {
                    lower = products2[j].price
                }
            }
        }
       
        const product = products2.find(prod => prod.price === lower)
        fromLowerPrice.push(product)
        products2.splice(products2.indexOf(product), 1)
    }
    products2 = [...appProducts]
    console.log(products);
    console.log(products2);
    return fromLowerPrice
}

/* whith this function I make a copy of array appProducts and I create a new array ordered from higher price price */
function higherPrice() {
    let products3= [...appProducts]
    const fromHigherPrice = []
    let higher;

    while (products3.length > 0) {
            for (let i = 0; i < products3.length; i++) {
            higher = products3[i].price;
                for (let j = 0; j < products3.length; j++) {
                    
                if (higher < products3[j].price) {
                    higher = products3[j].price
                }
            }
        }
       
        const product = products3.find(prod => prod.price === higher)
        fromHigherPrice.push(product)
        products3.splice(products3.indexOf(product), 1)
    }
    products3 = [...appProducts]
    return fromHigherPrice
}


/* SEARCHING PRODUCTS IN A RANGE OF PRICE */
function rangePrices(t) {
    const value = t.value
    
    switch (value) {
        case "range1":
            productsByRange(0, 10000)
        break;
        case "range2":
            productsByRange(10000, 20000)
        break;
        case "range3":
            productsByRange(20000, 50000)
        break;
        case "range4":
            productsByRange(50000)
        break;
    }
}


function productsByRange(initial, final) {
    if (final) {
        appProducts = products.filter(prod => prod.price >= initial && prod.price <= final)
    } else
        appProducts = products.filter(prod => prod.price >= initial)
    displayProducts()
}

function resetSelect() {
    document.querySelector(".pricesForm").innerHTML = 
    `   
    <label for="prices">Precios:</label>
    <select name="prices" id="prices">
        <option value="">Elige una opción..</option>
        <option value="range1">Hata $10.000</option>
        <option value="range2">De $10.000 a $20.000</option>
        <option value="range3">De $20.000 a $50.000</option>
        <option value="range4">Mayor a $50.000</option>
    </select>
    `
}

/* function for addin one to one cart number */
function addCart(t) {
    const targetProduct = products.find(prod => prod.id == t.id)
    const divCart = document.querySelector(".cart span")
    const actualNumber = Number(divCart.innerHTML)
    
    if (targetProduct.stock >= 1) {
        divCart.innerHTML = actualNumber + 1
        targetProduct.stock = targetProduct.stock - 1
        displayProducts()
    } else {
        t.nextElementSibling.innerHTML = "Sin stock" 
    }
} 

    


