$(document).ready(function(){
    var topics = ["atlanta falcons","baltimore ravens","detroit lions","football", "peyton manning", "eli manning"];

    $(topics).each(function render(i) {
        $('<input type="button" class=topicButton value="' + topics[i] +'"/>').appendTo($("#allButtons"));
    });

    $(document).on("click",".topicButton",function(){

        $("#gifdiv").empty();

        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search?api_key=ce69ca247693435abefbd3b1fa395849&limit=10&q=" + this.value,
            method: "GET"

        }).done(function(response){

            $(response.data).each(function(j){

                var newDiv = $("<div>");

                var rating = "Rating: " + response.data[j].rating;

                var newImage = $("<img>");

                newImage.attr("src","https://i.giphy.com/media/" + response.data[j].id + "/200_s.gif");

                newImage.attr("data-animate","https://i.giphy.com/media/" + response.data[j].id + "/200.gif");

                newImage.attr("data-still","https://i.giphy.com/media/" + response.data[j].id + "/200_s.gif");

                newImage.attr("data-state","still");

                newImage.addClass("topicImage");

                newDiv.append(rating);

                newDiv.append(newImage);

                $("#gifdiv").append(newDiv);
            });
        });
    });

    $(".addButton").on("click", function(event){

        event.preventDefault();

        var userInput = $("#userInput").val();

        userInput = userInput.toLowerCase();

        if (userInput !== "" && topics.indexOf(userInput) === -1){

            $("#allButtons").empty();

            topics.push(userInput);

            $(topics).each(function render(k) {
                $('<input type="button" class=topicButton value="' + topics[k] +'"/>').appendTo($("#allButtons"));
            });
        }
    });

    $(document).on("click", ".topicImage",

        function(event){

            var state = $(this).attr("data-state");

            if (state === "still"){

                $(this).attr("src", $(this).attr("data-animate"));

                $(this).attr("data-state","animate");

            } else {

                $(this).attr("src", $(this).attr("data-still"));

                $(this).attr("data-state","still");
            }
        })
});