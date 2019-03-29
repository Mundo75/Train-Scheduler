var config = {
    apiKey: "AIzaSyABASYJUxrJORzWhjcDXOQeU0KhJaYiAOM",
    authDomain: "train-scheduler-dc795.firebaseapp.com",
    databaseURL: "https://train-scheduler-dc795.firebaseio.com",
    projectId: "train-scheduler-dc795",
    storageBucket: "train-scheduler-dc795.appspot.com",
    messagingSenderId: "304076080061"
};
    firebase.initializeApp(config);  

    var database = firebase.database();
    

    $("#add-train-btn").on("click", function(event) {

        event.preventDefault();
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();
        var trainStart = $("#start-input").val().trim();

        var newTrain = {
            name:           trainName,
            destination:    trainDestination,
            frequency:      trainFrequency,
            arrival:        trainStart,
            death:          Math.floor(Math.random()*9),
        }
        database.ref().push(newTrain);
    

        //var trainDeath = Math.floor(Math.random()*9);
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.arrival);
        console.log(newTrain.death);

        alert("New Train successfully added");
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
        $("#start-input").val("");
     
   
    });  

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        var newName = childSnapshot.val().name;
        var newDestination = childSnapshot.val().destination;
        var newFrequency = childSnapshot.val().frequency;
        var newArrival = childSnapshot.val().arrival;
        var deathCount = childSnapshot.val().death;
      
        
        console.log(newName);
        console.log(newDestination);
        console.log(newFrequency);
        console.log(newArrival);

        var currentTime = moment();
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        

        var firstTimeConverted = moment(newArrival, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted);

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % newFrequency;
            console.log(tRemainder); 

        var tMinutesTillTrain = newFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
        var newRow = $("<tr>").append(
            $("<td>").text(newName),
            $("<td>").text(newDestination),
            $("<td>").text(newFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain),
            $("<td>").text(deathCount)
        );

        newRow.addClass("text-center");
        
        
        $("#employee-table > tbody").append(newRow);

    });