
window.addEventListener("DOMContentLoaded", () => {
    
displayBrands()
displayProducts()

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

    if (t.matches(".brands button")) {
        console.log(t.id)
        searchButton(t)
    }
})


document.querySelector("#searchBrand").addEventListener("submit", e => {
    e.preventDefault()
    searchInput()
})