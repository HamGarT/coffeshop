const modalBuyWrapper = document.getElementById('c-products__modal');
const overlay = document.getElementById('overlay');

async function fetchData() {
    try {
        const response = await fetch("https://fake-coffee-api.vercel.app/api?limit=9");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const generateHTML = (data) => {
    const container = document.getElementById('c-products__coffee-list');
    container.innerHTML = '';

    data.forEach(item => {
        let image_url = item.image_url;
        let name = item.name;
        let price = item.price;
        let description = item.description;
        let region = item.region;
        let weight = item.weight;
        let flavors = item.flavor_profile;
        let grindOption = item.grind_option;


        const coffeeItemHtml = document.createElement('div');
        coffeeItemHtml.classList.add('coffee-item');

        const imgCoffeHtml = document.createElement('img');
        imgCoffeHtml.src = image_url;
        coffeeItemHtml.appendChild(imgCoffeHtml);

        const titleHtml = document.createElement('h3');
        titleHtml.textContent = name;
        coffeeItemHtml.appendChild(titleHtml);

        const priceHtml = document.createElement('span');
        priceHtml.textContent = `S/.${price}`;
        coffeeItemHtml.appendChild(priceHtml);
        container.appendChild(coffeeItemHtml);


        coffeeItemHtml.addEventListener("click", () => {
            modalBuyWrapper.innerHTML = modalBuyHtml({
                image_url,
                name,
                price,
                description,
                region,
                weight,
                flavors,
                grindOption,
            });
            modalBuyWrapper.style.display = "flex";
            overlay.classList.add('show');
        })
    });
}
overlay.addEventListener('click', () => {
    modalBuyWrapper.style.display = 'none';
    overlay.classList.remove('show');
});


const modalBuyHtml = (content) => {
    return (
        `
            <div class="c-products__images-wrapper">
                <div class="image">
                    <img src="${content.image_url}" alt="" srcset="">
                </div>
                <h4>Ultimos vistos</h4>
                <div class="c-products__lastly-viewed">
                    <div class="c-products__lastly-viewed-item">
                        <img src="https://iili.io/H8Y7lpV.webp" alt="" srcset="">
                        <div>
                            <span>Breezy Beans</span>
                            <span>S/.12</span>
                        </div>
                    </div>
                    <div class="c-products__lastly-viewed-item">
                        <img src="https://iili.io/H8Y7wYv.webp" alt="" srcset="">
                        <div>
                            <span>Indo-Viet Roast</span>
                            <span>S/.13.99</span>
                        </div>
                    </div>
                    <div class="c-products__lastly-viewed-item">
                        <img src="https://iili.io/H8Y7VCF.webp" alt="" srcset="">
                        <div>
                            <span>Ethiopian Yirgacheffe</span>
                            <span>S/.12.99</span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="c-products__info-wrapper">
                <h3>${content.name}</h3>
                <div class="c-products__stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <p>${content.description}</p>
                <span>S/.${content.price}</span>
                <div class="c-products__product-details">
                    <div class="accordion c-products__acordion" id="accordionExample">
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              Regiòn y peso
                            </button>
                          </h2>
                          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                             <ul>
                                    <li>${content.region}</li>
                                    <li>${content.weight} gr</li>
                             </ul>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                              Perfil de sabores
                            </button>
                          </h2>
                          <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                              <ul>
                              ${content.flavors.map((item) => `<li>${item}</li>`).join('')}
                             </ul>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                              Opciones de preparaciòn
                            </button>
                          </h2>
                          <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                            ${content.grindOption.map((item) => `<li>${item}</li>`).join('')}
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
                <div class="c-products__buttons">
                    <button class="c-products__button-item">Comprar ahora</button>
                    <button class="c-products__button-item c-products__button-item--black">Añadir carrito</button>
                </div>
            </div>
        `
    )
}

fetchData().then(data => {
    generateHTML(data);
});