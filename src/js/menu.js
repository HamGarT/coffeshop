const container = document.getElementById('c-products__coffee-list');

fetch('../src/data/menu.json')
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(coffee => {
    console.log(coffee);
    coffee.forEach(coffee => {
        container.innerHTML += itemMenu(coffee
        );
    });
})

const itemMenu=(content)=>{
    return(
        `<div class="c-products__coffee-item-list">
            <img src="${content.image}" alt="" srcset="">
            <div>
                <h3>${content.title}</h3>
                <p>S/.${content.precio}<span></span></p>
            </div>
        </div>`
    );
}