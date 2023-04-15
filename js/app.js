/* VARIABLES */
let appProducts = products

/* function for creating buttons Brands */
function displayBrands() {
    const brands = ["Todas", ...new Set(appProducts.map(prodBrand => prodBrand = prodBrand.brand))]
    const divBrands = document.querySelector("div.brands") /* section to display products and nav (contains div.nav and div.bagsCard*/
    divBrands.innerHTML = brands.map(elem => elem = `<button id="${elem.split(' ').join('')}" class="brandButton ">${elem}</button>`).join("")
}

/* function which create the articles containing products and displaying them */
function displayProducts() {
    const divBagsCards = document.querySelector(".bagsCards")/* div to display articles with products */
    const input = document.querySelector("#search") /* input for searching */
    /* if searching doesn´t droap any result, create an advising span an delet the span after 4 seconds*/
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
        divBagsCards.innerHTML = appProducts.map(prod => {
            return `
                <article>   
                    <header>
                        <h2>${prod.title}</h2>
                        <h2 class="brandName">${prod.brand}</h2>
                    </header>
                    <main class="displayCenter">
                        <div >
                            <img src="${prod.img}" alt="${prod.title}" class="bagsImgs">
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
                    <p id="disponibleStocK${prod.id}" class="displayCenter stock">StocK disponible:  ${prod.stock}</p>
                </article>`
        }).join("")
        
    }
    
}


/* -------------------------------------------------DIV.SEARCHPRODUCT---------------------------------------------------------------------------- */

/* function to get input value and displaying products which matches with search */
function searchInput() {
    const input = document.querySelector("#search")/* input for searching */
    const value = input.value.trim().toLowerCase()
    appProducts = products.filter(prod => prod.title.toLowerCase().includes(value))
    input.innerHTML = ""

    displayProducts()
}

/* function to search products by brand name (buttons under search) */
function searchButton(t) {
    
    if (t.matches("#Todas")) {
        appProducts = products
        displayProducts()
    } else {
        appProducts = products.filter(elem =>  elem.brand.split(' ').join('') === t.id)
        displayProducts()
    }
}

/* ----------------------------------------------------DIV.NAV------------------------------------------------------ */

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

/* getting product from select => getting product by range */
function productsByRange(initial, final) {

    if (final) {
        appProducts = products.filter(prod => prod.price >= initial && prod.price <= final)
    } else
        appProducts = products.filter(prod => prod.price >= initial)
    
    displayProducts()
}

/* function to reset select */
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

/* --------------------------------------------------------CART---------------------------------------------------------------------- */

/* function to creat article for cart and addin it before delivery Node*/
function creatShoppingArticle(targetProduct, targetProductID) {
    
    const reference = document.getElementById("deliver") /* article for delivery price (index) */
    const { id, img, brand, title, description, price, stock } = targetProduct
    const article = document.createElement("article")
    article.classList.add("cartArticle")
    article.id = `article${targetProductID}`
    article.innerHTML =
    `
            <div  class="displayCenter">
                <div class="description displayCenter">
                    <img src="${img}" alt="${description}">
                    <div>
                        <h2>${title} - ${brand}</h2>
                        <p>${description}</p>
                    </div>
                </div>
                <div class="addSubstract displayCenter">
                    <div class="displayCenter"><span id="substractingSpan.${id}" class=  "substractingSpan">-</span><span id="span.${id}" class = "numberSpan">0</span><span id="addingSpan.${id}" class="addingSpan">+</span></div>
                    <p ><span id="prodStock${id}" class="prodStockSpan">${stock}</span> disponibles</p>
                </div>
                <p id="prodPrice${id}" class = "totalPrice" ></p>
            </div>
            <button id="delete.${id}" class = "deleteBtn">Eliminar</button>
    `
    reference.insertAdjacentElement("beforebegin", article)
}

/* DELIVERY CART AND FINAL PRICE */

function setDeliverPrice(subTotal) {
    const deliverPrice = document.querySelector("#deliverPrice")

    if (subTotal > 10000 ) {
        deliverPrice.innerHTML = 0
    }else{deliverPrice.innerHTML = new Intl.NumberFormat('de-DE').format(1000)}
}

function finalPrice() {
    const finalPriceP = document.querySelector("#finalPrice")/* p at cart which contains final price (index) */
    const totalPriceProduct = document.querySelectorAll(".totalPrice") /* p at cart which contains final price beside - 0 +*/
    const delivery = document.querySelector("#deliverPrice")/* p at cart which contains delivery price (index) */
    let subTotal = 0
    const deliveryPrice = Number(delivery.innerHTML.replace(/[$.]/g, ""))
    if (totalPriceProduct) {
        totalPriceProduct.forEach(fp => {
        const priceFP = Number(fp.innerHTML.replace(/[$.]/g, ""))
            subTotal += priceFP     
    }) 
    }
    finalPriceP.innerHTML = new Intl.NumberFormat('de-DE').format(subTotal + deliveryPrice)
}


/* -----------------------------------------------ADDING PRODUCTS------------------------------------------------------------------ */

/* whith this function I add the product to shopping cart when click is on buying button article */
function addingProductToCart(t) {
    
    const targetProduct = products.find(prod => prod.id == t.id)
    const targetProductID = targetProduct.id
    
    if ( localStorage.getItem(`product${targetProductID}`)) {
        shoppingsNumber(t)
    } else {
        localStorage.setItem(`product${targetProductID}`, targetProduct.id)
        creatShoppingArticle(targetProduct, targetProductID)
        shoppingsNumber(t)
    }

    finalPrice()
}

/* function for adding one to cart number */
function addCart(t, param) {
    
    t ? param = t.id : param = param;
    console.log(param);
    const targetProduct = products.find(prod => prod.id == param)
    const divCart = document.querySelector(".cart span")/* span beside cart img */
    const actualNumber = Number(divCart.innerHTML)
    const disponibleStock = document.querySelectorAll(".stock") /* p in cards. It contains actuan stock (color green) */
    const stockCart = document.querySelectorAll(".prodStockSpan") /* p in CARTS. It contains actuan stock (color tranparent red) under - 0 +*/
    
    if (targetProduct.stock >= 1) {
        divCart.innerHTML = actualNumber + 1
        if (t) targetProduct.stock = targetProduct.stock - 1
        
        disponibleStock[param-1].innerHTML = `Stock disponible: ${targetProduct.stock}`
        
    } else {
        t.nextElementSibling.innerHTML = "Sin stock" 
    }
    
    /*adding article stock */
    if (stockCart[param - 1] ) {
        console.log(stockCart);
        console.log(stockCart[param - 1]);
        stockCart[param-1].innerHTML = targetProduct.stock
    }
} 



/* Accing products to cart. Steps: */
function shoppingsNumber(t, param) {
    t ? param = t.id : param = param;
    const targetProduct = products.find(prod => prod.id == param)
    const spans = document.querySelectorAll(".numberSpan") /* cart span => - 0 + => numbers span */
    const totalPrice = document.querySelectorAll(".totalPrice") /* at carat beside - 0 + => total price product */
    const deliverPrice = document.querySelector("#deliverPrice") /* at cart */
    let subTotal = 0
    
    /* 1- gettin span to add a 1 */

    if (spans[param - 1]) {
        const actualNumber = Number( spans[param - 1].innerHTML)
        spans[param - 1].innerHTML = actualNumber + 1
    }


    /* 2- add price of the same product */
    totalPrice.forEach(tp => {
        if (tp.id.includes(param)) {
            const actualNumber = Number(tp.innerHTML.replace(/[$.]/g, ""))
            const total = actualNumber + targetProduct.price
            tp.innerHTML = `$${new Intl.NumberFormat('de-DE').format(total)}`
        }
    }) 
    
    /* 3- gettin all products subtotal  */
    totalPrice.forEach(fp => {
        const priceFP = Number(fp.innerHTML.replace(/[$.]/g, ""))
        subTotal += priceFP
    }) 
    
    /* 4- if subtotal is grater than 10.000 => delivery is free */
    setDeliverPrice(subTotal)

    finalPrice()
}

/* this function is for adding products from cards => - 0 + */
function addingFromCart(t) { 
    const id = t.id.split(".")[1]
    const targetProduct = products.find(prod => prod.id == id)
    const actualStock = document.querySelectorAll(`.prodStockSpan`) /* p in CARTS. It contains actuan stock (color red) under - 0 + */
    targetProduct.stock = targetProduct.stock - 1

    actualStock[id - 1].innerHTML = targetProduct.stock
    
    shoppingsNumber(null, id)  
    addCart(null, id)
    finalPrice()
}


/* -----------------------------------------------SUBSTRACTING PRODUCTS------------------------------------------------------------------ */

/* this function is for substracting products from cards => - 0 + */
function substractingFromCart(t) {
    const id = t.id.split(".")[1]
    const targetProduct = products.find(prod => prod.id == id)
    const actualStock = document.querySelectorAll(`.prodStockSpan`) /* p in CARTS. It contains actuan stock (color tranparent red) under - 0 + */
    const spans = document.querySelectorAll(".numberSpan") /* cart span => - 0 + => numbers span */
    const cartArticles = document.querySelectorAll(".cartArticle") /* article created at creatShoppingArticle(). CARDS */
    targetProduct.stock = targetProduct.stock + 1
    
    actualStock[id - 1].innerHTML = targetProduct.stock

    spans.forEach(sp => {
        if (sp.id.includes(id)) {
            const actualNumber = sp.innerHTML
            if (actualNumber > 1) {
                sp.innerHTML = actualNumber - 1
            } else {
                const parentNode = document.querySelector(".divCart") /* contaainer for adding products at Cart => product, delivery and total price (index)*/
                cartArticles.forEach(ca => {
                    if (ca.id.includes(id)) {
                        parentNode.removeChild(ca)
                        localStorage.removeItem(`product${id}`)
                 }
             })
            }
        }
    })
    substractPrice(id)
    substractCart()
    substractDisponibiliy(id, targetProduct)
    finalPrice()

}

/* function to substract price to total Product price  */
function substractPrice(id) {
    const targetProduct = products.find(prod => prod.id == id)
    const ProductTotalPrice = document.querySelectorAll(".totalPrice") /* at carat beside - 0 + => total price product */
   
    ProductTotalPrice.forEach(tp => {
        if (tp.id.includes(id)) {
            const actualNumber = Number(tp.innerHTML.replace(/[$.]/g, ""))
            const total = actualNumber - targetProduct.price
            tp.innerHTML = `$${new Intl.NumberFormat('de-DE').format(total)}`
        }
    }) 
}

/* function to substract one to cart span beside cart img */
function substractCart() {
    const divCart = document.querySelector(".cart span")/* span beside cart img */
    const actualNumber = Number(divCart.innerHTML)
    divCart.innerHTML = actualNumber - 1
} 

/* function to substract disponibility at cards (green p at card bottom) */
function substractDisponibiliy(id, prod) {
    const disponibleStock = document.querySelectorAll(".stock") /* p in cards. It contains actuan stock (color green) */
    disponibleStock[id-1].innerHTML = `Stock disponible: ${prod.stock}`
}

/* -----------------------------------------------------------CART BUTTONS----------------------------------------------------------- */

/* BUTTON "ELIMINAR" */
function deleteProduct(t) {
    const id = t.id.split(".")[1]
    const targetProduct = products.find(prod => prod.id == id)
    const cartArticles = document.querySelectorAll(".cartArticle")/* article created at creatShoppingArticle(). CARDS */
    const parentNode = document.querySelector(".divCart") /* container for adding products at Cart => product, delivery and total price (index)*/
    const cartNumber = document.querySelector(".cart span")/* span beside cart img */
    const actualSpanNumber = Number(cartNumber.innerHTML)
    let prodcutNumber;

    cartArticles.forEach(ca => {
        if (ca.id.includes(id)) {
            const spans = document.querySelectorAll(".numberSpan")/* cart span => - 0 + => numbers span */
            const disponibleStock = document.querySelectorAll(".stock")/* p in cards. It contains actuan stock (color green) */
            spans.forEach(span => {
                if (span.id.includes(id)) prodcutNumber = Number(span.innerHTML)
               
                cartNumber.innerHTML = actualSpanNumber - prodcutNumber
            } )
            parentNode.removeChild(ca)
            localStorage.removeItem(`product${id}`)
            
            targetProduct.stock = targetProduct.stock + prodcutNumber
            
            disponibleStock.forEach(ds => {
                        if (ds.id.includes(id)) {
                            ds.innerHTML = `Stock disponible: ${targetProduct.stock}` 
                        }
                    })
            finalPrice()
        }
    })
}

/* BUTTON "CONTINUAR COMPRANDO" */
function backToProducts() {
    const sectionCart = document.querySelector(".sectionCart") /* CART */
    sectionCart.classList.remove("height")
    sectionCart.classList.add("withoutHeight")
    sectionCart.classList.add("hide")
}

/* BUTTON "BORRAR TODO" */
function deleteAllProducts() {
    const disponibleStock = document.querySelectorAll(".stock")/* p in cards. It contains actuan stock (color green) */
    const cartArticles = document.querySelectorAll(".cartArticle")/* article created at creatShoppingArticle(). CARDS */
    const parentNode = document.querySelector(".divCart") /* container for adding products at Cart => product, delivery and total price (index)*/
    const cartNumber = document.querySelector(".cart span") /* span beside cart img */
    const actualSpanNumber = Number(cartNumber.innerHTML)
    let productsNumber = 0

    const spans = document.querySelectorAll(".numberSpan")/* cart span => - 0 + => numbers span */
    spans.forEach(span => {
        const spanNumber = Number(span.innerHTML)
        productsNumber += spanNumber
    })

    cartNumber.innerHTML = actualSpanNumber - productsNumber
    
    cartArticles.forEach(ca => {
        parentNode.removeChild(ca)
        console.dir(ca)
        const id = ca.childNodes[3].id.split(".")[1]
        const targetProduct = products.find(prod => prod.id == id)
        spans.forEach(span => {
            if (span.id.includes(id)) {
                const spanNumber = Number(span.innerHTML)
                targetProduct.stock = targetProduct.stock + spanNumber
                disponibleStock.forEach(ds => {
                    if (ds.id.includes(id)) {
                        ds.innerHTML = `Stock disponible: ${targetProduct.stock}`
                    }
                })
                
            }
        })

        localStorage.clear()
        finalPrice()
        setTimeout(() => {
            backToProducts()
        }, 2000);
    }) 
}
 