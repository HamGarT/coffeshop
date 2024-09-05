async function fetchData() {
    try {
        const response = await fetch("https://fake-coffee-api.vercel.app/api?limit=9");
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function generateHTML(data) {
    const container = document.getElementById('coffee-list'); 
    container.innerHTML = '';

    data.forEach(item => {
        
        const coffeeItem = document.createElement('div');
        coffeeItem.classList.add('coffee-item');

        const imgCoffe = document.createElement('img');
        imgCoffe.src = item.image_url;
        coffeeItem.appendChild(imgCoffe);
       
        const title = document.createElement('h3');
        title.textContent = item.name; 
        coffeeItem.appendChild(title);

        const price = document.createElement('span');
        price.textContent = `S/.${item.price}`; 
        coffeeItem.appendChild(price);

        container.appendChild(coffeeItem);
        coffeeItem.addEventListener("click", ()=>{
            alert("COMPRAR: "+item.name);
        })
    });
}

fetchData().then(data => {
    generateHTML(data);
});