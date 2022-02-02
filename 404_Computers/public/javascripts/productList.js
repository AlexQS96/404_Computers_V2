/* Boton de filtro para el listado de productos */

let filterButton = document.getElementById("buttonFilterOptions");
let sideButton = document.getElementById("modalSidePanelButton");
var closeButton = document.getElementsByClassName("closeFilterOptions")[0];

filterButton.onclick = function() {
    sideButton.style.display = "block";
    document.body.classList.toggle("bNoScroll");
}

closeButton.onclick = function() {
    sideButton.style.display = "none";
    document.body.classList.toggle("bNoScroll");
}