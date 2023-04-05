
let appProducts = products
const { img, brand, title, description, price } = appProducts


function displayProducts() {
    appProducts =  appProducts.map(prod => {
    
        return `
    <article>   
        <header>
            <h2>${prod.title}</h2>
        </header>
        <main class="displayCenter">
            <div >
                <img src="${prod.img}" alt="${prod.title}">
            </div>
            <img src="imgs/heart.png" alt="corazon tranparente" class="heart">
            <img src="imgs/redHeart.png" alt="corazon rojo" class="redHeart">
        </main>
        <footer>
            <h3>$${prod.price}</h3>
            <h4>Envío gratis</h4>
            <div class="displayCenter">
                <p>${prod.description}</p>
            </div>
        </footer>
        <button>Enviar a carrito</button>
    </article>`
    })
    
    appProducts.forEach(article => {
    const divBagsCards = document.querySelector(".bagsCards")
    divBagsCards.innerHTML += article
   })
}

displayProducts()

