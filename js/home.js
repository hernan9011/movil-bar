
window.onload = () => {
    // Variables
    const IMAGES = ['../img/image_4.jpg'];
    const image = document.querySelector('#image');
  
    function renderImage() {
        image.style.backgroundImage = `url(${IMAGES[0]})`;
    }

    document.getElementById("btn-search").addEventListener('click', () => {
        location.href ="../../search.html";
        const name = document.getElementById("input-search").value;      
        localStorage.setItem("search", name);
    });
    renderImage();
} 
