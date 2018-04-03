
//Create player objects and variables (PLAYERS: 1/2, CHOICE, LOSSES, NAME, WINS) (TURN)
//If else statements for RPS
//Chat box
//Player leave and disconnect message and removes data from database

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdpVUiXA3Z_4BjUlIHqBgCXOeZpD-cGNo",
    authDomain: "rps-rpg.firebaseapp.com",
    databaseURL: "https://rps-rpg.firebaseio.com",
    storageBucket: "rps-rpg.appspot.com"
  };
  
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();

  var selectedPlayer = "none";
  var chosenplayer1 = "not selected";
  var chosenplayer2 = "not selected";

  var player1 = {
      name: '',
      choice: '',
      losses: 0,
      wins: 0,
      turn: '',
      message() {
          $("#name-input").remove();
          var greeting = $("<h3>").text("Hi " + player1.name + "!" + "You are Player 1!");
          $(".greeting").append(greeting);
      }
  };

  var player2 = {
    name: '',
    choice: '',
    losses: 0,
    wins: 0,
    turn: '',
    message(playername) {
        $("#name-input").remove();
        var greeting = $("<h3>").text("Hi " + player2.name + "!" + "You are Player 2!");
        $(".greeting").append(greeting);
    }
};

// Capture Button Click
$(document).on("click", "#add-user", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    if (chosenplayer1 && chosenplayer2) {
    player1.name = $("#name-input").val().trim();
    $("#add-user").attr("id", "player1ID");
    chosenplayer1 = "selected";
    chosenplayer2 = "selecting";
    // player1.message();
}
    else if (chosenplayer1 === "selected" && chosenplayer2 === "selecting") {
        console.log(chosenplayer1 === "selected" && chosenplayer2 === "selecting");
    player2.name = $("#name-input").val().trim();
    // player2.message();
    chosenplayer2 = "selected";}

    database.ref().set({
        name1: player1.name,
        name2: player2.name
      });
     // Log the player names
        console.log(player1.name);
        console.log(player2.name);
    });

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

database.ref().on("value", function(snapshot) {

    console.log(snapshot.val());
    console.log(snapshot.val().name1);
    console.log(snapshot.val().name2);

    player1.name = snapshot.val().name1;
    player2.name = snapshot.val().name2;

    if (chosenplayer1 === "selected") {
        console.log("hi");
        player1.name = snapshot.val().name1;
        player1.message(player1.name);}

    if (chosenplayer1 === "selected" && chosenplayer2 === "selected") {
        player2.name = snapshot.val().name2;
        player2.message(player2.name);}

        // $("#name-display").text(snapshot.val().name);

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });




// if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

//     if ((userGuess === "r") && (computerGuess === "s")) {
//       wins++;
//     } else if ((userGuess === "r") && (computerGuess === "p")) {
//       losses++;
//     } else if ((userGuess === "s") && (computerGuess === "r")) {
//       losses++;
//     } else if ((userGuess === "s") && (computerGuess === "p")) {
//       wins++;
//     } else if ((userGuess === "p") && (computerGuess === "r")) {
//       wins++;
//     } else if ((userGuess === "p") && (computerGuess === "s")) {
//       losses++;
//     } else if (userGuess === computerGuess) {
//       ties++;
//     }}