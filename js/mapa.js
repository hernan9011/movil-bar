//script para visualizacion del mapa
function cargarMapaGeo() {
    
    var map = new google.maps.Map(document.getElementById('mapa'), {
        center: {
            lat: -34.922883,
            lng: -57.956317
        },
        zoom: 15
    });
    var marker1 = new google.maps.Marker({
        position: {lat: -34.922883, lng: -57.956317},
        title: "Oficina central TecnoSolutions"       
        });
    marker1.setMap(map);
    var infoWindow = new google.maps.InfoWindow;

}

$(document).ready(function () {
  
    cargarMapaGeo();
  
  });