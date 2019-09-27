/*let showButton = document.getElementById("showbutton");
let modal = document.getElementById("modal-container");
let remove = document.getElementById("delete");

showButton.addEventListener("click" , function() {
    modal.classList.add("display");
});
remove.addEventListener("click", function() {
    modal.classList.remove("display");
});
*/
let modalContainer = $("#modal-container");
$("#showbutton").on("click", function(){
    modalContainer.fadeIn(700, function() {
        modalContainer.addClass("display");
    })
});

$("#delete").on("click", function() {
    modalContainer.fadeOut(700, function() {
        modalContainer.removeClass("display");
    });
});
