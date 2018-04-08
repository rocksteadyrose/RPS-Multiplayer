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
    choice: '',
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
    database.ref().on("value", function(snapshot) { 
    $(".playerinfo").html('<form role="form"><div class="form-group"><label for="name-input">Name:<input class="form-control" id="' + player + 'input" type="text"><button class="btn btn-default" id="' + player + '" + "type="start">Start</button></form>');

    whosplaying = player;

    database.ref().update({
        name1: player1a,
        whichPlayer: whosplaying});

    snapshot.val().whichPlayer;
    })
}

function createInitialDiv(player){
    if (player1.name === ""){
        var createDiv = $("<div>").attr("id", player + "id");
        $(".panel-body").html(createDiv);
        // $(".panel-default").html('<div id=' + player + 'id>');
    }

    if (player2.name === ""){
        var createDiv2 = $("<div>").attr("id", player + "id");
        $(".panel-body").html(createDiv2);
        // $(".panel-default").html('<div id=' + player + 'id>');
    }
}

// function characterInfoDOM(firstplayer, secondplayer) {

//     //If first player and second player haven't been picked
// database.ref().on("value", function(snapshot) { 

// if (snapshot.val().name1 === "player1" && snapshot.val().name2 === "player2") {
//     $("#player1id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1 </h3><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');

//     $("#player2id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1 </h3><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');
// }

// //If first player has been picked but second player hasn't
//  if (snapshot.val().name1 !== "player1" && snapshot.val().name2 === "player2") {
//     $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');

//     $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>')}

// //If first player hasn't been picked but second player has
// if (snapshot.val().name1 === "player1" && snapshot.val().name2 !== "player2"){
//     $("#player1id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')

//     $("#player2id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')}

// //If both have been picked

// if (snapshot.val().name1 !== "player1" && snapshot.val().name2 !== "player2" && snapshot.val().status1 === "selected" && snapshot.val().status2 === "selected"){
//     $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses +'</h4><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')

//     $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses +'</h4><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>');
// }
// })}

// function pickingTurns() {

//     database.ref().on("value", function(snapshot) {
//     if (snapshot.val().name1 !== "player1" && snapshot.val().name2 !== "player2" && snapshot.val().status1 === "selected" && snapshot.val().status2 === "selected"){

//         player1.status = "game ready";
//         player2.status = "game ready";

//         database.ref().update({
//             status1: player1.status,
//             status2: player2.status,
//             turn: player1.name}) 
        
//         }})
    
//     database.ref().on("value", function(snapshot) {

//     if (snapshot.val().status1 === "game ready" && snapshot.val().status2 === "game ready") {
//         if (snapshot.val().turn === snapshot.val().name1) {
//             {
//             $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + "It's your turn! <br></h3>");}

//             $("#player2id").html('<div class="row"><div class="col-md-12"><h3>'  + "It's" + snapshot.val().turn + "'s" + "turn! <br></h3>");}}})}
    

function mainFunctionality(){
database.ref().on("value", function(snapshot) { 
        console.log(snapshot.val());
    //when the window pops up, if the start button has an id of 'initial button,' give the button an id of player1 and update firebase

    if (player === null) {
        console.log("null to player1")
        createUserID("player1");
        createInitialDiv("player1");
        // characterInfoDOM();
        player = "player1";
    }

    else if (player === "player1") {
        console.log("player1 to player2")
        createUserID("player2");
        createInitialDiv("player2");
        // characterInfoDOM();
        player === "player2"
    }
})}


    // if ($(".btn-default").attr("id") === "initialbutton") {
    //     console.log("player1");
    //     createUserID("player1");
    //     {database.ref().update({
    //         name1: "player1"})}
    //         createInitialDiv("player1");
    //         characterInfoDOM();
    // }

    // //when the window pops up, if the start button has an id of 'player1,' give the button an id of player2 and update firebase 
    // else if ($(".btn-default").attr("id") === "player1" && snapshot.val().name1 === "player1") {
    //      console.log("player1");
    //     createUserID("player2");
    //     {database.ref().update({
    //         name2: "player2"})}
    //         createInitialDiv("player2");
    //         characterInfoDOM();
    //     } 


    //     else if ($(".btn-default").attr("id") === "player2" && snapshot.val().name2 === "player2") {
    //         console.log("player1");
    //        createUserID("player2");
    //        {database.ref().update({
    //            name2: "player2"})}
    //            createInitialDiv("player2");
    //            characterInfoDOM();
    //        } 

    //If their snapshot from their ref matches the name they typed in as opposed to 'player1'/'player2'

    database.ref().update({
        whichPlayer: whosplaying});

    if (snapshot.val().whichPlayer === null) {
        createUserID("player1");
        createInitialDiv("player1");}

    if (snapshot.val().whichPlayer === "player1") {
        createUserID("player2");
        createInitialDiv("player2");}

    if (snapshot.val().name1 === player1.name) {
        player1.message(player1.name);
    }

    if (snapshot.val().name2 === player2.name) {
        player2.message(player2.name);
    }

    //When the Player 1 name field has been inputted
    if (snapshot.val().status1 === player1.status && snapshot.val().name1 !== "player1") { 
        // characterInfoDOM(snapshot.val().name1, snapshot.val().name2);
    }

    //When the Player 2 name field has been inputted
    if (snapshot.val().status2 === player2.status && snapshot.val().name2 !== "player2") {
        // characterInfoDOM(snapshot.val().name1, snapshot.val().name2);
    }

// // Capture Button Click
$(document).on('click', '.btn-default', function() {
    event.preventDefault();
    
        player1a = $(".form-control").val().trim();
        database.ref().update({
        name1: player1a});
        snapshot.val().name1;
        // characterInfoDOM();
        
        player2a = $(".form-control").val().trim();
        database.ref().update({
            name2: player2a});
            snapshot.val().name2;
        
    // Handle the errors
}), function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }})
}
  //pickingTurns();

mainFunctionality();