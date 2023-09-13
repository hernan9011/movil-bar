
window.onload = () => {
    // Variables
    const IMAGES = [ 
         '../img/bebidas-refrescantes.jpg',
        '../img/bebidas-refrescantes.jpg',
        '../img/bebidas-refrescantes.jpg'
    ];
    let actualPosition = 0;
    const buttonBack = document.querySelector('#back');
    const buttonNext = document.querySelector('#next');
    const image = document.querySelector('#image');
  
    function nextPhoto() {
        if(actualPosition >= IMAGES.length - 1) {
            actualPosition = 0;
        } else {
            actualPosition++;
        }
        renderImage();
    }

    function backPhoto() {
        if(actualPosition <= 0) {
            actualPosition = IMAGES.length - 1;
        } else {
            actualPosition--;
        }
        renderImage();
    }

    function renderImage() {
        image.style.backgroundImage = `url(${IMAGES[actualPosition]})`;
    }

    buttonNext.addEventListener('click', nextPhoto);
    buttonBack.addEventListener('click', backPhoto);
    document.getElementById("btn-search").addEventListener('click', () => {
        location.href ="../../search.html";
        const name = document.getElementById("input-search").value;      
        renderMerchandise("", name, "asc");
        console.log("aaaaa")
    });
    renderImage();
} 
