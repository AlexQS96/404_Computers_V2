/* el CSS se encuentra en carousel.css */

/* Galeria de fotos de Detalle de Producto de producto */

function productGridImages(images) {
  // imagenPrincipal es la primera en mostrarse ej imagen[0]
  var expandImg = document.getElementById("expandedImg");
  // aca tomamos la imagen en la que ponemos la funcion : onclick="productGridImages(this)";
  // para usarla debemos poner el codigo de arriba dentro de un foreach
  expandImg.src = images.src;
  // por defecto las imagenes se encuentran ocultas con display none 
  // pero al ser seleccionadas le damos display block para mostrarlas
  expandImg.parentElement.style.display = "block";
}


/* Modal de Imagenes de Producto */

// si tocas la imagen principal se agranda la imagen en un
// visor externo

// Get the modal
var modal = document.getElementById('myModal');

// Get the images and bind an onclick event on each to insert it inside the modal
// use its "alt" text as a caption
var images = document.querySelectorAll(".imageModal");
var modalImg = document.getElementById("img01");
for(let i = 0; i < images.length; i++){
  images[i].onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    document.body.style.overflowY = "hidden";
  }
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflowY = "visible";
  }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.body.style.overflowY = "visible";
} 

function fav() {
  var icon = document.getElementById("favBtn");
  if (icon.classList.contains("fa-heart-o")) {
    icon.classList.remove("fa-heart-o");
    icon.classList.add("fa-heart");
  } else {
    icon.classList.remove("fa-heart");
    icon.classList.add("fa-heart-o");
  }
}

function submitThisForm(event,form) {
  fetch(form.action, {
      method:'post',
      body: new FormData(form)
  });

  event.preventDefault();
}