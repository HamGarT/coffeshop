const container = document.getElementById('c-products__coffee-list');
const getRandomSizeClass = () => {
    const sizes = ['small', 'small-medium', 'medium', 'large'];
    if(window.innerWidth < 520){
        return "small"
    }
    return sizes[Math.floor(Math.random() * sizes.length)];
};
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

const itemMenu = (content) => {
    return (
        `<div class="c-products__coffee-item-list ${getRandomSizeClass()}">
            <img src="${content.image}" alt="" srcset="">
            <div class="c-products__info-item">
                <h3>${content.title}</h3>
                <p>S/.${content.precio}<span></span></p>
            </div>
        </div>`
    );
}

const swiper = new Swiper('.swiper', {

    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        // when window width is >= 640px
        720: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        1600: {
            slidesPerView: 4,
            spaceBetween: 20
        }
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});