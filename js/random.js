import { letter_randomMerchandise } from "../js/export-bar.js";



async function renderRandomMerchandise() {
    try {
        const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        const response = await fetch(`${API_URL}` , { method: 'GET' });
        const midiv = $('#bebidaRandom');
        
        if (!response.ok) {
            throw new Error('Error obtaining Merchandise');
        }

        const RandomMerchandise = await response.json();
        console.log(RandomMerchandise);
        let trago = RandomMerchandise.drinks[0];
        console.log(trago);
        
        midiv.append(letter_randomMerchandise(trago));

        document.querySelector('#image').style.backgroundImage = `url(${trago.strDrinkThumb})`;



    } catch (error) {
        console.error(error.message);
    }
}

renderRandomMerchandise();