$(document).ready(function () {
    start();
    //variables for wins and losses
    var wins = 0;
    console.log(wins);
    var losses = 0;
    console.log(losses);


    function start() {
        //reset portion where the number is erased and the user number resets back to 0
        $("#compNumber").empty();
        $("#userNumber").html(0);
        currentScore = 0;
        //target number is chosen between 19 and 120 with Math.floor and Math.random
        targetNumber = Math.floor(Math.random() * (120 - 19) + 19);
        //pushes the targetNumber into the div
        $("#compNumber").html(targetNumber);
        console.log(targetNumber);


        //each color is given a random value, given a variable corresponding to their picture div, given the class "gem-image", and given the attribute "data-gemValue"
        //blue
        var blueValue = Math.floor(Math.random() * 12) + 1;
        console.log(blueValue);

             var blueGem = $("#blue");

                    blueGem.addClass("gem-image");

                          blueGem.attr("data-gemValue", blueValue);

        //red
        var redValue = Math.floor(Math.random() * 12) + 1;
        console.log(redValue);

             var redGem = $("#red");

                 redGem.addClass("gem-image");

                     redGem.attr("data-gemValue", redValue);

        //pink
        var pinkValue = Math.floor(Math.random() * 12) + 1;
        console.log(pinkValue);

        var pinkGem = $("#pink");

                    pinkGem.addClass("gem-image");

                         pinkGem.attr("data-gemValue", pinkValue);


        //green
        var greenValue = Math.floor(Math.random() * 12) + 1;
        console.log(greenValue);

             var greenGem = $("#green");

                        greenGem.addClass("gem-image");

                            greenGem.attr("data-gemValue", greenValue);
    }
    //now that each gem has the class "gem-image", I select all of them and give them the on click function
    $(".gem-image").on("click", function () {

        //each gem has a data-gemValue assigned as attribute. When a gem is clicked, that value is obtained and given the variable crystalValue
        var crystalValue = ($(this).attr("data-gemValue"));

        //crystalValue is currently a string, so it needs to be made into an integer for the game to work
        crystalValue = parseInt(crystalValue);

        //for each crystalValue, the currentScore is updated
        currentScore += crystalValue;

        //the currentScore is put into the userNumber div
        $("#userNumber").text(currentScore);

        // if targetNumber = currentScore, its a win. Wins is incremented by 1, You won is put into the win-lose div, and is given the attributes class and green-font
        if (targetNumber === currentScore) {
            $("#win-lose").html("<h4>You won!</h4>").attr("class", "green-font");
            wins += 1;
            //win variable is put into the wins div
            $("#wins").text(wins);
            //resets by starting the game again
            start();
        }
        //if user's score gets larger than targetnumber, they lose. increment losses by 1, put you lose in the div, and give a red-font attribute
        else if (targetNumber < currentScore) {
            //updates page to say user lost
            $("#win-lose").html("<h4>You lost!</h4>").attr("class", "red-font");
            //loss count is increased by 1
            losses += 1;
            //loss count is updated on the page
            $("#losses").text(losses);
            //reset
            start();
        }

    })







});