import { modal_History, letter_History } from "./export-bar.js"

const modal=  $('<dialog>').attr('id', `modal`).addClass('container-history');
modal.html(modal_History());
$('body').append(modal);

async function fetchAndAddToStorage(ID, storageKey, containerId) {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`;
    try {
        const response = await fetch(URL, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Merchandise information could not be obtained');
        }
        const data = await response.json();
        const letter = $('<div>').attr('id', `${containerId}-${data.drinks[0].idDrink}`).addClass('letter-history');
        letter.html(letter_History(data.drinks[0]));
        $(`#${containerId}`).append(letter);
        
        const miArrayJSON = localStorage.getItem(storageKey);
        const miArrayRecuperado = JSON.parse(miArrayJSON);
        miArrayRecuperado.push(ID);
        localStorage.setItem(storageKey, JSON.stringify(miArrayRecuperado));
    } catch (error) {
        console.error('Error obtaining merchandise data', error);
    }
}

export async function añadirHistorial(ID) {
    await fetchAndAddToStorage(ID, 'history', 'record');
}

export async function añadirFavorito(ID) {
    await fetchAndAddToStorage(ID, 'favorito', 'favorite');
}

function LocalStorage(clave, funcAgregar) {
    const nuevoArray = [];
    const miArrayJSON = localStorage.getItem(clave);
    if (miArrayJSON) {
        const miArrayRecuperado = JSON.parse(miArrayJSON);
        if (miArrayRecuperado.length > 0) {
            localStorage.removeItem(clave);     
            localStorage.setItem(clave, JSON.stringify(nuevoArray));
            miArrayRecuperado.forEach(item => funcAgregar(item));
        }
    }else {
        localStorage.setItem(clave, JSON.stringify(nuevoArray));
    }
}

LocalStorage('history', añadirHistorial);
LocalStorage('favorito', añadirFavorito);
