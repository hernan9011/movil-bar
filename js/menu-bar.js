import { letter_Merchandise, modal_Gallery } from "../js/export-bar.js"
import { añadirHistorial, añadirFavorito } from "./storage.js"

async function renderMerchandise(name) {
    try {
        const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';
        const response = await fetch(`${API_URL}?s=${name}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Error obtaining Merchandise');
        }
        const Merchandise = await response.json();
        $('#body-merchandise').empty();
        console.log($('#body-merchandise').empty());
        for (let i = 0; i < Math.ceil(Merchandise.drinks.length / 9); i++) {
            const divMayor = $('<ul>').attr('id', `pag-${i}`).addClass('slider-one');
            $('#body-merchandise').append(divMayor);
            for (let itemCount = i * 9; itemCount < Math.min(i * 9 + 9, Merchandise.drinks.length); itemCount++) {
                const Merchandise2 = Merchandise.drinks[itemCount];
                const letter = $('<li>').attr('id', `Merchandise-${Merchandise2.idDrink}`).addClass('letter-merchandise');
                letter.html(letter_Merchandise(Merchandise2));
                divMayor.append(letter);
                addEvento(Merchandise2.idDrink);
            }
        }
        NumeroDePag();
        buttonEliminar(); 
    } catch (error) {
        console.error(error.message);
    }
}

function buttonEliminar() {
    const miArray = JSON.parse(localStorage.getItem('favorito'));
    miArray.forEach((item) => {
        if($(`#button-${item}`)){
            $(`#button-${item}`).text('Eliminar');
            $(`#button-${item}`).css({ backgroundColor: 'red', color: 'white' });
        }
    });
}

function addEvento(idDrink) {
    $(`#button-info-${idDrink}`).on('click', () => {
        añadirHistorial(idDrink);
        generateMerchandiseModal(idDrink);
    });
    $(`#button-${idDrink}`).on('click', () => {
        const currentText = $(`#button-${idDrink}`).text();
        // Cambiar el texto del botón al texto opuesto
        if (currentText === 'Añadir a Favorito') {
            $(`#button-${idDrink}`).text('Eliminar');
            $(`#button-${idDrink}`).css({ backgroundColor: 'red', color: 'white' });
            añadirFavorito(idDrink);
            return;
        }
        $(`#button-${idDrink}`).text('Añadir a Favorito');
        $(`#button-${idDrink}`).css({ backgroundColor: '#ffa600', color: '#000' });
        $(`#favorite-${idDrink}`).remove();
        localStorage.setItem('favorito', JSON.stringify(JSON.parse(localStorage.getItem('favorito'))
        .filter(elemento => elemento !== idDrink)));
    });
}


let imgPos = 1;
$('.right span').click(nextSlider);
$('.left span').click(prevSlider);

function NumeroDePag() {
    $('#pag-items').empty();
    imgPos = 1;
    for (let i = 1; i <= $('.slider-one').length; i++) {
        $('.pagination').append(`<li><span>${i}</span></li>`);
    }

    $('.slider-one').hide();
    $('.slider-one:first').show();
    $('.pagination li:first').css({ 'color': '#CD6E2E' });
    $('.pagination li').click(pagination);
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
    if (imgPos >= $('.slider-one').length) { imgPos = 1; }
    else { imgPos++; }
    $('.pagination li').css({ 'color': '#858585' });
    $(`.pagination li:nth-child(${imgPos})`).css({ 'color': '#CD6E2E' });
    $('.slider-one').hide();
    $(`.slider-one:nth-child(${imgPos})`).fadeIn();
}

function prevSlider() {
    if (imgPos <= 1) { imgPos = $('.slider-one').length }
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
        const modalContainer = $('<dialog>').addClass('container-modal').html(modal_Gallery(data.drinks[0]));
        $('body').append(modalContainer);
        $('.close').on('click', () => { modalContainer.remove(); });

        for (let i = 1; i <= 15; i++) {
            const ingredientValue = data.drinks[0][`strIngredient${i}`];
            const measureValue = data.drinks[0][`strMeasure${i}`];
            if (ingredientValue) {
                const text = measureValue ? `${measureValue} ${ingredientValue}` : ingredientValue;
                $('#list').append($('<li>').text(text));
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
    if (event.key === "Enter") {
        const name = document.getElementById("input-search").value;
        renderMerchandise(name);
    }
});

const name = localStorage.getItem("search");

if (name) {
    renderMerchandise(localStorage.getItem("search"));
    localStorage.removeItem("search");
}
else {
    renderMerchandise("");
}

setInterval(() => {
    buttonEliminar(); 
 }, 1000);
 
