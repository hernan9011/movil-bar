import { letter_Merchandise } from "../js/export.js"
import { letter_Command } from "../js/export.js"
import { letter_Ticket } from "../js/export.js"

import { modal_Gallery } from "../js/export.js"

let Delivery;
let Merchandise = [];


renderMerchandise("", "", "asc");

export async function renderMerchandise(type, name, order) {
    try {
        const API_URL = 'https://localhost:7280/api/v1/Mercaderia';
        const response = await fetch(`${API_URL}?tipo=${type}&nombre=${name}&orden=${order}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Error obtaining Merchandise');
        }
     
        const Merchandise = await response.json();
        const listMerchandise = document.getElementById('body-merchandise');
        listMerchandise.innerHTML = "";    
        const totalPag = Merchandise.length / 6;
        const incrementBy = 6;
        let itemCount = 0;
        let countTotal = 0;
        for (let i = 0; i < totalPag; i++) {
            const divMayor = document.createElement('div');
            divMayor.id = `pag-${i}`;
            divMayor.classList.add('slider-one');
            listMerchandise.appendChild(divMayor);
            const itemCountLimit = itemCount + incrementBy;
            while (itemCount < itemCountLimit) {                
                const letter = createMerchantLetter(Merchandise[itemCount]);             
                divMayor.appendChild(letter);
                countTotal++;
                if(countTotal === Merchandise.length){
                    itemCount = itemCountLimit;
                }
                itemCount++;
            }
        }
        paginacion();
    } catch (error) {
        console.error(error.message);
    }
}

let imgPos = 1;

function paginacion() {
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





function createMerchantLetter(Merchandise) {
    const letter = document.createElement('div');
    letter.id = `Merchandise-${Merchandise.id}`;
    letter.classList.add('letter-merchandise');
    letter.innerHTML += letter_Merchandise(Merchandise);
    const buttonMas = letter.querySelector(`#button-info-${Merchandise.id}`);
    buttonMas.addEventListener('click', () => {
        generateMerchandiseModal(Merchandise.id);
    });
    const button = letter.querySelector(`#button-${Merchandise.id}`);
    button.addEventListener('click', () => {
        const id = event.target.value;
        const amount = document.getElementById(`amount-${id}`).value;
        const command = document.getElementById(`command-${id}`);
        if (command) {
            Alert("Ya existe el elemento en la comanda");
        } else {
            renderCommand(id, amount);
        }
    });
    return letter;
}

async function generateMerchandiseModal(ID) {
    const URL = 'https://localhost:7280/api/v1/Mercaderia/';
    try {
        const response = await fetch(`${URL}${ID}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Merchandise information could not be obtained');
        }
        const data = await response.json();
        const modalContainer = document.createElement("div");
        modalContainer.classList.add("modal-container");
        console.log(data)
        modalContainer.innerHTML += modal_Gallery(data);
        document.body.append(modalContainer);
        document.querySelector('.close-gallery').addEventListener('click', () => {
            modalContainer.remove();
        });
    } catch (error) {
        console.error('Error obtaining merchandise data', error);
    }
}




function Alert(message) {
    const alertDiv = document.createElement("div");
    alertDiv.textContent = message;
    alertDiv.style.backgroundColor = "red";
    alertDiv.style.color = "white";
    alertDiv.style.borderRadius = "5px";
    alertDiv.style.position = "absolute";
    alertDiv.style.top = `${window.pageYOffset + event.clientY - 60}px`;
    alertDiv.style.left = `${event.clientX}px`;
    alertDiv.style.width = "100px"
    alertDiv.style.padding = "5px"
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.parentNode.removeChild(alertDiv);
    }, 500);
}

async function renderCommand(id, amount) {
    try {
        const API_URL = 'https://localhost:7280/api/v1/Mercaderia/';
        const response = await fetch(`${API_URL}${id}`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Error obtaining Merchandise');
        }
        const Merchandise = await response.json();
        const listCommand = document.getElementById('command-body');
        const commandLetter = createOrderLetter(Merchandise, amount);
        listCommand.appendChild(commandLetter);

    } catch (error) {
        console.error(error.message);
    }
}

let precioTotal = 0;

function createOrderLetter(Merchandise, amount) {
    const letter = document.createElement('div');
    letter.id = `command-${Merchandise.id}`;
    letter.classList.add('letter-command');
    letter.innerHTML += letter_Command(Merchandise, amount);

    precioTotal = precioTotal + amount * Merchandise.precio;
    const div = document.querySelector('.div-mensajes');
    div.innerHTML = `<p>Precio Total:</p><p>${precioTotal}</p>`;

    const button = letter.querySelector(`#button-eliminate-${Merchandise.id}`);
    button.addEventListener('click', () => {
        const newMessage = document.getElementById(`command-${event.target.value}`)
        newMessage.remove();
        precioTotal = precioTotal - amount * Merchandise.precio;
        div.innerHTML = `<p>Precio Total:</p><p>${precioTotal}</p>`;
    });
    return letter;
}

function commandButton() {
    document.getElementById('command-body').style.overflowY = "hidden";
    document.getElementById('select-delivery').style.visibility = 'visible';
    const item = document.getElementById('footer-command');
    item.innerHTML = ` `;
    let goBack = document.getElementById('button-goBack');
    if (!goBack) {
        goBack = addButton('button-goBack', 'Volver');
        item.appendChild(goBack);
    }
    goBack.classList.toggle('hidden', false);
    let finish = document.getElementById('button-finish');
    if (!finish) {
        finish = addButton('button-finish', 'Finalizar');
        item.appendChild(finish);
    }
    finish.classList.toggle('hidden', false);
    goBack.addEventListener('click', () => {
        handleClick(0);
    });
    finish.addEventListener('click', () => {
        handleClick(1);
    });
}

function addButton(id, text) {
    const button = document.createElement('button');
    button.id = id;
    button.classList.add('btn-c');
    button.style.width = '30%';
    button.textContent = text;
    return button
}

function handleClick(num) {
    const item = document.getElementById('footer-command');
    item.innerHTML = ` `;
    document.getElementById('command-body').style.overflowY = "auto";
    document.getElementById("select-delivery").style.visibility = 'hidden';
    const Continue = addButton('btn-command', 'Continuar');
    item.appendChild(Continue);
    document.getElementById('btn-command').addEventListener('click', handleBtnCommandClick);
    if (num != 1) {
        return;
    }
    Merchandise = [];
    const list = document.getElementsByClassName('commandID');
    for (const element of list) {
        const amount = element.children[0].value;
        const id = element.children[1].value;
        for (let a = 0; a < amount; a++) {
            Merchandise.push(id);
        }
    };
    const Asset = document.querySelector('input[name="status"]:checked');
    Delivery = Asset.value;
    newCommand();
}

async function newCommand() {
    try {
        const _data = {
            mercaderias: Merchandise,
            formaEntrega: Delivery
        };
        const response = await fetch('https://localhost:7280/api/v1/Comanda', {
            method: 'POST',
            body: JSON.stringify(_data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        if (!response.ok) {
            throw new Error('Error obtaining Merchandise');
        }
        const data = await response.json();
        ticket(data);
        document.querySelectorAll('.letter-command').forEach(node => node.remove());
    } catch (error) {
        console.error(error.message);
    }
}

function ticket(ticket) {
    const div = document.querySelector('.div-mensajes');
    div.innerHTML = `<p>Precio Total:</p><p>0</p>`;
    const listCommand = document.getElementById('command-body');
    const item = document.createElement('div');
    item.id = 'myModal';
    item.classList.add('container-ticket');
    item.innerHTML += letter_Ticket(ticket);
    listCommand.appendChild(item);
    const content = document.getElementById('ticket-list');
    const array=[];
    ticket.mercaderias.forEach((merchandise) => {
        if (!array.includes(merchandise.nombre)) {
             array.push(merchandise.nombre);
            const item = document.createElement('li');
            item.id = 'ticket';
            item.classList.add('item');
            item.innerHTML = `
                <p>1 X     </p>      
                <p>${merchandise.nombre}</p>
                <p>${merchandise.precio}</p>`;
            content.appendChild(item);

            let count = 0;
            for (let i = 0; i < ticket.mercaderias.length; i++) {
                if (ticket.mercaderias[i].nombre === merchandise.nombre) {
                    count++;
                }
            }
           if(count > 1){
            item.innerHTML = `
                <p>${count} X     </p>
                <p>${merchandise.nombre}</p>
                <p >${count * merchandise.precio}</p>`;
           }           
        }
    });
    const modal = document.getElementById('myModal');
    const span = document.getElementsByClassName('close-ticket')[0];
    span.onclick = () => {
        modal.remove();
    };
}


document.getElementById('btn-command').addEventListener('click', handleBtnCommandClick);

function handleBtnCommandClick() {
    const div = document.getElementById('command-body');
    div.scrollTop = 0;
    const list = document.getElementsByClassName('letter-command');
    if (list.length > 0) {
        setTimeout(() => commandButton(), 500);
    }
    else {
        Alert("No exisisten elementos en la comanda");
    }
}

document.getElementById("btn-search").addEventListener('click', () => {
    const type = document.getElementById("type").value;
    const order = document.getElementById("order").value;
    const name = document.getElementById("input-search").value;
    renderMerchandise(type, name, order);
});
