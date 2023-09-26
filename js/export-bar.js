export const letter_Merchandise = (Merchandise) => {
    return ` 
    <article class="letter-merchandise" >
        <div class="img-merchandise" style="background-image: url(${Merchandise.strDrinkThumb});">                        
            <div style="filter:drop-shadow(black 2px 4px 6px);backdrop-filter: blur(1px);">
                <h5 class="text-merchandise">${Merchandise.strDrink} </h5>
            </div>
        </div>
        <div class="flex-column">                                                                                                                         
            <button id="button-info-${Merchandise.idDrink}" 
            class="btn-c btn-info" value="${Merchandise.idDrink}" >Información</button>             
            <button id="button-${Merchandise.idDrink}" 
            class="btn-c" value="${Merchandise.idDrink}">Añadir a Favorito</button>    
        </div>
    </article>`
}

export const modal_Gallery = (Merchandise) => {
    return`   
    <div class="modal-info">
        <div class="modal-header">
            <p class="modal-title">${Merchandise.strCategory} > ${Merchandise.strDrink}</p>
            <span class="material-symbols-outlined close">close</span>	
        </div>
        <section class="modal-body">
            <article class="article-one">            
                <h1>${Merchandise.strDrink}</h1>         
                <img src="${Merchandise.strDrinkThumb}" alt="${Merchandise.strDrink}">
            </article>
            <article class="article-two">         
                <div class="div-item" style="border-bottom: 1px solid black;">
                    <p><em style="color:#ffa600;">Ingredientes:</em></p> 
                    <ul id="list" style="margin: 0;">
                    </ul>
                </div>
                <div class="div-item">           
                    <p><em style="color:#ffa600;">Preparación:</em> ${Merchandise.strInstructions}</p> 
                </div>          
            </article>
        </section>
    </div>`
}


export const modal_History = () => {
    return`   
    <details id="record">
        <summary style="font-size: 1.3em;"><strong>HISTORIAL</strong></summary>
    </details>
    <details id="favorite">
        <summary style="font-size: 1.3em;"><strong>FAVORITO</strong></summary>
    </details>`
}

export const letter_History = (Merchandise) => {
    return `
    <img src="${Merchandise.strDrinkThumb}" alt="${Merchandise.strDrink}" style="height:50px;">
    <h5>${Merchandise.strDrink} </h5>
    `
}
