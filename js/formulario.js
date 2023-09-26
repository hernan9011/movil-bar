document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const sendEmailLink = document.getElementById('boton-subir');
  
    sendEmailLink.addEventListener('click', function () {
      const recipientEmail = emailInput.value;
      const subject = 'Consulta sobre su empresa';
      const body = `Mensaje: ${messageInput.value}`;
  
      // Crear un enlace "mailto" con los datos del formulario
      const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
      // Abrir el cliente de correo electrónico predeterminado
      //window.location.href = mailtoLink;
      window.location.href = mailtoLink;
    });
})