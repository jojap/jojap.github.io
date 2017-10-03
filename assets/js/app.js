$(document).ready(function(){
    //initializing variables
    var database = firebase.database();
    var trainName;
    var destination;
    var initialTrainTime;
    var frequency;

    $("#submit").on("click", function(event){

        event.preventDefault();

            trainName = $("#trainName").val().trim();
            destination = $("#destination").val().trim();
            initialTrainTime = $("#initialTrainTime").val().trim();
            frequency = $("#frequency").val().trim();

            if (trainName === "" || destination === "" || initialTrainTime === "" || frequency === "") {
                alert("Please input all data");
            } else if (moment(initialTrainTime,"HH:mm",true).isValid() && (frequency%1) === 0) {
                database.ref().push({
                    trainName,
                    destination,
                    initialTrainTime,
                    frequency,
                    timeAdded: firebase.database.ServerValue.TIMESTAMP
                });

                $("input").val("");
            }
            else {
                alert("Please examine your time format");
            }

        });
database.ref().orderByChild("timeAdded").on("child_added", function(snapshot) {

    var snapshotData = snapshot.val();

    var currentTime = moment();

        var initialTrain = moment(snapshotData.initialTrainTime, "HH:mm");

        var diffTime = moment().diff(initialTrain, "minutes");
        var timeRemainder = diffTime % snapshotData.frequency;
        var minutesUntilTrain = snapshotData.frequency - timeRemainder;
        var nextTrain = moment().add(minutesUntilTrain,"minutes");

        var newRow = $("<tr>");

                var newTrainNameData = $("<td>");
                var newDestinationData = $("<td>");
                var newFrequencyData = $("<td>");
                var nextArrivalData = $("<td>");
                var minutesAwayData = $("<td>");

                    newTrainNameData.append(snapshotData.trainName);
                    newDestinationData.append(snapshotData.destination);
                    newFrequencyData.append(snapshotData.frequency);
                    nextArrivalData.append(moment(nextTrain).format("HH:mm"));
                    minutesAwayData.append(minutesUntilTrain);

                    newRow.append(newTrainNameData, newDestinationData,  newFrequencyData, nextArrivalData, minutesAwayData);

                    $("tbody").append(newRow);
    });
});