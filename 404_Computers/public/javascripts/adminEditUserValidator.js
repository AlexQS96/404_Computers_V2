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
        $email = qs("#email"),
        $emailErrors = qs("#emailErrors"),
        $address = qs("#address"),
        $addressErrors = qs("#addressErrors"),
        $phoneNumber = qs("#phoneNumber"),
        $phoneNumberErrors = qs("#phoneNumberErrors"),
        regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
        regExDNI = /^[0-9]{8}/,
        regExPhone = /^\d{10}$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

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

    $email.addEventListener('blur', function () {
        switch (true) {
            case !$email.value.trim():
                $emailErrors.innerHTML = 'El campo email es obligatorio';
                $email.classList.add('is-invalid')
                $email.classList.remove("is-valid");
                break;
            case !regExEmail.test($email.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido';
                $email.classList.add('is-invalid')
                $email.classList.remove("is-valid");
                break
            default:
                $email.classList.remove('is-invalid');
                $email.classList.add('is-valid');
                $emailErrors.innerHTML = ''
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
        let elementosForm = this.elements

        for (let index = 0; index < elementosForm.length - 1; index++) {
            if (elementosForm[index].value == "" || elementosForm[index].classList.contains("is-invalid")) {
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
