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
            {database.ref("/players/player1").update({
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
        points: '' ,
        message(playername) {
            if (!greetingComplete) {
            $(".playerinfo").remove();
            var greeting = $("<h3>").text("Hi " + playername + "!" + "You are Player 2!");
            $(".greeting").append(greeting);
            greetingComplete = true;
            player2.status = "selected";
            $(".greeting").addClass("panel panel-default player2greeting")}
            {database.ref("/players/player2").update({
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
    $(".playerinfo").html('<form role="form"><div class="form-group"><label for="name-input">Name:<input class="form-control" id="' + player + 'input" type="text"><button class="btn btn-default" id="' + player + 'button" + "type="start">Start</button></form>');
    
    whosplaying = player;
 
    database.ref("/players/player1").update({
        player1wins: player1.wins,
        player1losses: player1.losses});
    
    database.ref("/players/player2").update({
        player2wins: player2.wins,
        player2losses: player2.losses
    });
        
    database.ref().update({
        whichPlayer: whosplaying
    });

    database.ref('/chat/').update({
        button1clicked: "false",
        button2clicked: "false"});

    snapshot.val().whichPlayer;

    })
}

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
        $(".chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id=' + player + 'chatbox' + '><div class="row"><div class="col-md-12"><input type="text" id=' + player + 'messageinput' + '></label><br><button class="chatbutton" type="Submit" id=' + player + 'chatbutton' + '>Submit</button></div></div></form>');
        }}

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
                    button1clicked: "false"});
            }
        
        if ($(this).attr("id") === "player2chatbutton") {
            var chat2Text = $("#player2messageinput").val().trim();
            $("#player2messageinput").val('');
            database.ref('/chat/').update({
                chattext2: chat2Text,
                button2clicked: "true"});
            } else {
                database.ref('/chat/').update({
                    button2clicked: "false"})}
                })

// //Chatbox
database.ref().on("value", function(snapshot) { 
    if (snapshot.child("chat").val().button1clicked === "true" && snapshot.child("players/player1").val().name1 !== undefined) {

    $("#player1chatbox").append(snapshot.child("players/player1").val().name1 + ':' + snapshot.child("chat").val().chattext1 + '<br>');
    $("#player2chatbox").append(snapshot.child("players/player2").val().name2 + ':' + snapshot.child("chat").val().chattext1 + '<br>');
}
    else if (snapshot.child("chat").val().button2clicked === "true" && snapshot.child("players/player2").val().name2 !== undefined) {

    $("#player2chatbox").append(snapshot.child("players/player2").val().name2 + ':' + snapshot.child("chat").val().chattext2 + '<br>');
    $("#player1chatbox").append(snapshot.child("players/player2").val().name2 + ':' + snapshot.child("chat").val().chattext2 + '<br>');
}
    })

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
        snapshot.child("players/player1").val().name1;
        database.ref("/players/player1").update({
            name1: player1a});
        database.ref().update({
            whichPlayer: whosplaying});
        snapshot.val().whichPlayer;
        player1.message(player1a)}

    else if ($("input").attr("id") === "player2input") {
        console.log("player 2 name true");
        player2a = $("#player2input").val().trim();
        createUserID("player2");
        createInitialDiv("player2");
        snapshot.child("players/player2").val().name2;        
        database.ref("players/player2").update({
            name2: player2a});
        database.ref().update({
            whichPlayer: whosplaying});
        snapshot.val().whichPlayer;
        player2.message(player2a)}
        })
});

function DOMFunctions() {

//If first player and second player haven't been picked
database.ref().on("value", function(snapshot) { 
if (snapshot.child("players/player1").val().name1 === undefined && snapshot.child("players/player2").val().name2 === undefined) {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1 </h3><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1 </h3><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');
}

//If first player has been picked but second player hasn't
 if (snapshot.child("players/player1").val().name1 !== undefined && snapshot.child("players/player2").val().name2 === undefined) {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.child("players/player1").val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>');

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.child("players/player1").val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4><div class="row"><div class="col-md-12"><h3> Waiting for Player 2</h3>')}

//If first player hasn't been picked but second player has
if (snapshot.child("players/player1").val().name1 === undefined && snapshot.child("players/player2").val().name2 !== undefined) {
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3><h3>' + snapshot.child("players/player2").val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3> Waiting for Player 1</h3><h3>' + ssnapshot.child("players/player2").val().name2 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses + '</h4>')}

//If both have been picked
if (snapshot.child("players/player1").val().name1 !== undefined && snapshot.child("players/player2").val().name2 !== undefined){
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.child("players/player1").val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses +'</h4><h3>' + snapshot.child("players/player2").val().name2 + '</h3>' + '<h4> Wins' + player2.wins + '</h4>' + '<h4> Losses' + player2.losses + '</h4>')

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.child("players/player1").val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses +'</h4><h3>' + snapshot.child("players/player2").val().name2 + '</h3>' + '<h4> Wins' + player2.wins + '</h4>' + '<h4> Losses' + player2.losses + '</h4>');
    pickingTurns((snapshot.child("players/player1").val().name1));

    RPS();
}
})
}

function pickingTurns() {

    database.ref().on("value", function(snapshot) {
    if (snapshot.child("players/player1").val().name1 !== undefined && snapshot.child("players/player2").val().name2 !== undefined && snapshot.child("players/player1").val().status1 === "selected" && snapshot.child("players/player2").val().status2 === "selected"){
        player1.status = "game ready";
        player2.status = "game ready";
        database.ref("/players/player1").update({
            status1: player1.status})
        database.ref("/players/player2").update({
            status2: player2.status})
        database.ref().update({
            turn: snapshot.child("players/player1").val().name1})}
    
        //PLAYER 1 INITIAL TURN - UPDATE DOM

        if (snapshot.child("players/player1").val().status1 === "game ready" && snapshot.child("players/player2").val().status2 === "game ready"){
            
            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>' + "It's your turn!</h3>");

            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>'  + "Waiting for" + snapshot.child("players/player1").val().name1 + "to choose!</h3>");

            player1.status = "choosing RPS";
            player2.status = "waiting for player 1 to choose";
            database.ref("/players/player1").update({
                status1: player1.status})
            database.ref("/players/player2").update({
                status2: player2.status})
        }
    
        //If it's Player 1's turn to choose
        if (snapshot.child("players/player1").val().status1 === "choosing RPS" && snapshot.child("players/player2").val().status2 === "chosen"){ 

            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>' + "Waiting for" + snapshot.child("players/player1").val().name1 + "to choose!</h3>");
    
            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>'  + "It's your turn!</h3>");
        }

        //If it's Player 2's turn to choose
        else if (snapshot.child("players/player2").val().status2 === "choosing RPS" && snapshot.child("players/player1").val().status1 === "chosen"){

            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>' + "Waiting for" + snapshot.child("players/player2").val().name2 + "to choose!</h3>");
    
            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>'  + "It's your turn!</h3>");
        }

    })
}

function RPS() {
    
    database.ref().once("value", function(snapshot) {
        //If Player 1 is choosing, create RPS buttons div
        if (snapshot.child("players/player1").val().status1 === "choosing RPS") {
        $("#rpsplayer1").html('<div class="row"><div class="buttons col-md-12 buttonsplayer1"><h3><button data-val = "rockp1" id="rockp1">Rock</button></h3><h3><button data-val = "paperp1" id="paperp1">Paper</button></h3><h3><button data-val = "scissorsp1" id="scissorsp1">Scissors</button></h3>');
}        //If Player 2 is choosing, create RPS buttons div
        else if (snapshot.child("players/player2").val().status2 === "choosing RPS") {
        $("#rpsplayer2").html('<div class="row"><div class="buttons col-md-12"><h3><button class = "buttonsplayer2" data-val = "rockp2" id="rockp2">Rock</button></h3><h3><button data-val = "paperp2" id="paperp2">Paper</button></h3><h3><button data-val = "scissorsp2" id="scissorsp2">Scissors</button></h3>');}

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
                    status2: player2.status})
            database.ref().update({
                turn: snapshot.child("players/player2").val().name2
            })
                }

        if (player1.choice === "paperp1" && snapshot.child("players/player1").status1 === "choosing RPS") {
        $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Paper</h2>');
        player1.status = "chosen";
        player2.status = "choosing RPS";
            database.ref("/players/player1").update({
                status1: player1.status,
                chose1: player1.choice})
            database.ref("/players/player2").update({
                status2: player2.status})
            database.ref().update({
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
                    turn: snapshot.child("players/player1").val().name1
                })
                }

        //If player 1 chose paper
         if (player1.choice === "paperp1" && snapshot.child("players/player1").val().status1 === "choosing RPS") {
             console.log("paper")
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Paper</h2>');
            player1.status = "chosen";
            player2.status = "choosing RPS";
                database.ref("/players/player1").update({
                    status1: player1.status,
                    chose1: player1.choice})
                database.ref("/players/player2").update({
                    status2: player2.status})
                database.ref().update({
                    turn: snapshot.child("players/player2").val().name2})
                }

        //If player 2 chose paper
        else if (player2.choice === "paperp2" && snapshot.child("players/player2").val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h2>Paper</h2>');
            player1.status = "choosing RPS";
            player2.status = "chosen";
                database.ref("/players/player1").update({
                    status1: player1.status})
                database.ref("/players/player2").update({
                    chose2: player2.choice,
                    status2: player2.status})   
                database.ref().update({
                    turn: snapshot.child("players/player1").val().name1})   
                }                             
        
        //If player 1 chose scissors
        if (player1.choice === "scissorsp1" && snapshot.child("players/player1").val().status1 === "choosing RPS") {
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Scissors</h2>');
            player1.status = "chosen";
            player2.status = "choosing RPS";
                database.ref("/players/player1").update({
                    status1: player1.status,
                    chose1: player1.choice})
                database.ref("/players/player2").update({
                    status2: player2.status})
                database.ref().update({
                    turn: snapshot.child("players/player2").val().name2})   
                }                

        //If player 2 chose scissors
        else if (player2.choice === "scissorsp2" && snapshot.child("players/player2").val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h2>Scissors</h2>');
            player1.status = "choosing RPS";
            player2.status = "chosen";    
                database.ref("/players/player1").update({
                    status1: player1.status})
                database.ref("/players/player2").update({
                    status2: player2.status,
                    chose2: player2.choice})
                database.ref().update({
                    turn: snapshot.child("players/player1").val().name1})   
                }                
                })
            })
        }

    function points() {

        database.ref().on("value", function(snapshot) {

        //If player1 chose rock and player2 chose paper
        if (snapshot.child("players/player1").val().chose1 === "rockp1" && snapshot.child("players/player2").val().chose2 === "paperp2") {
            player2.wins++;
            player1.losses++;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + 'wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + 'wins!</h2>');

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
            snapshot.child("players/player2").chose2;
            }  

        //If player1 chose paper and player2 chose rock
        else if (snapshot.child("players/player1").chose1 === "paperp1" && snapshot.child("players/player2").val().chose2 === "rockp2") {

            player1.wins++;
            player2.losses++; 

            // snapshot.val().player1wins;
            // snapshot.val().player2losses;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + 'wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + 'wins!</h2>');

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

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + 'wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + 'wins!</h2>');

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

            // snapshot.val().player1wins;
            // snapshot.val().player2losses;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + 'wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + 'wins!</h2>');

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
        // snapshot.val().player1wins;
        // snapshot.val().player2losses;

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

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + 'wins!</h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + 'wins!</h2>');
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

        // snapshot.val().player1wins;
        // snapshot.val().player2losses;

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + 'wins!</h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + 'wins!</h2>');
        } 

    //TIE GAME

    if (snapshot.child("players/player1").val().chose1 === "rockp1" && snapshot.child("players/player2").val().chose2 === "rockp2" || snapshot.child("players/player1").val().chose1 === "paperp1" && snapshot.child("players/player2").val().chose2 === "paperp2" || snapshot.child("players/player1").val().chose1 === "scissorsp1" && snapshot.child("players/player2").val().chose2 === "scissorsp2") {
        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2> TIE! </h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2> TIE!</h2>');
    }

    //POINTS AT END
    if (player1.wins === 5) {

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>You win the game!</h2>'+ '<button + "type="restart">Restart</button></form>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player1").val().name1 + 'wins the game!</h2>'+ '<button + "type="restart">Restart</button></form>');
        }  

    else if (player2.wins === 5) {
            
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>You win the game!</h2>'+ '<button + "type="restart">Restart</button></form>');
        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.child("players/player2").val().name2 + 'wins the game!</h2>'+ '<button + "type="restart">Restart</button></form>');
        }
    })}

initialInputs();
points();