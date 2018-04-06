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
  // connectionsRef references a specific location in our database.
  // All of our connections will be stored in this directory.
  var connectionsRef = database.ref("/connections");
  // '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");
// var connectplayers = connectionsRef.child("/players");



  var player1 = {
      name: '',
      choice: '',
      losses: 0,
      wins: 0,
      status: 'not selected',
      turn: '',
      message(playername) {
        if (!greetingComplete) {
            $(".playerinfo").remove();
            var greeting = $("<h3>").text("Hi " + playername + "!" + "You are Player 1!");
            $(".greeting").append(greeting);
            greetingComplete = true;
            player1.status = "selected";
            $(".greeting").addClass("panel panel-default player1greeting")}
            {database.ref().update({
                name1: player1.name,
                status1: player1.status})}}
            };

  var player2 = {
    name: '',
    choice: '',
    losses: 0,
    wins: 0,
    status: 'not selected',
    turn: '',
    message(playername) {
        if (!greetingComplete) {
        $(".playerinfo").remove();
        var greeting = $("<h3>").text("Hi " + playername + "!" + "You are Player 2!");
        $(".greeting").append(greeting);
        greetingComplete = true;
        player2.status = "selected";
        $(".greeting").addClass("panel panel-default player2greeting")}
        {database.ref().update({
            name2: player2.name,
            status2: player2.status})}}
        };

var greetingComplete = false;


// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});


function createUserID(player) {
    $(".playerinfo").html('<form role="form"><div class="form-group"><label for="name-input">Name:<input class="form-control" id="' + player + 'input" type="text"><button class="btn btn-default" id="' + player + '" + "type="start">Start</button></form>')}

function characterInfoDOM(player) {

    if ($(".greeting").hasClass("player1greeting")) {
        $(".player1").html('<h3>' + player1.name + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>');
        $(".player2").html('<h3>' + player + '</h3>' + '<h4> Wins' + player2.wins + '</h4>' + '<h4> Losses' + player2.losses + '</h4>');}

    if ($(".greeting").hasClass("player2greeting")) {
        $(".player1").html('<h3>' + player + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>');
        $(".player2").html('<h3>' + player2.name + '</h3>' + '<h4> Wins' + player2.wins + '</h4>' + '<h4> Losses' + player2.losses + '</h4>');}
    }   
    

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

database.ref().on("value", function(snapshot) { 
        console.log(snapshot.val());
    //when the window pops up, if the start button has an id of 'initial button,' give the button an id of player1 and update firebase
    if ($(".btn-default").attr("id") === "initialbutton") {
        createUserID("player1");
        {database.ref().update({
            name1: "player1"})}
    }
    //when the window pops up, if the start button has an id of 'player1,' give the button an id of player2 and update firebase 
    else if ($(".btn-default").attr("id") === "player1") {
        createUserID("player2");
        {database.ref().update({
            name2: "player2"})}}

    //If their snapshot from their ref matches the name they typed in as opposed to 'player1'/'player2'
    if (snapshot.val().name1 === player1.name) {
        player1.message(player1.name);
    }

    if (snapshot.val().name2 === player2.name) {
        player2.message(player2.name);
    }

    //When the Player 1 name field has been inputted
    if (snapshot.val().status1 === player1.status && snapshot.val().name1 !== "player1") { 
        characterInfoDOM(snapshot.val().name2);
    }

    //When the Player 2 name field has been inputted
    if (snapshot.val().status2 === player2.status && snapshot.val().name2 !== "player2") {
        characterInfoDOM(snapshot.val().name1);
    }

// // Capture Button Click
$(document).on('click', '.btn-default', function() {
    event.preventDefault();
    if ($("input").attr("id") === "player1input") {
        player1.name = $("#player1input").val().trim();
        database.ref().update({
            name1: player1.name,
        });}

    if ($("input").attr("id") === "player2input") {
        player2.name = $("#player2input").val().trim();
        database.ref().update({
            name2: player2.name,
        });
    }
})

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
