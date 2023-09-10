export const letter_Merchandise = (Merchandise) => {
    return ` 
    <div class="text-merchandise profile-img" style="background-image: url(${Merchandise.imagen});filter: saturate(1.5);">                        
        <div style="filter:drop-shadow(black 2px 4px 6px);backdrop-filter: blur(1px);">
            <h5 style="color:#fff;filter:drop-shadow(black 2px 4px 6px);
            text-shadow: 0 0 1px #fff;font-size: 1.8em;">${Merchandise.nombre} </h5>
           
            <p style="color:#fff;filter:drop-shadow(black 2px 4px 6px);
            text-shadow: 0 0 1px #fff; font-size: 1.8em;">Precio: ${Merchandise.precio}</p>
        </div>
    </div>
    <div class="flex-column">                  
      <div class="button-merchandise">                                          
        <input  id="amount-${Merchandise.id}" type="number" value="1" class="input-number input-number_two" min="1" max="50">                                                                
        <button id="button-info-${Merchandise.id}" class="btn-c btn-info"value="${Merchandise.id}" >Info</button>             
      </div>
      <button id="button-${Merchandise.id}" class="btn-c btnAdd"value="${Merchandise.id}" >Añadir</button>    
    </div>`
}

export const letter_Command = (Merchandise,amount) => {
    return `
   <div class="text-merchandise-two">             
       <p>${amount} X ${Merchandise.nombre} </p>
       <p>Precio:${amount * Merchandise.precio}</p>
   </div>
   <div class="flex-column" style="margin:0;">                                  
       <div class="button-merchandise-two commandID">   
           <input style="display:none" id="cantidadCom-${Merchandise.id}"type="number" value="${amount}" id="tentacles" min="1" max="50";>                                     
           <button id="button-eliminate-${Merchandise.id}" class="material-symbols-outlined close-gallery2" value="${Merchandise.id}">close               
           </button>    
       </div>
   </div>
   `
}

export const letter_Ticket = (ticket) => {
    return `
    <div id="modal-content" class="modal-ticket">   
        <div class="btn_close_gral">
            <p style="color: white;">Ticket</p>
            <span class="material-symbols-outlined close-ticket">close</span>	
        </div>
        <div class="ticket-flex">                
            <li class="item" style="border-bottom: 1px dashed black;">
                <p>Nro de Comanda:</p>
                <p>${ticket.id}</p>
            </li>
            <li class="item" style="border-bottom: 1px dashed black;">
                <p>Fecha de Compra: </p>
                <p>${ticket.fecha.substr(0, 10)}</p>
            </li>
            <li class="item" style="border-bottom: 1px dashed black;">
                <p>Forma Entrega: </p>
                <p>${ticket.formaEntrega.descripcion}</p>
            </li>
            <li class="item" style="border-bottom: 1px dashed black;">
                <p>Cantidad</p>
                <p style="margin-right: 1.3em;">Descripción</p>
                <p>Precio</p>
            </li>
            <ul id="ticket-list" style="margin: 0;  padding: 0; overflow-y: auto; max-height: 350px;"></ul>       
            <li class="item" style="border-bottom: 1px dashed black; border-top: 1px dashed black;">
                <p>Precio Total:</p>
                <p>${ticket.total}</p>
            </li>
        </div>    
    </div>`
}

export const letter_Gallery = (Merchandise,itemCount) => {
    return `
    <div class="text-gallery">             
        <h5 style="color:#fff;filter:drop-shadow(black 2px 4px 6px);
        text-shadow: 0 0 1px #fff;">${Merchandise[itemCount].nombre} </h5>
        <p style="color:#fff;filter:drop-shadow(black 2px 4px 6px);
        text-shadow: 0 0 1px #fff;">Precio: ${Merchandise[itemCount].precio}</p>
    </div>                 
    <div class="button-gallery">                                                                                                         
        <button id="button-gallery-${itemCount}" class="btn-c" style="width: 30%;height:60%;">MAS</button>           
    </div>`
}

export const modal_Gallery = (data) => {
    return`   
    <div class="modal-gallery">
        <div class="btn_close_gral">
            <p style="color: white;margin:0;">${data.tipo.descripcion} > ${data.nombre}</p>
            <span class="material-symbols-outlined close-gallery">close</span>	
        </div>
        <div class="container-body-gallery">
            <div class="section-gallery-one">
                <div style="display: flex; flex-direction: column;justify-content: center; height: 30%;">              
                    <h1>${data.nombre}</h1>
                    <h3>Precio: ${data.precio}</h3>
                </div>          
                <img src="${data.imagen}" alt="${data.nombre}">
            </div>
            <div class="section-gallery-two">         
                <div class="div-item" style="border-bottom: 1px solid black;">
                    <p><em style="color:#ffa600;">Ingredientes:</em> ${data.ingredientes}</p> 
                </div>
                <div class="div-item">           
                    <p><em style="color:#ffa600;">Preparación:</em> ${data.preparacion}</p> 
                </div>          
            </div>
        </div>
    </div>`
}

export const command_Ticket = (command) => {
    return`
    <h3>Ticket</h3> 
    <div class="ticket-flex">                
            <li class="item" style="border-bottom: 1px dashed black;">
                <p>Nro de Comanda:</p>
                <p>${command.id}</p>
            </li>
            <li class="item" style="border-bottom: 1px dashed black;">
                <p>Fecha de Compra: </p>
                <p>${command.fecha.substr(0, 10)}</p>
            </li>
            <li class="item" style="border-bottom: 1px dashed black;">
                <p>Forma Entrega: </p>
                <p>${command.formaEntrega.descripcion}</p>
            </li>
            <li class="item" style="border-bottom: 1px dashed black;">
                <p>Cantidad</p>
                <p style="margin-right: 1.3em;">Descripción</p>
                <p>Precio</p>
            </li>
            <ul id="ticket-list${command.id}" style="margin:0;padding:0;overflow-y:auto;max-height:350px;"></ul>   
            <li class="items" style="border-bottom: 1px dashed black; border-top: 1px dashed black;">
                <p>Precio Total:</p>
                <p>${command.total}</p>
            </li>
    </div>`
}