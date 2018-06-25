var animals = ["rabbit", "monkey", "frog", "lizard", "squirrel", "cow", "dog", "cat", "giraffe", "turtle"]

var buttonGenerator = function() {
    $(".buttons").empty();
    animals.forEach(function(element) {
        var button = $("<button>").attr("class","animalBtn btn btn-dark border-white").text(element);
        $(button).attr("data-animal",element);
        $(".buttons").append(button);
    })
}
buttonGenerator();

var newButton = function(buttonName) {
    var button = $("<button>").attr("class","animalBtn btn btn-dark border-white").attr("status", "new").css("display", "none").text(buttonName + " ");
    var badge = $("<span>").addClass("badge badge-light").text("New");
    $(button).attr("data-animal",buttonName);
    $(button).append(badge);
    $(".buttons").append(button);
    $(button).slideDown(200);
    
}
$("#animalSubmit").on("click", function() {
    event.preventDefault();
    var animalValue = $("#animalEntry").val().trim();
    animals.push(animalValue);
    $("#animalEntry").val("");
    newButton(animalValue);
})

$(document.body).on('click', '.animalBtn' ,function(){
    $(".images").empty();
    $(".images").css("display", "none");
    $(".animalBtn").removeClass("disabled");
    $(this).addClass("disabled");
    var status = $(this).attr("status");
    if (status === "new") {
        $(this).attr("status", "old");
        var span = $(this).children()
        $(span).slideToggle(100);
    }
    var animal = $(this).data("animal");
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?api_key=Rze1PjMB7bfIJp8mFpv83b1MG03cf3y5&q=" + animal + "&limit=10",
        method: "GET"
    }).then(function(response) {
        for (i=0; i < response.data.length; i++) {
            var figure = $("<figure>").addClass("figure border border-dark rounded bg-light text-center p-1");
            var image = $("<img>").attr("src", response.data[i].images.downsized.url).attr("state", "animate").attr("stillUrl", response.data[i].images.downsized_still.url).attr("animateUrl", response.data[i].images.downsized.url).addClass("animalImage img-fluid rounded");
            var figCaption = $("<figcaption>").addClass("figure-caption").text(response.data[i].title)
            $(figure).append(image); 
            $(figure).append(figCaption);
            $(".images").append(figure);
        }
        setTimeout(function() {
            $(".images").slideDown("slow");
        },100)
    })
})
$(document.body).on('click', '.animalImage' ,function(){
    console.log("click")
    var state = $(this).attr("state");

    if (state=== "animate") { 
        $(this).attr("src", $(this).attr("stillUrl"));
        $(this).attr("state", "still")
    }
    else {
        $(this).attr("src", $(this).attr("animateUrl"));
        $(this).attr("state", "animate")
    }
})

/* $(".head").slideToggle();
setTimeout(function() {
    $(".buttons").slideToggle();
    setTimeout(function() {
        $(".animalEntry").slideToggle();
    },500)
},500) */

