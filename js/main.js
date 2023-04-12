/* --------------------------------------------------DOMCONTENTLOADED--------------------------------------------------------- */

window.addEventListener("DOMContentLoaded", () => { 
    /* dislplay brnads , products and resetting local storage */
    displayBrands() 
    displayProducts()
    localStorage.clear() /* this is optional */
    console.dir(document.querySelectorAll(".bagsImgs"));
})

/* --------------------------------------------------CLICK--------------------------------------------------------- */

document.addEventListener("click", e => {
    const t = e.target

    if (t.matches(".menu img")) {
        
        /* DISPLAY MENU => SHOWING SEARCH BAR FROM LEFT  */
        const serachProducts = document.querySelector(".searchProducts")
        serachProducts.classList.toggle("sectionSearch")
        const form = document.querySelector("form")
        const divBrands = document.querySelector(".brands")
        form.classList.toggle("displayBlock")
        divBrands.classList.toggle("displayBlock")
    }
     
    /* SHOWING RED HART */
    if (t.classList.contains("heart")) {
        console.log("ok");
        t.nextElementSibling.classList.toggle("displayBlock")
    }
    /* HIDDEING RED HART  */
    if (t.classList.contains("redHeart")) {
        t.classList.toggle("displayBlock")
    }
    
     /* SEARCH BY BRAND NAME AND RESETTING SELECT */
    if (t.matches(".brands button")) {
        searchButton(t) /* this function contains displayProducts() */
        resetSelect()
    }
    
     /* DISPLAYING PRODUCTS FROM LOWER PRICE  */
    if (t.classList.contains("lowerPrice")) {
        appProducts = LowerPrice()
        displayProducts()
    }

    /* DISPLAYING PRODUCTS FROM HIGHER PRICE  */
    if (t.classList.contains("higherPrice")) {
        appProducts = higherPrice()
        displayProducts()
        console.log("ok");
    }
    
    /* event for:
    1- add one to cart number 
    2 - substract one to stock 
    3- if stock is === 0 => no stock
    4- Adding selected product to shopping cart */
    if (t.classList.contains("addCart")) {
        addCart(t)  /* this function contains displayProducts() */
        addingProductToCart(t) /* THIS FUNCTION CONTAINS shoppingsNumber() */
    }


    /* EVENT FOR SHOWING CART */
    if (t.matches("#cartImg")) {
        
        const sectionCart = document.querySelector(".sectionCart")
        sectionCart.classList.remove("hide")
        sectionCart.classList.remove("withoutHeight")
        sectionCart.classList.add("height")
    }

    /* EVENT FOR HIDEING CART */
    if (t.matches("#close")) {
        backToProducts()
    }

    /* ADDING A PRODUCT FROM "+" SPAN AT CART*/
    if (t.classList.contains("addingSpan")) {
        addingFromCart(t)
    }

    /* SUBTRACTING A PRODUCT FROM "-" SPAN AT CART*/
    if (t.classList.contains("substractingSpan")) {
        substractingFromCart(t)
    }

    /* delete product from button "eliminar". Cart */
    if (t.classList.contains("deleteBtn")) {
        deleteProduct(t)
    }
    
    /* This event hides cart */
    if (t.matches("#backToProducts")) {
        backToProducts()
    }

    /* Event for deletting all products at once */
    if (t.matches("#deleteCart")) {
        deleteAllProducts(t)
    }
})

/* --------------------------------------------------CHANGE--------------------------------------------------------- */

document.addEventListener("change", e => {
      const t = e.target  

     /* SEARCHING PRODUCTS WITH A RANGE OF PRICE */
    if (t.matches("#prices")) {
        rangePrices(t) /* this function contains productsByRange() and this one contains displayProducts() */
    }
})

/* --------------------------------------------------SUBMIT--------------------------------------------------------- */

/* THIS EVENT IS FOR SEARCHING PRODUCTS AND DISPLAYING THEM  */
document.querySelector("#searchBrand").addEventListener("submit", e => {
    e.preventDefault()
    searchInput() /* this function contains displayProducts() */
    resetSelect()
})

