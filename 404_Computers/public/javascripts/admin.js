function leftPanel(){
    let button = document.querySelector(".leftPanelAdmin");
    button.classList.toggle("leftPanelActive");
    let home = document.querySelector(".AdminContent");
    home.classList.toggle("mainPanelActive");
    document.body.classList.toggle("bNoScroll");
}

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

function submitThisForm(event,form) {
    fetch(form.action, {
        method:'post',
        body: new FormData(form)
    });

    event.preventDefault();
}

let imageEditProduct = document.querySelectorAll("#examinar");

for (let i = 0; i < imageEditProduct.length; i++) {
    
    imageEditProduct[i].addEventListener("change",
    function showImageUploaded(){
        if(imageEditProduct[i].files && imageEditProduct[i].files[0]){

            var reader = new FileReader();
            var imageRPC = document.querySelectorAll('#imagePreviewEdit');

            reader.onload = function(e){
                imageRPC[i].src = e.target.result;
            };

            reader.readAsDataURL(imageEditProduct[i].files[0]);

            
        }
    })
    
}

let deleteImageProduct = document.querySelectorAll("#delBTNP")

for (let i = 0; i < deleteImageProduct.length; i++) {
    deleteImageProduct[i].addEventListener("click" , 
    function deleteImageUploaded(){
        var deleteThisIMG = document.querySelectorAll('#imagePreviewEdit')
        deleteThisIMG[i].src = "/images/products/default.jpg";
    })
}

