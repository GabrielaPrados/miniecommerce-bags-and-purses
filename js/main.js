
document.addEventListener("click", e => {
    const t = e.target

    if (t.matches(".menu img")) {
        
        /* DISPLAY MENU => SHOWING FROM LEFT THE SEARCH BAR */
        const serachProducts = document.querySelector(".searchProducts")
        serachProducts.classList.toggle("sectionSearch")
        const form = document.querySelector("form")
        form.classList.toggle("displayBlock")
    }

    if (t.classList.contains("heart")) {
        t.nextElementSibling.classList.toggle("displayBlock")
    }

    if (t.classList.contains("redHeart")) {
        t.classList.toggle("displayBlock")
    }
})