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
            $(".greeting").addClass("panel", "panel-default")}
            {database.ref().update({
                status1: "selected"})}}
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
        $(".greeting").addClass("panel", "panel-default")}
        {database.ref().update({
            status2: "selected"})}}
        };

var player1name = player1.name;
var player2name = player2.name;
var player1status = player1.status;
var player2status = player2.status;
var player1realname = '';
var player2realname = '';
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


function createUser(player) {

    $(".playerinfo").html('<form role="form"><div class="form-group"><label for="name-input">Name:<input class="form-control" id="' + player + 'input" type="text"><button class="btn btn-default" id="' + player + '" + "type="start">Start</button></form>')
}

function characterInfoDOM() {
    $(".player1").html('<h3>' + player1realname + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')

    $(".player2").html('<h3>' + player2realname + '</h3>' + '<h4> Wins' + player2.wins + '</h4>' + '<h4> Losses' + player2.losses + '</h4>')
    }

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

database.ref().on("value", function(snapshot) { 
        console.log(snapshot.val());
    if ($(".btn-default").attr("id") === undefined) {
        createUser("player1");
        {database.ref().update({
            name1: "player1"})}
    }

    else if ($(".btn-default").attr("id") === "player1") {
        createUser("player2");
        {database.ref().update({
            name2: "player2"})}
    }

    //If their snapshot from their ref matches the name they typed in as opposed to 'player1'/'player2'
    if (snapshot.val().name1 === player1realname) {
        characterInfoDOM();
        player1.message(player1realname);
    }

    if (snapshot.val().name2 === player2realname) {
        characterInfoDOM();
        player2.message(player2realname);
    }

    if (snapshot.val().status1 === "selected" && snapshot.val().name2 !== "player2") { 
        characterInfoDOM(player2realname);
    }

    if (snapshot.val().status2 === "selected" && snapshot.val().name1 !== "player1") {
        characterInfoDOM(player1realname);
    }

// // Capture Button Click
$(document).on('click', '.btn-default', function() {
    event.preventDefault();
    if ($("input").attr("id") === "player1input") {
        player1realname = $("#player1input").val().trim();
        database.ref().update({
            name1: player1realname,
        });}

    if ($("input").attr("id") === "player2input") {
        player2realname = $("#player2input").val().trim();
        database.ref().update({
            name2: player2realname,
        });}
})

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
