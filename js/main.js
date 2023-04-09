
window.addEventListener("DOMContentLoaded", () => { 
displayBrands()
    displayProducts()
    localStorage.clear()
})

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
    
     /* SEARCH BY BRAND NAME  */
    if (t.matches(".brands button")) {
        searchButton(t)
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
        addCart(t)
        addingProductToCart(t)
         
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
        
        const sectionCart = document.querySelector(".sectionCart")
        sectionCart.classList.remove("height")
        sectionCart.classList.add("withoutHeight")
        sectionCart.classList.add("hide")
    }
})

document.addEventListener("change", e => {
      const t = e.target  

     /* SEARCHING PRODUCTS IN A RANGE OF PRICE */
    if (t.matches("#prices")) {
        rangePrices(t)
    }
})

/* THIS EVENT IS FOR SEARCHING PRODUCTS AND DISPLAYING THEM  */
document.querySelector("#searchBrand").addEventListener("submit", e => {
    e.preventDefault()
    searchInput()
    resetSelect()
})

