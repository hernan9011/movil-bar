import { letter_Merchandise } from "../js/export-bar.js"
import { modal_Gallery } from "../js/export-bar.js"


export async function renderMerchandise(name) {
    try {
        const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
        const response = await fetch(`${API_URL}?s=${name}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Error obtaining Merchandise');
        }
        const Merchandise = await response.json();
        const listMerchandise = $('#body-merchandise').empty();
        const incrementBy = 9;
        let itemCount = 0;
        const totalPag = Math.ceil(Merchandise.drinks.length / incrementBy);
        for (let i = 0; i < totalPag; i++) {
            const divMayor = $('<ul>').attr('id', `pag-${i}`).addClass('slider-one');
            listMerchandise.append(divMayor);
            const itemCountLimit = Math.min(itemCount + incrementBy, Merchandise.drinks.length);
            for (; itemCount < itemCountLimit; itemCount++) {
                const letter = createMerchantLetter(Merchandise.drinks[itemCount]);
                divMayor.append(letter);
            }
        }
        NumeroDePag();
    } catch (error) {
        console.error(error.message);
    }
}


function createMerchantLetter(Merchandise) {
    const letter = document.createElement('li');
    const idDrink = Merchandise.idDrink;
    letter.id = `Merchandise-${idDrink}`;
    letter.classList.add('letter-merchandise');
    letter.innerHTML = letter_Merchandise(Merchandise);
    const buttonMas = letter.querySelector(`#button-info-${idDrink}`);
    buttonMas.addEventListener('click', () => {  generateMerchandiseModal(idDrink); });
    const button = letter.querySelector(`#button-${idDrink}`);
    button.addEventListener('click', () => {
        const command = document.getElementById(`command-${event.target.value}`);
        if (command) {
            Alert("Ya existe el elemento en la comanda");
        } else {
            console.log("botón favorito");
        }
    });
    return letter;
}



let imgPos = 1;

function NumeroDePag() {
    const list = document.getElementById('pag-items');
    list.innerHTML = "";
    const imgItems = document.getElementsByClassName('slider-one').length;
    for (var i = 1; i <= imgItems; i++) {
        $('.pagination').append(`<li><span>${i}</span></li>`);
    }

    $('.slider-one').hide();
    $('.slider-one:first').show();
    $('.pagination li:first').css({ 'color': '#CD6E2E' });

    $('.pagination li').click(pagination);
    $('.right span').click(nextSlider);
    $('.left span').click(prevSlider);
}

function pagination() {
    const paginationPos = $(this).index() + 1;

    $('.slider-one').hide()
    $(`.slider-one:nth-child(${paginationPos})`).fadeIn();

    $('.pagination li').css({ 'color': '#858585' });
    $(this).css({ 'color': '#CD6E2E' });

    imgPos = paginationPos;
}

function nextSlider() {
    const imgItems = document.getElementsByClassName('slider-one').length;
    if (imgPos >= imgItems) { imgPos = 1; }
    else { imgPos++; }

    $('.pagination li').css({ 'color': '#858585' });
    $(`.pagination li:nth-child(${imgPos})`).css({ 'color': '#CD6E2E' });

    $('.slider-one').hide();
    $(`.slider-one:nth-child(${imgPos})`).fadeIn();

}

function prevSlider() {
    const imgItems = document.getElementsByClassName('slider-one').length;
    if (imgPos <= 1) { imgPos = imgItems; }
    else { imgPos--; }

    $('.pagination li').css({ 'color': '#858585' });
    $(`.pagination li:nth-child(${imgPos})`).css({ 'color': '#CD6E2E' });

    $('.slider-one').hide();
    $(`.slider-one:nth-child(${imgPos})`).fadeIn();
}


async function generateMerchandiseModal(ID) {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`;
    try {
        const response = await fetch(URL, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Merchandise information could not be obtained');
        }
        const data = await response.json();
        const merchandise = data.drinks[0];
        const modalContainer = document.createElement('dialog');
        modalContainer.classList.add("modal-container");
        modalContainer.innerHTML += modal_Gallery(data.drinks[0]);
        document.body.append(modalContainer);
        $(document.querySelector('.close-gallery')).on('click', () => { modalContainer.remove(); });
        const list = $('#list');
        for (let i = 1; i <= 15; i++) {
            const ingredientKey = `strIngredient${i}`;
            const measureKey = `strMeasure${i}`;
            const ingredientValue = merchandise[ingredientKey];
            const measureValue = merchandise[measureKey];
            if (ingredientValue) {
                const text = measureValue ? `${measureValue} ${ingredientValue}` : ingredientValue;
                const listItem = $('<li>').text(text);
                list.append(listItem);
            }
        }
    } catch (error) {
        console.error('Error obtaining merchandise data', error);
    }
}


document.getElementById("btn-search").addEventListener('click', () => {
    const name = document.getElementById("input-search").value;
    renderMerchandise(name);
});

document.getElementById("input-search").addEventListener("keypress", (event) => {
    if (event.key === "Enter"){
        const name = document.getElementById("input-search").value;
        renderMerchandise(name);
    }
  });

const name = localStorage.getItem("search");

if(name){
    renderMerchandise(localStorage.getItem("search"));
    localStorage.removeItem("search");
}
else{
    renderMerchandise("");
}

