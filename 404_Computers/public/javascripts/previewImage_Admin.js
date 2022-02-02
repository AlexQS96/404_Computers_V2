let inputImage = document.getElementById('examinar')
let imageButtonSave = document.getElementById('saveButtonIMG');

inputImage.addEventListener('change', 
function fileValidation(){
    var errorImage = document.getElementById('errorImage')
    var filePath = inputImage.value; //Capturo el valor del input
    var allowefExtensions = /(.jpg|.jpeg|.png|.gif|.webp)$/i; //Extensiones permitidas
    if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
        let error = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif - .webp)'
        errorImage.innerHTML = error;
        inputImage.value = '';
        document.getElementById('imagePreview').innerHTML = '';
        return false;
    }else{
        // Image preview
        if(inputImage.files && inputImage.files[0]){
            var reader = new FileReader();
            reader.onload = function(e){
                document.getElementById('imagePreview').innerHTML = '<img src="' + e.target.result +'"/>';
            };
            reader.readAsDataURL(inputImage.files[0]);
            document.getElementById('saveButtonIMG').disabled=false;
            imageButtonSave.classList.toggle('cursorOn')
            errorImage.innerHTML = '';
        }
    }
})