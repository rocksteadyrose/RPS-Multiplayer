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
      choice: '',
      points: '' ,
      message(playername) {
        if (!greetingComplete) {
            $(".playerinfo").remove();
            var greeting = $("<h3>").text("Hi " + playername + "!" + "You are Player 1!");
            $(".greeting").append(greeting);
            greetingComplete = true;
            player1.status = "selected";
            $(".greeting").addClass("panel panel-default player1greeting")}
            {database.ref().update({
                name1: player1a,
                status1: player1.status})}}
            };

    var player2 = {
        name: '',
        choice: '',
        losses: 0,
        wins: 0,
        status: 'not selected',
        turn: '',
        choice: '',
        points: '' ,
        message(playername) {
            if (!greetingComplete) {
            $(".playerinfo").remove();
            var greeting = $("<h3>").text("Hi " + playername + "!" + "You are Player 2!");
            $(".greeting").append(greeting);
            greetingComplete = true;
            player2.status = "selected";
            $(".greeting").addClass("panel panel-default player2greeting")}
            {database.ref().update({
                name2: player2a,
                status2: player2.status})}}
            };

var greetingComplete = false;
var whosplaying = null;
var player1a = player1.name;
var player2a = player2.name;


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
    database.ref().once("value", function(snapshot) { 
    $(".playerinfo").html('<form role="form"><div class="form-group"><label for="name-input">Name:<input class="form-control" id="' + player + 'input" type="text"><button class="btn btn-default" id="' + player + '" + "type="start">Start</button></form>');
    
    whosplaying = player;
 
    database.ref().update({
        whichPlayer: whosplaying});

    snapshot.val().whichPlayer;
    })
}

function createInitialDiv(player){
    if (player1.name === ""){
        $(".playerturn").attr("id", player + "turn");
        $(".RPS").attr("id", "rps" + player);
        var createDiv = $("<div>").attr("id", player + "id");
        $(".panel-body").append(createDiv);
        // $(".panel-default").html('<div id=' + player + 'id>');
    }

    if (player2.name === ""){
        $(".playerturn").attr("id", player + "turn");
        var createDiv2 = $("<div>").attr("id", player + "id");
        $(".panel-body").append(createDiv2);
        // $(".panel-default").html('<div id=' + player + 'id>');
    }
}
    

function initialInputs(){
database.ref().once("value", function(snapshot) { 
        console.log(snapshot.val());
    //when the window pops up, if the start button has an id of 'initial button,' give the button an id of player1 and update firebase

        database.ref().update({
        whichPlayer: whosplaying});

    if (snapshot.val().whichPlayer === undefined) {
        console.log("null to player1")
        createUserID("player1");
        createInitialDiv("player1");
        DOMFunctions();
    }

    else if (snapshot.val().whichPlayer
    === "player1") {
        console.log("player1 to player2")
        createUserID("player2");
        createInitialDiv("player2");
        DOMFunctions();}

    //When the Player 1 name field has been inputted
    if (snapshot.val().status1 === player1.status && snapshot.val().name1 !== "player1") { DOMFunctions(snapshot.val().name1, snapshot.val().name2);}

    //When the Player 2 name field has been inputted
    if (snapshot.val().status2 === player2.status && snapshot.val().name2 !== "player2") {DOMFunctions(snapshot.val().name1, snapshot.val().name2);}

}), function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
}

// // Capture Button Click
$(document).on('click', '.btn', function() {
     
    event.preventDefault();
    database.ref().once("value", function(snapshot) { 

    if ($("input").attr("id") === "player1input") {
        console.log("player 1 name true");
        player1a = $("#player1input").val().trim();
        createUserID("player1");
        createInitialDiv("player1");
        snapshot.val().name1;
        database.ref().update({
            name1: player1a,
            whichPlayer: whosplaying});
        snapshot.val().whichPlayer;
        player1.message(player1a);
        DOMFunctions()}

    else if ($("input").attr("id") === "player2input") {
        console.log("player 2 name true");
        player2a = $("#player2input").val().trim();
        createUserID("player2");
        createInitialDiv("player2");
        snapshot.val().name2;
        database.ref().update({
            name2: player2a,
            whichPlayer: whosplaying});
        snapshot.val().whichPlayer;
        player2.message(player2a);
        DOMFunctions()}
        })
});

function DOMFunctions(firstplayer, secondplayer) {

    //If first player and second player haven't been picked
database.ref().on("value", function(snapshot) { 

if (snapshot.val().name1 === undefined && snapshot.val().name2 === undefined) {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1 </h3><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1 </h3><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');
}

//If first player has been picked but second player hasn't
 if (snapshot.val().name1 !== undefined && snapshot.val().name2 === undefined) {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>')}

//If first player hasn't been picked but second player has
if (snapshot.val().name1 === undefined && snapshot.val().name2 !== undefined) {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')}

//If both have been picked

if (snapshot.val().name1 !== undefined && snapshot.val().name2 !== undefined && snapshot.val().status1 === "selected" && snapshot.val().status2 === "selected"){
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses +'</h4><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses +'</h4><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>');
}

})}


function pickingTurns() {

    database.ref().on("value", function(snapshot) {
    if (snapshot.val().name1 !== undefined && snapshot.val().name2 !== undefined && snapshot.val().status1 === "selected" && snapshot.val().status2 === "selected"){

        player1.status = "game ready";
        player2.status = "game ready";
        database.ref().update({
            status1: player1.status,
            status2: player2.status,
            turn: snapshot.val().name1})
        }
    
        //PLAYER 1 INITIAL TURN - UPDATE DOM

        if (snapshot.val().status1 === "game ready" && snapshot.val().status2 === "game ready"){
            
            console.log("ok")
            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>' + "It's your turn!</h3>");

            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>'  + "Waiting for" + snapshot.val().name1 + "to choose!</h3>");

            player1.status = "choosing RPS";
            player2.status = "waiting for player 2 to choose";
            database.ref().update({
                status1: player1.status,
                status2: player2.status})
            // snapshot.val().status1;
        }
    
        if (snapshot.val().status1 === "waiting for player 2 to choose" && snapshot.val().status2 === "choosing RPS"){

            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>' + "Waiting for" + snapshot.val().name2 + "to choose!</h3>");
    
            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>'  + "It's your turn!</h3>");
        }
    
    })}

function RPS() {
    database.ref().on("value", function(snapshot) {
        //If Player 1 is choosing
        if (snapshot.val().status1 === "choosing RPS") {
        $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h3>"<button id="rock">"Rock</button></h3><h3>"<button id="paper">"Paper</button></h3><h3>"<button id="scissors">"Scissors</h3>');
}

    if (snapshot.val().status2 === "choosing RPS") {
    $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h3>"<button id="rock">"Rock</button></h3><h3>"<button id="paper">"Paper</button></h3><h3>"<button id="scissors">"Scissors</h3>');}

    $(document).on('click', 'button', function() {
        //If player 1 chose rock
        if ($("button").attr("id") === "rock" && snapshot.val().status1 === "choosing RPS") {
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Rock</h2>');
            player1.status = "waiting for player 2 to choose";
            player2.status = "choosing RPS";
                database.ref().update({
                    status1: player1.status,
                    status2: player2.status,
                    turn: snapshot.val().name2})
                }

                })
            })}


initialInputs();
pickingTurns();
RPS();

