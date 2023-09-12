import { letter_Gallery } from "../js/export.js"
import { modal_Gallery } from "../js/export.js"


async function merchandiseFetch() {
    const URL = 'https://localhost:7280/api/v1/Mercaderia/';
    try {
        const response = await fetch(URL, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Merchandise information could not be obtained');
        }
        const data = await response.json();
        renderMerchandise(data)
    } catch (error) {
        console.error('Error obtaining merchandise data', error);
    }
}


async function renderMerchandise(Merchandise) {
    const listMerchandise = document.getElementById('body-gallery-merchandise');
    const totalItems = 4;
    const incrementBy = 5;
    let itemCount = 0;
    for (let i = 0; i < totalItems; i++) {
        const a = `li-${i}`;
        const li = document.getElementById(a);
        const itemCountLimit = itemCount + incrementBy;
        const div = document.createElement('div');
        div.classList.add('letter-container');
        while (itemCount < itemCountLimit) {
            const item = await letterSlider(Merchandise, itemCount);
            div.appendChild(item);
            itemCount++;
        }
        li.appendChild(div);
        listMerchandise.appendChild(li);
    }
}

 async function letterSlider(Merchandise, itemCount) {
    const item = document.createElement('div');
    item.classList.add('letter-gallery');
    item.style.backgroundImage = `url('${Merchandise[itemCount].imagen}')`;
    item.innerHTML += letter_Gallery(Merchandise, itemCount);
    const mer = Merchandise[itemCount];
    const button = item.querySelector(`#button-gallery-${itemCount}`);
    button.addEventListener('click', () => {
        generateMerchandiseModal(mer.id);
    });
    return item
}

export async function generateMerchandiseModal(ID) {
    const URL = 'https://localhost:7280/api/v1/Mercaderia/';
    try {
        const response = await fetch(`${URL}${ID}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Merchandise information could not be obtained');
        }
        const data = await response.json();
        const modalContainer = document.createElement("div");
        modalContainer.classList.add("modal-container");
        modalContainer.innerHTML += modal_Gallery(data);
        document.body.append(modalContainer);
        document.querySelector('.close-gallery').addEventListener('click', () => {
            modalContainer.remove();
        });
    } catch (error) {
        console.error('Error obtaining merchandise data', error);
    }
}

const imgItems = $('.slider li').length;
let imgPos = 1;
for (var i = 1; i <= imgItems; i++) {
    $('.pagination').append('<li><span class="fa fa-circle"></span></li>');
}

$('.slider li').hide();
$('.slider li:first').show();
$('.pagination li:first').css({ 'color': '#CD6E2E' });

$('.pagination li').click(pagination);
$('.right span').click(nextSlider);
$('.left span').click(prevSlider);

setInterval(() => {
    nextSlider();
}, 10000);

function pagination() {
    const paginationPos = $(this).index() + 1;

    $('.slider li').hide()
    $(`.slider li:nth-child(${paginationPos})`).fadeIn();

    $('.pagination li').css({ 'color': '#858585' });
    $(this).css({ 'color': '#CD6E2E' });

    imgPos = paginationPos;
}

function nextSlider() {
    if (imgPos >= imgItems) { imgPos = 1; }
    else { imgPos++; }

    $('.pagination li').css({ 'color': '#858585' });
    $(`.pagination li:nth-child(${imgPos})`).css({ 'color': '#CD6E2E' });

    $('.slider li').hide();
    $(`.slider li:nth-child(${imgPos})`).fadeIn();

}

function prevSlider() {
    if (imgPos <= 1) { imgPos = imgItems; }
    else { imgPos--; }

    $('.pagination li').css({ 'color': '#858585' });
    $(`.pagination li:nth-child(${imgPos})`).css({ 'color': '#CD6E2E' });

    $('.slider li').hide();
    $(`.slider li:nth-child(${imgPos})`).fadeIn();
}


merchandiseFetch()
