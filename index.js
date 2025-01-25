document.querySelector(".contact").addEventListener("click", function() {
    window.location.href = "./contact.html";

    var tag = this.innerHTML.toLowerCase();
    tag = tag.slice(0,7);
    animation(tag);
});


var number = document.querySelectorAll(".tab").length;

for(var i = 0; i < number; i++){
    document.querySelectorAll(".tab")[i].addEventListener("click", function(){
        var tag = this.innerHTML.toLowerCase();
        animation(tag);
    });
}


function animation (element) {
    var animate = document.querySelector("." + element);

    animate.classList.add("pressed");

    setTimeout(function(){
        animate.classList.remove("pressed");
    }, 50);
}


