/* Funciones de Errores Admin - Editar Usuario */

function qs(element) {
    return document.querySelector(element);
}

window.addEventListener("load", function () {
    let $inputName = qs("#name"),
        $nameErrors = qs("#nameErrors"),
        $inputLastname = qs("#surname"),
        $lastnameErrors = qs("#surnameErrors"),
        $form = qs("#form"),
        $dni = qs("#dni"),
        $dniErrors = qs("#dniErrors"),
        $address = qs("#address"),
        $addressErrors = qs("#addressErrors"),
        $phoneNumber = qs("#phoneNumber"),
        $phoneNumberErrors = qs("#phoneNumberErrors"),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExDNI = /^[0-9]{8}/,
        regExPhone = /^\d{10}$/;

    $inputName.addEventListener("blur", function () {
        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = "El campo nombre es obligatorio";
                $inputName.classList.add("is-invalid");
                $inputName.classList.remove("is-valid");
                break;
            case !regExAlpha.test($inputName.value):
                $nameErrors.innerHTML = "Debes ingresar un nombre válido";
                $inputName.classList.add("is-invalid");
                $inputName.classList.remove("is-valid");
                break;
            default:
                $inputName.classList.remove("is-invalid");
                $inputName.classList.add("is-valid");
                $nameErrors.innerHTML = "";
                break;
        }
    });

    $inputLastname.addEventListener("blur", function () {
        switch (true) {
            case !$inputLastname.value.trim():
                $lastnameErrors.innerHTML = "El campo apellido es obligatorio";
                $inputLastname.classList.add("is-invalid");
                $inputLastname.classList.remove("is-valid");
                break;
            case !regExAlpha.test($inputLastname.value):
                $lastnameErrors.innerHTML = "Debes ingresar un apellido válido";
                $inputLastname.classList.add("is-invalid");
                $inputLastname.classList.remove("is-valid");
                break;
            default:
                $inputLastname.classList.remove("is-invalid");
                $inputLastname.classList.add("is-valid");
                $lastnameErrors.innerHTML = "";
                break;
        }
    });

    $dni.addEventListener('blur', function () {
        switch (true) {
            case !$dni.value.trim():
                $dniErrors.innerHTML = 'El campo DNI es obligatorio';
                $dni.classList.add('is-invalid');
                $dni.classList.remove("is-valid");
                break;
            case !regExDNI.test($dni.value):
                $dniErrors.innerHTML = 'Debe ingresar un DNI válido';
                $dni.classList.add('is-invalid');
                $dni.classList.remove("is-valid");
                break
            default:
                $dni.classList.remove('is-invalid');
                $dni.classList.add('is-valid');
                $dniErrors.innerHTML = ''
                break;
        }
    })

    $address.addEventListener('blur', function () {
        switch (true) {
            case !$address.value.trim():
                $addressErrors.innerHTML = 'El campo Domicilio es obligatorio';
                $address.classList.add('is-invalid')
                $address.classList.remove("is-valid");
                break;
            default:
                $address.classList.remove('is-invalid');
                $address.classList.add('is-valid');
                $addressErrors.innerHTML = ''
                break;
        }
    })

    $phoneNumber.addEventListener('blur', function () {
        switch (true) {
            case !$phoneNumber.value.trim():
                $phoneNumberErrors.innerHTML = 'El campo Telefono es obligatorio';
                $phoneNumber.classList.add('is-invalid')
                $phoneNumber.classList.remove("is-valid");
                break;
            case !regExPhone.test($phoneNumber.value):
                $phoneNumberErrors.innerHTML = 'Debe ingresar un telefono válido';
                $phoneNumber.classList.add('is-invalid');
                $phoneNumber.classList.remove("is-valid");
                break
            default:
                $phoneNumber.classList.remove('is-invalid');
                $phoneNumber.classList.add('is-valid');
                $phoneNumberErrors.innerHTML = ''
                break;
        }
    })

    $form.addEventListener('submit', function (event) {
        let error = false;
        event.preventDefault()
        console.log("entramos al Form")
        let elementosForm = this.elements

        for (let index = 0; index < elementosForm.length - 1; index++) {
            if (elementosForm[index].value == "" && elementosForm[index].name == "localidad" && elementosForm[index].name == "provincia" || elementosForm[index].classList.contains("is-invalid")) {
                elementosForm[index].classList.add('is-invalid');
                submitErrors.innerHTML = "ERROR: Revise los Campos Señalados.";
                error = true;
                console.log("ERROR: Revise los Campos Señalados.");
            }
        }

        if (!error) {
            $form.submit()
        }

    })

});

/* Funciones del modal de Form Delete Msg .etc */

window.addEventListener("load", function() {
    
    const element = document.querySelectorAll("#btnDeleteUser");
    const contentBox = document.querySelectorAll(".modalFormBox");
    const content = document.querySelectorAll(".modalFormContent");
    const cancel = document.querySelectorAll(".cancelDeleteBTN");

    for(let i = 0; i < element.length; i++) {
        element[i].addEventListener('click' , function(){
            contentBox[i].classList.toggle("formActive");
            content[i].classList.toggle("formActive");
        })
        cancel[i].addEventListener('click' , function(){
            contentBox[i].classList.toggle("formActive");
            content[i].classList.toggle("formActive");
        })
    }

})

/* API PROVINCIAS Y CIUDADES */

window.addEventListener('load', function () {
    let $provinceList = document.querySelector('#provinceList');
    let $citiesList = document.querySelector('#citiesList');

    fetch('https://apis.datos.gob.ar/georef/api/provincias')
    .then(function(response){
        return response.json()
    })
    .then(function(result){
        let provinces = result.provincias.sort(function (prev, next) {
            return prev.nombre > next.nombre
            ? 1
            : prev.nombre < next.nombre
            ? -1
            : 0;
        });
        return provinces.forEach(province => {
            $provinceList.innerHTML += `<option value="${province.nombre}">${province.nombre}</option>`
        })
    })
    .catch(function (error){
               console.log(error);
    });

    $provinceList.addEventListener('change', function(event){
        let idProvince = event.target.value
        $citiesList.innerHTML = ""

        function fetchCities (id){
            fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${id}&campos=id,nombre&max=5000`)
            .then(response => response.json())
            .then(result => {
                let cities = result.localidades.sort(function (prev, next) {
                    return prev.nombre > next.nombre
                    ? 1
                    : prev.nombre < next.nombre
                    ? -1
                    : 0;
                });
              cities.forEach(city => {
                  $citiesList.innerHTML += `<option value="${city.nombre}">${city.nombre}</option>`
              })  
            })
        }
        fetchCities(idProvince)
    })
})

let changeProfilePic = document.querySelector("#examinar")

changeProfilePic.addEventListener("change",
    function showImageUploaded(){
        if(changeProfilePic.files && changeProfilePic.files[0]){

            var reader = new FileReader();
            var imageRPC = document.querySelector('#changeImageProfile');

            reader.onload = function(e){
                imageRPC.src = e.target.result;
            };

            reader.readAsDataURL(changeProfilePic.files[0]);

            
        }
})