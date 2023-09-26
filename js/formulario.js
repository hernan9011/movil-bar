document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const sendEmailLink = document.getElementById('boton-subir');

    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
      }
  
    sendEmailLink.addEventListener('click', function () {
      const recipientEmail = emailInput.value;
      const subject = 'Consulta sobre su empresa';
      const body = `Mensaje: ${messageInput.value}`;
  
      // Crear un enlace "mailto" con los datos del formulario
      const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
        if (!validateEmail(recipientEmail)) {
          alert('Por favor, ingrese una dirección de correo electrónico válida.');
          return;
        }

      // Abrir el cliente de correo electrónico predeterminado
      //window.location.href = mailtoLink;
      //window.location.href = mailtoLink;
      window.open(mailtoLink,'_blank');
    });
})