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

$("#animalSubmit").on("click", function() {
    event.preventDefault();
    var animalValue = $("#animalEntry").val().trim();
    animals.push(animalValue);
    $("#animalEntry").val("");
    buttonGenerator();
})

$(document.body).on('click', '.animalBtn' ,function(){
    $(".images").empty();
    var animal = $(this).data("animal");
    console.log(animal);
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?api_key=Rze1PjMB7bfIJp8mFpv83b1MG03cf3y5&q=" + animal + "&limit=10",
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (i=0; i < response.data.length; i++) {
            var figure = $("<figure>").addClass("figure border border-dark rounded bg-light");
            var image = $("<img>").attr("src", response.data[i].images.downsized.url).attr("state", "animate").attr("stillUrl", response.data[i].images.downsized_still.url).attr("animateUrl", response.data[i].images.downsized.url).addClass("animalImage img-fluid");
            var figCaption = $("<figcaption>").addClass("figure-caption").text(response.data[i].title)
            $(figure).append(image); 
            $(figure).append(figCaption);
            $(".images").append(figure);
        }
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

