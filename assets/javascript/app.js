var config = {
    apiKey: "AIzaSyDdpVUiXA3Z_4BjUlIHqBgCXOeZpD-cGNo",
    authDomain: "rps-rpg.firebaseapp.com",
    databaseURL: "https://rps-rpg.firebaseio.com",
    storageBucket: "rps-rpg.appspot.com"};
  
firebase.initializeApp(config);
  
var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

  var player1 = {
      name: '',
      losses: 0,
      wins: 0,
      status: '',
      turn: '',
      choice: '',
      message(playername) {
        if (!greetingComplete) {
            $(".form-group").remove();
            var greeting = $("<h3>").text("Hi " + playername + "! " + "You are Player 1!");
            $(".playerinfo").append(greeting);
            greetingComplete = true;
            player1.status = "selected";
            $(".playerinfo").addClass("player1greeting")}
            {database.ref("/players/player1").update({
                name1: player1a,
                status1: player1.status})}}
            };

    var player2 = {
        name: '',
        choice: '',
        losses: 0,
        wins: 0,
        status: '',
        turn: '',
        message(playername) {
            if (!greetingComplete) {
            $(".form-group").remove();
            var greeting = $("<h3>").text("Hi " + playername + "! " + "You are Player 2!");
            $(".playerinfo").append(greeting);
            greetingComplete = true;
            player2.status = "selected";
            $(".playerinfo").addClass("player2greeting")}
            {database.ref("/players/player2").update({
                name2: player2a,
                status2: player2.status})}}};

var greetingComplete = false;
var whosplaying = null;
var player1a = player1.name;
var player2a = player2.name;

connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();}});

function createUserID(player) {
    database.ref().once("value", function(snapshot) { 
    $(".playerinfo").html('<form role="form"><div class="form-group"><label for="name-input">Name:<input class="form-control" id="' + player + 'input" type="text"><button class="btn btn-default" id="' + player + 'button" + "type="start">Start</button></form>');
    
    whosplaying = player;
    database.ref("/players/player1").update({
    player1wins: player1.wins,
    player1losses: player1.losses});
    
    database.ref("/players/player2").update({
        player2wins: player2.wins,
        player2losses: player2.losses});
        
    database.ref().update({
        whichPlayer: whosplaying});

    database.ref('/chat/').update({
        button1clicked: "false",
        button2clicked: "false"});

    snapshot.val().whichPlayer;})}

function createInitialDiv(player){
    if (player1.name === ""){
        $(".playerwinner").attr("id", "winner" + player);
        $(".playerturn").attr("id", player + "turn");
        $(".RPS").attr("id", "rps" + player);
        var createDiv = $("<div>").attr("id", player + "id");
        $(".panel-body").append(createDiv);

        //CHATBOX
        $(".chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id=' + player + 'chatbox' + '><div class="row"><div class="col-md-12"><input type="text" id=' + player + 'messageinput' + '></label><br><button class="chatbutton" type="Submit" id=' + player + 'chatbutton' + '>Submit</button></div></div></form>');
    }

    if (player2.name === ""){
        $(".playerwinner").attr("id", "winner" + player);
        $(".playerturn").attr("id", player + "turn");
        var createDiv2 = $("<div>").attr("id", player + "id");
        $(".panel-body").append(createDiv2);

        //CHATBOX
        $(".chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id=' + player + 'chatbox' + '><div class="row"><div class="col-md-12"><input type="text" id=' + player + 'messageinput' + '></label><br><button class="chatbutton" type="Submit" id=' + player + 'chatbutton' + '>Submit</button></div></div></form>');}}

        $(document).on('click', '.chatbutton', function() {
            event.preventDefault();
        if ($(".chatbutton").attr("id") === "player1chatbutton") {
            var chat1Text = $("#player1messageinput").val().trim();
            $("#player1messageinput").val('');
            database.ref('/chat/').update({
                chattext1: chat1Text,
                button1clicked: "true"});
            } else {
                database.ref('/chat/').update({
                    button1clicked: "false"});}
        
        if ($(this).attr("id") === "player2chatbutton") {
            var chat2Text = $("#player2messageinput").val().trim();
            $("#player2messageinput").val('');
            database.ref('/chat/').update({
                chattext2: chat2Text,
                button2clicked: "true"});
            } else {
                database.ref('/chat/').update({
                    button2clicked: "false"})}})

//Chatbox
database.ref().on("value", function(snapshot) { 
    if (snapshot.child("chat").val().button1clicked === "true" && snapshot.child("players/player1").val().name1 !== undefined) {

    $("#player1chatbox").append(snapshot.child("players/player1").val().name1 + ': ' + snapshot.child("chat").val().chattext1 + '<br>');
    $("#player2chatbox").append(snapshot.child("players/player1").val().name1 + ': ' + snapshot.child("chat").val().chattext1 + '<br>');
        database.ref('/chat/').update({
            button1clicked: "false"})}
    else if (snapshot.child("chat").val().button2clicked === "true" && snapshot.child("players/player2").val().name2 !== undefined) {

    $("#player2chatbox").append(snapshot.child("players/player2").val().name2 + ': ' + snapshot.child("chat").val().chattext2 + '<br>');
    $("#player1chatbox").append(snapshot.child("players/player2").val().name2 + ': ' + snapshot.child("chat").val().chattext2 + '<br>');
        database.ref('/chat/').update({
            button2clicked: "false"})}
//CHAT: If player 1 leaves 

if (snapshot.child("players/player1").val().chose1 !== undefined && snapshot.child("players/player2").val().name2 === undefined) {
    $("#player1chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id="player1chatbox"><div class="row"><div class="col-md-12"><input type="text" id="player1messageinput"></label><br><button class="chatbutton" type="Submit" id="player1chatbutton">Submit</button><br>Player 1 has left the game</div></div></form>');
    $("#player2chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id="player2chatbox"><div class="row"><div class="col-md-12"><input type="text" id="player2messageinput"></label><br><button class="chatbutton" type="Submit" id="player2chatbutton">Submit</button><br>Player 1 has left the game</div></div></form>')}

//CHAT: If player 2 leaves

if (snapshot.child("players/player2").val().chose2 !== undefined && snapshot.child("players/player1").val().name1 === undefined) {
    $("#player1chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id="player1chatbox"><div class="row"><div class="col-md-12"><input type="text" id="player1messageinput"></label><br><button class="chatbutton" type="Submit" id="player1chatbutton">Submit</button><br>Player 2 has left the game</div></div></form>');
    $("#player2chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id="player2chatbox"><div class="row"><div class="col-md-12"><input type="text" id="player2messageinput"></label><br><button class="chatbutton" type="Submit" id="player2chatbutton">Submit</button><br>Player 2 has left the game</div></div></form>')
}

if (snapshot.child("players/player1").val().status1 === "selected" && snapshot.child("players/player2").val().status2 !== "selected") {
    $("#player1chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id="player1chatbox"><div class="row"><div class="col-md-12"><input type="text" id="player1messageinput"></label><br><button class="chatbutton" type="Submit" id="player1chatbutton">Submit</button><br>Player 1 has joined the game<br></div></div></form>');
    $("#player2chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id="player2chatbox"><div class="row"><div class="col-md-12"><input type="text" id="player2messageinput"></label><br><button class="chatbutton" type="Submit" id="player2chatbutton">Submit</button><br>Player 1 has joined the game<br></div></div></form>')}

if (snapshot.child("players/player2").val().status2 === "selected" && snapshot.child("players/player1").val().status1 !== "selected") {
    $("#player1chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id="player1chatbox"><div class="row"><div class="col-md-12"><input type="text" id="player1messageinput"></label><br><button class="chatbutton" type="Submit" id="player1chatbutton">Submit</button><br>Player 2 has joined the game<br></div></div></form>');
    $("#player2chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id="player2chatbox"><div class="row"><div class="col-md-12"><input type="text" id="player2messageinput"></label><br><button class="chatbutton" type="Submit" id="player2chatbutton">Submit</button><br>Player 2 has joined the game<br></div></div></form>')}
})
function initialInputs(){
database.ref().once("value", function(snapshot) { 
        database.ref().update({
        whichPlayer: whosplaying});
//when the window pops up, if the start button has an id of 'initial button,' give the button an id of player1 and update firebase
    if (snapshot.val().whichPlayer === undefined) {
        createUserID("player1");
        createInitialDiv("player1");
        DOMFunctions();
    }
//when the window pops up, if the start button already has an id of 'player1,' give the button an id of player2 and update firebase
    else if (snapshot.val().whichPlayer
    === "player1") {
        createUserID("player2");
        createInitialDiv("player2");
        DOMFunctions();}

    else if (snapshot.val().whichPlayer
    === "player2") {
        createUserID("player1");
        createInitialDiv("player1");
        DOMFunctions();}})}


// PLAYER NAME INPUT!!!!
function choosePlayer(){
$(document).on('click', '.btn', function() {  
    event.preventDefault();
    database.ref().once("value", function(snapshot) { 

    if ($("input").attr("id") === "player1input") {
        player1a = $("#player1input").val().trim();
        createUserID("player1");
        createInitialDiv("player1");
        snapshot.child("players/player1").val().name1;
        database.ref("/players/player1").update({
            name1: player1a});
        database.ref().update({
            whichPlayer: whosplaying});
        snapshot.val().whichPlayer;
        player1.message(player1a)}

    else if ($("input").attr("id") === "player2input") {
        player2a = $("#player2input").val().trim();
        createUserID("player2");
        createInitialDiv("player2");
        snapshot.child("players/player2").val().name2;        
        database.ref("players/player2").update({
            name2: player2a});
        database.ref().update({
            whichPlayer: whosplaying});
        snapshot.val().whichPlayer;
        player2.message(player2a)}})})}

function DOMFunctions() {

//If first player and second player haven't been picked
database.ref().on("value", function(snapshot) { 
if (snapshot.child("players/player1").val().name1 === undefined && snapshot.child("players/player2").val().name2 === undefined) {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1 </h3><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');
    $("#player2id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1 </h3><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');
}

// If first player has been picked but second player hasn't
 if (snapshot.child("players/player1").val().status1 === "selected" && snapshot.child("players/player2").val().status2 !== "selected") {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.child("players/player1").val().name1 + '</h3>' + '<h4> Wins: ' + player1.wins + '</h4>' + '<h4> Losses: ' + player1.losses + '</h4><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');
    $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.child("players/player1").val().name1 + '</h3>' + '<h4> Wins: ' + player1.wins + '</h4>' + '<h4> Losses: ' + player1.losses + '</h4><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>')}

// //If first player hasn't been picked but second player has
if (snapshot.child("players/player1").val().status1 !== "selected" && snapshot.child("players/player2").val().status2 === "selected") {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3><h3>' + snapshot.child("players/player2").val().name2 + '</h3>' + '<h4> Wins: ' + player1.wins + '</h4>' + '<h4> Losses: ' + player1.losses + '</h4>')

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3><h3>' + snapshot.child("players/player2").val().name2 + '</h3>' + '<h4> Wins: ' + player1.wins + '</h4>' + '<h4> Losses: ' + player1.losses + '</h4>')}

//Player reset
//If new player 2 needs to be picked
if (snapshot.child("players/player2").val().name2 === undefined && snapshot.child("players/player1").val().status1 === "chosen" || snapshot.child("players/player2").val().name2 === undefined && snapshot.child("players/player1").val().status1 === "choosing RPS") {
    $("#player1turn").html('<div class="row"><div class="col-md-12"><h3> Waiting for another player to join</h3>');
    $("#player2turn").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');
}
//If new player 1 needs to be picked
else if (snapshot.child("players/player1").val().name1 === undefined && snapshot.child("players/player2").val().chose2 !== undefined && snapshot.child("players/player2").val().status2 === "chosen" || snapshot.child("players/player1").val().name1 === undefined && snapshot.child("players/player2").val().chose2 !== undefined && snapshot.child("players/player2").val().status2 === "choosing RPS") {
    $("#player2turn").html('<div class="row"><div class="col-md-12"><h3> Waiting for another player to join</h3>');
    $("#player1turn").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3>');
    }
//Update dom
if (snapshot.child("players/player1").val().status1 === "chosen" && snapshot.child("players/player2").val().status2 === "selected" || snapshot.child("players/player1").val().status1 === "choosing RPS" && snapshot.child("players/player2").val().status2 === "selected") {
    $("#player1turn").html('<div class="row"><div class="col-md-12"><h3> Waiting for another player to join</h3>');
    $("#player2turn").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');

snapshot.child("players/player1").val().status1;
    snapshot.child("players/player1").val().status2;
    player1.status = "selected";
    player2.status = "selected";
    database.ref("/players/player1").update({
        status1: player1.status})
        database.ref("/players/player2").update({
            status2: player2.status})
            snapshot.child("players/player1").val().status1;
            snapshot.child("players/player1").val().status2;}

else if (snapshot.child("players/player2").val().status2 === "chosen" && snapshot.child("players/player1").val().status1 === "selected" || snapshot.child("players/player2").val().status2 === "choosing RPS" && snapshot.child("players/player1").val().status1 === "selected") {
$("#player2turn").html('<div class="row"><div class="col-md-12"><h3> Waiting for another player to join</h3>');
    $("#player1turn").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3>');

            snapshot.child("players/player1").val().status1;
            snapshot.child("players/player1").val().status2;
            player1.status = "selected";
            player2.status = "selected";
            database.ref("/players/player1").update({
                status1: player1.status})
                database.ref("/players/player2").update({
                    status2: player2.status})}

//If both have been picked
if (snapshot.child("players/player1").val().name1 !== undefined && snapshot.child("players/player2").val().name2 !== undefined && snapshot.child("players/player1").val().status1 !== "waiting for new p2"){
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.child("players/player1").val().name1 + '</h3>' + '<h4> Wins: ' + player1.wins + '</h4>' + '<h4> Losses: ' + player1.losses +'</h4><h3>' + snapshot.child("players/player2").val().name2 + '</h3>' + '<h4> Wins: ' + player2.wins + '</h4>' + '<h4> Losses: ' + player2.losses + '</h4>')

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.child("players/player1").val().name1 + '</h3>' + '<h4> Wins: ' + player1.wins + '</h4>' + '<h4> Losses: ' + player1.losses +'</h4><h3>' + snapshot.child("players/player2").val().name2 + '</h3>' + '<h4> Wins: ' + player2.wins + '</h4>' + '<h4> Losses: ' + player2.losses + '</h4>');
    pickingTurns((snapshot.child("players/player1").val().name1));

    RPS();}})}

function pickingTurns() {

    database.ref().on("value", function(snapshot) {
    if (snapshot.child("players/player1").val().name1 !== undefined && snapshot.child("players/player2").val().name2 !== undefined && snapshot.child("players/player1").val().status1 === "selected" && snapshot.child("players/player2").val().status2 === "selected"){
        player1.status = "game ready";
        player2.status = "game ready";
        database.ref("/players/player1").update({
            status1: player1.status,
            turn: snapshot.child("players/player1").val().name1})
        database.ref("/players/player2").update({
            status2: player2.status})}

        //After reset
        if (snapshot.child("players/player1").val().status1 === "selected" && snapshot.child("players/player2").val().status2 === "game ready"){
            player1.status = "game ready";
            database.ref("/players/player1").update({
                status1: player1.status,
                turn: snapshot.child("players/player1").val().name1})}

        else if (snapshot.child("players/player2").val().status2 === "selected" && snapshot.child("players/player1").val().status1 === "game ready"){
            player2.status = "game ready";
            database.ref("/players/player2").update({
                status2: player2.status,
                turn: snapshot.child("players/player2").val().name2})}
    
        //PLAYER 1 INITIAL TURN - UPDATE DOM

        if (snapshot.child("players/player1").val().status1 === "game ready" && snapshot.child("players/player2").val().status2 === "game ready"){
            
            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>' + "It's your turn!</h3>");
            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>'  + "Waiting for " + snapshot.child("players/player1").val().name1 + " to choose!</h3>");

            player1.status = "choosing RPS";
            player2.status = "waiting for player 1 to choose";
            database.ref("/players/player1").update({
                status1: player1.status})
            database.ref("/players/player2").update({
                status2: player2.status})}
    
        //If it's Player 1's turn to choose
        if (snapshot.child("players/player1").val().status1 === "choosing RPS" && snapshot.child("players/player2").val().status2 === "chosen"){ 

            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>' + "Waiting for " + snapshot.child("players/player1").val().name1 + " to choose!</h3>");
            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>'  + "It's your turn!</h3>");}

        //If it's Player 2's turn to choose
        else if (snapshot.child("players/player2").val().status2 === "choosing RPS" && snapshot.child("players/player1").val().status1 === "chosen"){

            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>' + "Waiting for " + snapshot.child("players/player2").val().name2 + " to choose!</h3>");
            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>'  + "It's your turn!</h3>");}
        })}

function RPS() {
    
    var rockimg = "<img src='assets/images/rock2.png' width='130px'>";
    var paperimg = "<img src='assets/images/paper2.png' width='130px'>";
    var scissorsimg = "<img src ='assets/images/scissors2.png' width='130px'>";

    database.ref().once("value", function(snapshot) {
        //If Player 1 is choosing, create RPS buttons div
        if (snapshot.child("players/player1").val().status1 === "choosing RPS") {
        $("#rpsplayer1").html('<div class="row"><div class="col-md-12 buttonsplayer1"><h3><button class="rpsbuttons" data-val = "rockp1" id="rockp1">' + rockimg + '</button></h3><h3><button class="rpsbuttons" data-val= "paperp1" id="paperp1">' + paperimg + '</button></h3><h3><button class="rpsbuttons" data-val = "scissorsp1" id="scissorsp1">' + scissorsimg + '</button>');
}        //If Player 2 is choosing, create RPS buttons div
        else if (snapshot.child("players/player2").val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12 buttonsplayer2"><h3><button class="rpsbuttons" data-val = "rockp2" id="rockp2">' + rockimg + '</button></h3><h3><button class="rpsbuttons" data-val= "paperp2" id="paperp2">' + paperimg + '</button></h3><h3><button class="rpsbuttons" data-val = "scissorsp2" id="scissorsp2">' + scissorsimg + '</button>');}

    $(document).on('click', 'button', function() {
 
        player1.choice = $(this).attr("id");
        player2.choice = $(this).attr("id");
        if (player2.choice === undefined) 
        {player2.choice = "n/a"}

        // If player 1 chose rock
        if (player1.choice === "rockp1" && snapshot.child("players/player1").val().status1 === "choosing RPS") { 
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Rock</h2>');
            player1.status = "chosen";
            player2.status = "choosing RPS";
            database.ref("/players/player1").update({
                status1: player1.status,
                chose1: player1.choice})
            database.ref("/players/player2").update({
                    status2: player2.status,
                    turn: snapshot.child("players/player2").val().name2})}

        if (player1.choice === "paperp1" && snapshot.child("players/player1").status1 === "choosing RPS") {
        $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Paper</h2>');
        player1.status = "chosen";
        player2.status = "choosing RPS";
            database.ref("/players/player1").update({
                status1: player1.status,
                chose1: player1.choice})
            database.ref("/players/player2").update({
                status2: player2.status,
                turn: snapshot.child("players/player2").val().name2})
            }
        //If player 2 chose rock
        else if (player2.choice === "rockp2" && snapshot.child("players/player2").val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h2>Rock</h2>');
            player1.status = "choosing RPS";
            player2.status = "chosen";
                database.ref("/players/player1").update({
                    status1: player1.status})
                database.ref("/players/player2").update({
                    status2: player2.status,
                    chose2: player2.choice})
                database.ref().update({
                    turn: snapshot.child("players/player1").val().name1})}

        //If player 1 chose paper
         if (player1.choice === "paperp1" && snapshot.child("players/player1").val().status1 === "choosing RPS") {
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Paper</h2>');
            player1.status = "chosen";
            player2.status = "choosing RPS";
                database.ref("/players/player1").update({
                    status1: player1.status,
                    chose1: player1.choice})
                database.ref("/players/player2").update({
                    status2: player2.status,
                    turn: snapshot.child("players/player2").val().name2})}

        //If player 2 chose paper
        else if (player2.choice === "paperp2" && snapshot.child("players/player2").val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h2>Paper</h2>');
            player1.status = "choosing RPS";
            player2.status = "chosen";
                database.ref("/players/player1").update({
                    status1: player1.status,
                    turn: snapshot.child("players/player1").val().name1})
                database.ref("/players/player2").update({
                    chose2: player2.choice,
                    status2: player2.status})}                             
        
        //If player 1 chose scissors
        if (player1.choice === "scissorsp1" && snapshot.child("players/player1").val().status1 === "choosing RPS") {
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Scissors</h2>');
            player1.status = "chosen";
            player2.status = "choosing RPS";
                database.ref("/players/player1").update({
                    status1: player1.status,
                    chose1: player1.choice})
                database.ref("/players/player2").update({
                    status2: player2.status,
                    turn: snapshot.child("players/player2").val().name2})}                

        //If player 2 chose scissors
        else if (player2.choice === "scissorsp2" && snapshot.child("players/player2").val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h2>Scissors</h2>');
            player1.status = "choosing RPS";
            player2.status = "chosen";    
                database.ref("/players/player1").update({
                    status1: player1.status,
                    turn: snapshot.child("players/player1").val().name1})
                database.ref("/players/player2").update({
                    status2: player2.status,
                    chose2: player2.choice})   
                }})})}

    function points() {

        database.ref().on("value", function(snapshot) {

        //If player1 chose rock and player2 chose paper
        if (snapshot.child("players/player1").val().chose1 === "rockp1" && snapshot.child("players/player2").val().chose2 === "paperp2") {
            player2.wins++;
            player1.losses++;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + ' wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + ' wins!</h2>');

            player1.choice = "n/a";
            player2.choice = "n/a";

            database.ref("/players/player1").update({
                player1losses: player1.losses,
                chose1: player1.choice})
            database.ref("/players/player2").update({
                player2wins: player2.wins,
                chose2: player2.choice})  

            snapshot.child("players/player1").player1losses;
            snapshot.child("players/player2").player2wins
            snapshot.child("players/player1").chose1;
            snapshot.child("players/player2").chose2;}  

        //If player1 chose paper and player2 chose rock
        else if (snapshot.child("players/player1").chose1 === "paperp1" && snapshot.child("players/player2").val().chose2 === "rockp2") {

            player1.wins++;
            player2.losses++; 

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + ' wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + ' wins!</h2>');

            player1.choice = "n/a";
            player2.choice = "n/a";

            database.ref("/players/player1").update({
                player1wins: player1.wins,
                chose1: player1.choice})
            database.ref("/players/player2").update({
                player2losses: player2.losses,
                chose2: player2.choice})  

            snapshot.child("players/player2").val().player2losses;
            snapshot.child("players/player1").val().player1wins
            snapshot.child("players/player1").val().chose1;
            snapshot.child("players/player2").val().chose2;
            }  

        //If player1 chose rock and player2 chose scissors
        else if (snapshot.child("players/player1").val().chose1 === "rockp1" && snapshot.child("players/player2").val().chose2 === "scissorsp2") {
            player1.wins++;
            player2.losses++;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + ' wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + ' wins!</h2>');

            player1.choice = "n/a";
            player2.choice = "n/a";

            database.ref("/players/player1").update({
                player1wins: player1.wins,
                chose1: player1.choice})
            database.ref("/players/player2").update({
                player2losses: player2.losses,
                chose2: player2.choice})  

            snapshot.child("players/player2").val().player2losses;
            snapshot.child("players/player1").val().player1wins
            snapshot.child("players/player1").val().chose1;
            snapshot.child("players/player2").val().chose2;
            }  

        //If player1 chose scissors and player2 chose rock
        else if (snapshot.child("players/player1").val().chose1 === "scissorsp1" && snapshot.child("players/player2").val().chose2 === "rockp2") {
            
            player2.wins++;
            player1.losses++;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + ' wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + ' wins!</h2>');

            player1.choice = "n/a";
            player2.choice = "n/a";

            database.ref("/players/player1").update({
                player1losses: player1.losses,
                chose1: player1.choice})
            database.ref("/players/player2").update({
                player2wins: player2.wins,
                chose2: player2.choice})  

            snapshot.child("players/player1").val().player1losses;
            snapshot.child("players/player2").val().player2wins
            snapshot.child("players/player1").val().chose1;
            snapshot.child("players/player2").val().chose2;
            }  

     //If player1 chose scissors and player2 chose paper
     else if (snapshot.child("players/player1").val().chose1 === "scissorsp1" && snapshot.child("players/player2").val().chose2 === "paperp2") {

        player1.wins++;
        player2.losses++;

        player1.choice = "n/a";
        player2.choice = "n/a";

        database.ref("/players/player1").update({
            player1wins: player1.wins,
            chose1: player1.choice})
        database.ref("/players/player2").update({
            player2losses: player2.losses,
            chose2: player2.choice})  

        snapshot.child("players/player2").val().player2losses;
        snapshot.child("players/player1").val().player1wins
        snapshot.child("players/player1").val().chose1;
        snapshot.child("players/player2").val().chose2; 

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + ' wins!</h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + ' wins!</h2>');
        }  

    //If player1 chose paper and player2 chose scissors
    else if (snapshot.child("players/player1").val().chose1 === "paperp1" && snapshot.child("players/player2").val().chose2 === "scissorsp2") {
        player1.losses++;
        player2.wins++;

        player1.choice = "n/a";
        player2.choice = "n/a";

        database.ref("/players/player1").update({
            player1losses: player1.losses,
            chose1: player1.choice})
        database.ref("/players/player2").update({
            player2wins: player2.wins,
            chose2: player2.choice})  

        snapshot.child("players/player2").val().player1losses;
        snapshot.child("players/player1").val().player2wins
        snapshot.child("players/player1").val().chose1;
        snapshot.child("players/player2").val().chose2; 

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + ' wins!</h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + ' wins!</h2>');} 

    //TIE GAME

    if (snapshot.child("players/player1").val().chose1 === "rockp1" && snapshot.child("players/player2").val().chose2 === "rockp2" || snapshot.child("players/player1").val().chose1 === "paperp1" && snapshot.child("players/player2").val().chose2 === "paperp2" || snapshot.child("players/player1").val().chose1 === "scissorsp1" && snapshot.child("players/player2").val().chose2 === "scissorsp2") {
        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2> TIE! </h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2> TIE!</h2>');
    }

    //POINTS AT END
    if (player1.wins === 5) {

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>You win the game!</h2>'+ '<button type="restart1" id="restartp1" class="restartbutton">Restart</button></form>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + ' wins the game!</h2>'+ '<button type="restart2" id="restartp2" class="restartbutton">Restart</button></form>');}  

    else if (player2.wins === 5) {
            
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>You win the game!</h2>'+ '<button type="restart2" id="restartp2" class="restartbutton">Restart</button></form>');
        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + ' wins the game!</h2>'+ '<button type="restart1" id="restartp1" class="restartbutton">Restart</button></form>');}})}

    $(document).on('click', '.restartbutton', function() {
        player1.wins = 0;
        player2.wins = 0;
        player1.losses = 0;
        player2.losses = 0;
        database.ref("/players/player1").set({
            turn: null});
        database.ref("/players/player2").set({
            turn: null});
            $("#winnerplayer1").remove();
            $("#winnerplayer2").remove();
            $("#rpsplayer1").remove();
            $("#rpsplayer2").remove();
            createUserID();
            initialInputs();
            choosePlayer();})

//IF PLAYER DISCONNECTS
$(window).unload(function(){
    
    if (whosplaying === "player2"){
        database.ref("/players/player2").remove();
        database.ref().update({
            whichPlayer: "player1"})
            }

    else if (whosplaying === "player1"){

            database.ref("/players/player1").remove();
            database.ref().update({
                whichPlayer: "player2"})
                }
                    })

            database.ref().on("value", function(snapshot) {
            snapshot.child("players/player1").val().status1;
            snapshot.child("players/player2").val().status2;})
// }

initialInputs();
choosePlayer();
points();
