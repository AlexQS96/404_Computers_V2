/* Botones de Stock de Carrito */
/* Code By  Stackfindover , re-edited by 404 Computers Team */

let priceList = document.querySelectorAll("#priceItem");
let productsSize = document.querySelectorAll("#cartProd");
let priceChange = document.querySelectorAll("#finalPriceItem");
let quantity = document.querySelectorAll("#inputCartVal");
let discount = document.querySelectorAll("#discountVal");

function clearNumber(number){
    number = number.textContent;
    return number.replace(".","");
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calcDiscount(number,discount){

    return number - (number * discount) / 100
}

function normal(number){

    number = (number.textContent).replace(/[^0-9]/g,'');

    return parseInt(number);
}

function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
    let total;

    for (let i = 0; i < productsSize.length; i++) {
        if(quantity[i].value == value)
        {
            if (normal(discount[i])>0) {
                total = parseFloat(clearNumber(priceList[i])).toFixed(3);
                total = calcDiscount(total, normal(discount[i]));
                priceChange[i].innerHTML = numberWithCommas(value * total);
            }
            else
            {
                priceChange[i].innerHTML = numberWithCommas(value * parseFloat(priceList[i] = (priceList[i].textContent).replace(".","")).toFixed(3));
            }
        }
    }
}

function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
    }

    for (let i = 0; i < productsSize.length; i++) {
        if(quantity[i].value == value)
        {
            if (normal(discount[i])>0) {
                total = parseFloat(clearNumber(priceList[i])).toFixed(3);
                total = calcDiscount(total, normal(discount[i]));
                priceChange[i].innerHTML = numberWithCommas(value * total);
            }
            else
            {
                priceChange[i].innerHTML = numberWithCommas(value * parseFloat(priceList[i] = (priceList[i].textContent).replace(".","")).toFixed(3));
            }
        }
    }
}

/* Funcion del Home */

let navBar = document.getElementById('mobile_Nav_Bar');
let searchBar = document.getElementById("searchBarButtonJS");
let burger = document.getElementById("burgerButton");
let searchBarAdmin = document.querySelector(".search_Bar");

function cvv(element)
{
    var max_chars = 3;

    if(element.value.length > max_chars) {
    element.value = element.value.substr(0, max_chars);
    }
}

function ncard(element)
{
    var max_chars = 16;

    if(element.value.length > max_chars) {
    element.value = element.value.substr(0, max_chars);
    }
}

function BButton() {
    burger.classList.toggle("is-active");
    document.body.classList.toggle("bNoScroll");
}

function userPanel(){
    let panel = document.getElementById('userPanel');

    panel.classList.toggle("panel_Active");

}

function dropMenu(){
    if (navBar.style.display === "block")
    {
        navBar.style.display = "none";
        searchBar.style.display = "none";
    }
    else
    {
        navBar.style.display = "block";
        searchBar.style.display = "none";
    }
}

function dropSearch(){
    if (searchBar.style.display === "block")
    {
        searchBar.style.display = "none";
        burger.classList.remove("is-active");
        document.body.classList.remove("bNoScroll");
    }
    else
    {
        searchBar.style.display = "block";
        navBar.style.display = "none";
        burger.classList.remove("is-active");
        document.body.classList.remove("bNoScroll");
    }
}

function dropSearchAD(){
    if (searchBar.style.display === "block")
    {
        searchBar.style.display = "none";
        burger.classList.remove("is-active");
        searchBarAdmin.classList.remove("adminSearchBar");
    }
    else
    {
        searchBar.style.display = "block";
        burger.classList.remove("is-active");
        searchBarAdmin.classList.add("adminSearchBar");
    }
}

/* Las funciones de abajo por el momento no tienen uso en la pagina*/

function dropSubCategoryMenu (id) {
    let list = document.getElementById(`${id}`);
    list.classList.toggle("active");
    navBar.style.display = "none";
    searchBar.style.display = "none";
}

function closeWindow () {
    document.querySelector(".active").classList.remove("active")
}

/* Boton para el Carrito de Compras */

function openPaymentSection(event, payOption) {
    var i, tabcontent, buttonOption;
    tabcontent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    buttonOption = document.getElementsByClassName("buttonSelected");
    for (i = 0; i < buttonOption.length; i++) {
        buttonOption[i].className = buttonOption[i].className.replace(" active", "");
    }
    document.getElementById(payOption).style.display = "grid";
    event.currentTarget.className += " active";
}


/* Calcular Costo de Envio */

function shippingCost(){
    let cpCode = document.getElementById("cpcode").value;

    let getPrice = document.getElementById("getTotalPrice");

    let fieldToReplace = document.getElementById("shippingCost");

    let priceToReplace = document.getElementById("totalShipping");

    getPrice = normal(getPrice);
    getPrice = Number(getPrice);

    let cost = 0.400;

    let finalCost = cpCode * cost;

    if(cpCode > 0 && cpCode.length > 3)
    {
        if(finalCost < 600)
        {
            finalCost = 720;
        }
        else if(finalCost > 2300)
        {
            finalCost = 1900;
        }

        finalCost = Math.round(finalCost);

        fieldToReplace.innerHTML = "$"+finalCost;
        priceToReplace.innerHTML = "$"+numberWithCommas(finalCost+getPrice);
    }
    else
    {
        fieldToReplace.innerHTML = "$";
    }
}

function shippingCostCart(){
    let cpCode =document.getElementById("cpcode").value;

    let fieldToReplace = document.getElementById("shippingCost");

    let cost = 0.400;

    let finalCost = cpCode * cost;

    if(cpCode > 0 && cpCode.length > 3)
    {
        if(finalCost < 600)
        {
            finalCost = 720;
        }
        else if(finalCost > 2300)
        {
            finalCost = 1900;
        }

        finalCost = Math.round(finalCost);
    
        fieldToReplace.innerHTML = "$"+finalCost;
    }
    else
    {
        fieldToReplace.innerHTML = "$";
    }
}


function showPassword(passSection, eyeBTN) {
    let button = document.getElementById(passSection);
    let icon = document.getElementById(eyeBTN);
    
    if (button.type === "password") {
        button.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        button.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}

function formAnim(){

    let captchaCheck = grecaptcha.getResponse().length;

    if (captchaCheck) {
        document.querySelector(".contactPage").style.display = "none";
        document.querySelector(".messageSent").style.display = "block";
        setTimeout(function() {
            location.reload()
        }, 10000);
        /* se recarga luego de 10 segundos */
        setTimeout(true);   
    }
    else
    {
        let caja = document.querySelector(".g-recaptcha div div");
        caja.style.height = "100%";
        caja.style.border = "1px solid red";
        console.log("Por Favor haga click en el Captcha");
    }
}
