export const letter_Merchandise = (Merchandise) => {
    return ` 
    <div class="img-merchandise" style="background-image: url(${Merchandise.strDrinkThumb});">                        
        <div style="filter:drop-shadow(black 2px 4px 6px);backdrop-filter: blur(1px);">
            <h5 class="text-merchandise">${Merchandise.strDrink} </h5>
        </div>
    </div>
    <div class="flex-column">                                                                                                                         
        <button id="button-info-${Merchandise.idDrink}" class="btn-c btn-info"value="${Merchandise.idDrink}" >Información</button>             
        <button id="button-${Merchandise.idDrink}" class="btn-c btnAdd"value="${Merchandise.idDrink}">Añadir a Favorito</button>    
    </div>`
}

export const modal_Gallery = (Merchandise) => {
    return`   
    <div class="modal-gallery">
        <div class="btn_close_gral">
            <p style="color: white;margin:0;">${Merchandise.strCategory} > ${Merchandise.strDrink}</p>
            <span class="material-symbols-outlined close-gallery">close</span>	
        </div>
        <div class="container-body-gallery">
            <div class="section-gallery-one">
                <div >              
                    <h1>${Merchandise.strDrink}</h1>
                </div>          
                <img src="${Merchandise.strDrinkThumb}" alt="${Merchandise.strDrink}">
            </div>
            <div class="section-gallery-two">         
                <div class="div-item" style="border-bottom: 1px solid black;">
                    <p><em style="color:#ffa600;">Ingredientes:</em></p> 
                    <ul id="list" style="margin: 0;">
                    </ul>
                </div>
                <div class="div-item">           
                    <p><em style="color:#ffa600;">Preparación:</em> ${Merchandise.strInstructions}</p> 
                </div>          
            </div>
        </div>
    </div>`
}
