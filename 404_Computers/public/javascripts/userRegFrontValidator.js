function qs(element) {
    return document.querySelector(element);
}

window.addEventListener("load", function () {
    let $inputName = qs("#name"),
        $nameErrors = qs("#nameErrors"),
        $inputLastname = qs("#surname"),
        $lastnameErrors = qs("#surnameErrors"),
        $form = qs("#form"),
        $email = qs("#email"),
        $emailErrors = qs("#emailErrors"),
        $pass = qs("#pass"),
        $passErrors = qs("#passErrors"),
        $passCheck = qs("#passCheck"),
        $passCheckErrors = qs("#passCheckErrors"),
        regExAlpha = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
        regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

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

    $pass.addEventListener('blur', function() {
        switch (true) {
            case !$pass.value.trim():
                $passErrors.innerHTML = 'El campo contraseña es obligatorio';
                $pass.classList.add('is-invalid');
                $pass.classList.remove("is-valid");
                break;
            case !regExPass.test($pass.value):
                $passErrors.innerHTML = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número';
                $pass.classList.add('is-invalid');
                $pass.classList.remove("is-valid");
                break
            default:
                $pass.classList.remove('is-invalid');
                $pass.classList.add('is-valid');
                $passErrors.innerHTML = ''
                break;
        }
    })

    $passCheck.addEventListener('blur', function() {
        switch (true) {
            case !$passCheck.value.trim():
                $passCheckErrors.innerHTML = 'El campo contraseña es obligatorio.';
                $passCheck.classList.add('is-invalid');
                $passCheck.classList.remove("is-valid");
                break;
            case $pass.value != $passCheck.value:
                $passCheckErrors.innerHTML = 'Las contraseñas no coinciden.';
                $passCheck.classList.add('is-invalid');
                $passCheck.classList.remove("is-valid");
                break
            default:
                $passCheck.classList.remove('is-invalid');
                $passCheck.classList.add('is-valid');
                $passCheckErrors.innerHTML = ''
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