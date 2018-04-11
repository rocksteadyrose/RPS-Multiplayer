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
            {database.ref("game//players/player1").update({
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
            {database.ref("game/players/player2").update({
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
    database.ref("game/players").once("child_added", function(snapshot) { 
    $(".playerinfo").html('<form role="form"><div class="form-group"><label for="name-input">Name:<input class="form-control" id="' + player + 'input" type="text"><button class="btn btn-default" id="' + player + 'button" + "type="start">Start</button></form>');
    
    whosplaying = player;
 
    database.ref("game/players/player1").update({
        player1wins: player1.wins,
        player1losses: player1.losses,
        whichPlayer: whosplaying});

    database.ref("game/players/player2").update({
        player2wins: player2.wins,
        player2losses: player2.losses,
        whichPlayer: whosplaying});

    snapshot.val().whichPlayer;
    })
}

function createInitialDiv(player){
    database.ref().once("child_added", function(snapshot) {
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
        // $(".panel-default").html('<div id=' + player + 'id>');

        //CHATBOX
        $(".chatbox").html('<form><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-12" id=' + player + 'chatbox' + '><div class="row"><div class="col-md-12"><input type="text" id=' + player + 'messageinput' + '></label><br><button class="chatbutton" type="Submit" id=' + player + 'chatbutton' + '>Submit</button></div></div></form>');
        }
})
}


$(document).on('click', '.chatbutton', function() {
    event.preventDefault();

        if ($(this).attr("id") === "player1chatbutton") {
            var chat1Text = $("#player1messageinput").val().trim();
            $("#player1messageinput").val('');
            database.ref('game/chat/').update({
                chat1: chat1Text,
                button1clicked: "true"});}
        
        if ($(this).attr("id") === "player2chatbutton") {
            var chat2Text = $("#player2messageinput").val().trim();
            $("#player2messageinput").val('');
            database.ref('game/chat/').update({
                chat2: chat2Text,
                button2clicked: "true"});}

        else {
            database.ref('game/chat/').update({
                button1clicked: "false",
                button2clicked: "false"});}
            })

database.ref('game/chat/').on("child_added", function(snapshot) { 

//Chatbox: If player button 1 has been pressed and both players have been picked
// if (snapshot.val().button1clicked === "true" && snapshot.val().name1 !== undefined && snapshot.val().name2 !== undefined) {
    console.log("yes");
    $("#player1chatbox").append(snapshot.val().name1 + ':' + snapshot.val().chat1 + '<br>');
    $("#player2chatbox").append(snapshot.val().name1 + ':' + snapshot.val().chat1 + '<br>');
// }

//Chatbox: If player button 2 has been pressed and both players have been picked
// else if (snapshot.val().button2clicked === "true" && snapshot.val().name1 !== undefined && snapshot.val().name2 !== undefined) {
    $("#player2chatbox").append(snapshot.val().name2 + ':' + snapshot.val().chat2 + '<br>');
    $("#player1chatbox").append(snapshot.val().name2 + ':' + snapshot.val().chat2 + '<br>');
// }
})



function initialInputs(){
database.ref().once("child_added", function(snapshot) { 
        console.log(snapshot.val());
    //when the window pops up, if the start button has an id of 'initial button,' give the button an id of player1 and update firebase

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
    // if (snapshot.val().status1 === player1.status && snapshot.val().name1 !== "player1") { DOMFunctions(snapshot.val().name1, snapshot.val().name2);}

    // //When the Player 2 name field has been inputted
    // if (snapshot.val().status2 === player2.status && snapshot.val().name2 !== "player2") {DOMFunctions(snapshot.val().name1, snapshot.val().name2);}

}), function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
}

// // Capture Button Click
$(document).on('click', '.btn', function() {
     
    event.preventDefault();
    database.ref().once("child_added", function(snapshot) { 

    if ($("input").attr("id") === "player1input") {
        console.log("player 1 name true");
        player1a = $("#player1input").val().trim();
        createUserID("player1");
        createInitialDiv("player1");
        snapshot.val().name1;
        database.ref("game/players/player1").update({
            name1: player1a});
        database.ref("game").update({
            whichPlayer: whosplaying});
        snapshot.val().whichPlayer;
        player1.message(player1a)}

    else if ($("input").attr("id") === "player2input") {
        console.log("player 2 name true");
        player2a = $("#player2input").val().trim();
        createUserID("player2");
        createInitialDiv("player2");
        snapshot.val().name2;
        database.ref("game/players/player2").update({
            name2: player2a});
        database.ref("game").update({
            whichPlayer: whosplaying});
        player2.message(player2a)}
        })
});

function DOMFunctions(firstplayer, secondplayer) {

//If first player and second player haven't been picked
database.ref().on("child_added", function(snapshot) { 

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
if (snapshot.val().name1 !== undefined && snapshot.val().name2 !== undefined){
    $("#player1id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses +'</h4><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player2.wins + '</h4>' + '<h4> Losses' + player2.losses + '</h4>')

    $("#player2id").html('<div class="row"><div class="col-md-12"><h3>' + snapshot.val().name1 + '</h3>' + '<h4> Wins' + player1.wins + '</h4>' + '<h4> Losses' + player1.losses +'</h4><h3>' + snapshot.val().name2 + '</h3>' + '<h4> Wins' + player2.wins + '</h4>' + '<h4> Losses' + player2.losses + '</h4>');}

})
// database.ref('chat').on("child_added", function(snapshot) { 

// //Chatbox: If player button 1 has been pressed and both players have been picked
// // if (snapshot.val().button1clicked === "true" && snapshot.val().name1 !== undefined && snapshot.val().name2 !== undefined) {
//     console.log("yes");
//     $("#player1chatbox").append(snapshot.val().name1 + ':' + snapshot.val().chat1 + '<br>');
//     $("#player2chatbox").append(snapshot.val().name1 + ':' + snapshot.val().chat1 + '<br>');
// // }

// //Chatbox: If player button 2 has been pressed and both players have been picked
// // else if (snapshot.val().button2clicked === "true" && snapshot.val().name1 !== undefined && snapshot.val().name2 !== undefined) {
//     $("#player2chatbox").append(snapshot.val().name2 + ':' + snapshot.val().chat2 + '<br>');
//     $("#player1chatbox").append(snapshot.val().name2 + ':' + snapshot.val().chat2 + '<br>');
// // }
// })
}


function pickingTurns() {

    database.ref("game/players").on("child_added", function(snapshot) {
    if (snapshot.val().name1 !== undefined && snapshot.val().name2 !== undefined && snapshot.val().status1 === "selected" && snapshot.val().status2 === "selected"){

        player1.status = "game ready";
        player2.status = "game ready";
        database.ref("game/players/player1").update({
            status1: player1.status,
            turn: snapshot.val().name1,
            })
        database.ref("game/players/player2").update({
            status2: player2.status});
        }
    
        //PLAYER 1 INITIAL TURN - UPDATE DOM

        if (snapshot.val().status1 === "game ready" && snapshot.val().status2 === "game ready"){
            
            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>' + "It's your turn!</h3>");

            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>'  + "Waiting for" + snapshot.val().name1 + "to choose!</h3>");

            player1.status = "choosing RPS";
            player2.status = "waiting for player 1 to choose";
            database.ref("game/players/player1").update({
                status1: player1.status})
            database.ref("game/players/player2").update({
                status2: player2.status});
        }
    
        //If it's Player 1's turn to choose
        if (snapshot.val().status1 === "choosing RPS" && snapshot.val().status2 === "chosen"){ 

            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>' + "Waiting for" + snapshot.val().name1 + "to choose!</h3>");
    
            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>'  + "It's your turn!</h3>");
        }

        //If it's Player 2's turn to choose
        else if (snapshot.val().status2 === "choosing RPS" && snapshot.val().status1 === "chosen"){

            $("#player1turn").html('<div class="row"><div class="col-md-12"><h3>' + "Waiting for" + snapshot.val().name2 + "to choose!</h3>");
    
            $("#player2turn").html('<div class="row"><div class="col-md-12"><h3>'  + "It's your turn!</h3>");
        }

    })}

function RPS() {
    database.ref("game/players").on("child_added", function(snapshot) {
        //If Player 1 is choosing, create RPS buttons div
        if (snapshot.val().status1 === "choosing RPS") {
        $("#rpsplayer1").html('<div class="row"><div class="buttons col-md-12 buttonsplayer1"><h3><button data-val = "rockp1" id="rockp1">Rock</button></h3><h3><button data-val = "paperp1" id="paperp1">Paper</button></h3><h3><button data-val = "scissorsp1" id="scissorsp1">Scissors</button></h3>');
}        //If Player 2 is choosing, create RPS buttons div
        if (snapshot.val().status2 === "choosing RPS") {
        $("#rpsplayer2").html('<div class="row"><div class="buttons col-md-12"><h3><button class = "buttonsplayer2" data-val = "rockp2" id="rockp2">Rock</button></h3><h3><button data-val = "paperp2" id="paperp2">Paper</button></h3><h3><button data-val = "scissorsp2" id="scissorsp2">Scissors</button></h3>');}

    $(document).on('click', 'button', function() {
 
        player1.choice = $(this).attr("id");
        player2.choice = $(this).attr("id");
        if (player2.choice === undefined) {player2.choice = "n/a"}

        // If player 1 chose rock
        if (player1.choice === "rockp1" && snapshot.val().status1 === "choosing RPS") { 
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Rock</h2>');
            player1.status = "chosen";
            player2.status = "choosing RPS";
            database.ref("game/players/player1").update({
                status1: player1.status,
                chose1: player1.choice})
            database.ref("game/players/player2").update({
                status2: player2.status,
                turn: snapshot.val().name2});
                }

        //If player 2 chose rock
        else if (player2.choice === "rockp2" && snapshot.val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h2>Rock</h2>');
            player1.status = "choosing RPS";
            player2.status = "chosen";
                
                database.ref("game/players/player1").update({
                    status1: player1.status,
                    turn: snapshot.val().name1})
                database.ref("game/players/player2").update({
                    status2: player2.status,
                    chose2: player2.choice})}

        //If player 1 chose paper
         if (player1.choice === "paperp1" && snapshot.val().status1 === "choosing RPS") {
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Paper</h2>');
            player1.status = "chosen";
            player2.status = "choosing RPS";

                database.ref("game/players/player1").update({
                    status1: player1.status,
                    chose1: player1.choice})
                database.ref("game/players/player2").update({
                    status2: player2.status,
                    turn: snapshot.val().name2})}

        //If player 2 chose paper
        else if (player2.choice === "paperp2" && snapshot.val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h2>Paper</h2>');
            player1.status = "choosing RPS";
            player2.status = "chosen";
                    
            database.ref("game/players/player1").update({
                status1: player1.status,
                turn: snapshot.val().name1})
            database.ref("game/players/player2").update({
                status2: player2.status,
                chose2: player2.choice})}
        
        //If player 1 chose scissors
        if (player1.choice === "scissorsp1" && snapshot.val().status1 === "choosing RPS") {
            $("#rpsplayer1").html('<div class="row"><div class="col-md-12"><h2>Scissors</h2>');
            player1.status = "chosen";
            player2.status = "choosing RPS";    
                    
            database.ref("game/players/player1").update({
                status1: player1.status,
                chose1: player1.choice})
            database.ref("game/players/player2").update({
                status2: player2.status,
                chose2: player2.choice,
                turn: snapshot.val().name2})}

        //If player 2 chose scissors
        else if (player2.choice === "scissorsp2" && snapshot.val().status2 === "choosing RPS") {
            $("#rpsplayer2").html('<div class="row"><div class="col-md-12"><h2>Scissors</h2>');
            player1.status = "choosing RPS";
            player2.status = "chosen";
                    
                database.ref("game/players/player1").update({
                    status1: player1.status,
                    turn: snapshot.val().name2})
                database.ref("game/players/player2").update({
                    status2: player2.status,
                    chose2: player2.choice})}
                
                })})}


    function points() {

        database.ref("game/players").on("child_added", function(snapshot) {
            
            // database.ref().update({
            //     player1wins: player1.wins,
            //     player2losses: player2.losses})

        //If player1 chose rock and player2 chose paper
        if (snapshot.val().chose1 === "rockp1" && snapshot.val().chose2 === "paperp2") {
            // snapshot.val().player1wins;
            // snapshot.val().player2losses;

            player2.wins++;
            player1.losses++;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name2 + 'wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name2 + 'wins!</h2>');

            player1.choice = "n/a";
            player2.choice = "n/a";
                
            database.ref("game/players/player1").update({
                player1losses: player1.losses,
                chose1: player1.choice})
            database.ref("game/players/player2").update({
                player2wins: player2.wins,
                chose2: player2.choice})
        
            snapshot.val().player1losses;
            snapshot.val().player2wins;
            snapshot.val().chose1;
            snapshot.val().chose2;
        }  

        //If player1 chose paper and player2 chose rock
        else if (snapshot.val().chose1 === "paperp1" && snapshot.val().chose2 === "rockp2") {

            player1.wins++;
            player2.losses++; 

            // snapshot.val().player1wins;
            // snapshot.val().player2losses;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name1 + 'wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name1 + 'wins!</h2>');

            player1.choice = "n/a";
            player2.choice = "n/a";

            database.ref("game/players/player1").update({
                player1wins: player1.wins,
                chose1: player1.choice})
            database.ref("game/players/player2").update({
                player2losses: player2.losses,
                chose2: player2.choice})
        
            snapshot.val().player1wins;
            snapshot.val().player2losses;
            snapshot.val().chose1;
            snapshot.val().chose2;  
            }  

        //If player1 chose rock and player2 chose scissors
        else if (snapshot.val().chose1 === "rockp1" && snapshot.val().chose2 === "scissorsp2") {
            player1.wins++;
            player2.losses++;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name1 + 'wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name1 + 'wins!</h2>');

            player1.choice = "n/a";
            player2.choice = "n/a";

            database.ref("game/players/player1").update({
                player1wins: player1.wins,
                chose1: player1.choice})
            database.ref("game/players/player2").update({
                player2losses: player2.losses,
                chose2: player2.choice})
        
            snapshot.val().player1wins;
            snapshot.val().player2losses;
            snapshot.val().chose1;
            snapshot.val().chose2;    
            }  

        //If player1 chose scissors and player2 chose rock
        else if (snapshot.val().chose1 === "scissorsp1" && snapshot.val().chose2 === "rockp2") {
            
            player2.wins++;
            player1.losses++;

            // snapshot.val().player1wins;
            // snapshot.val().player2losses;

            $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name2 + 'wins!</h2>');
            $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name2 + 'wins!</h2>');

            player1.choice = "n/a";
            player2.choice = "n/a";

            database.ref("game/players/player1").update({
                player1losses: player1.losses,
                chose1: player1.choice})
            database.ref("game/players/player2").update({
                player2wins: player2.wins,
                chose2: player2.choice})
        
            snapshot.val().player1losses;
            snapshot.val().player2wins;
            snapshot.val().chose1;
            snapshot.val().chose2;  
            }  

     //If player1 chose scissors and player2 chose paper
     else if (snapshot.val().chose1 === "scissorsp1" && snapshot.val().chose2 === "paperp2") {
        // snapshot.val().player1wins;
        // snapshot.val().player2losses;

        player1.wins++;
        player2.losses++;

        player1.choice = "n/a";
        player2.choice = "n/a";

        database.ref("game/players/player1").update({
            player1wins: player1.wins,
            chose1: player1.choice})
        database.ref("game/players/player2").update({
            player2losses: player2.losses,
            chose2: player2.choice})
        
            snapshot.val().player1wins;
            snapshot.val().player2losses;
            snapshot.val().chose1;
            snapshot.val().chose2;   

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name1 + 'wins!</h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name1 + 'wins!</h2>');
        }  

    //If player1 chose paper and player2 chose scissors
    else if (snapshot.val().chose1 === "paperp1" && snapshot.val().chose2 === "scissorsp2") {
        player1.losses++;
        player2.wins++;

        player1.choice = "n/a";
        player2.choice = "n/a"; 
            
        database.ref("game/players/player1").update({
            player1losses: player1.losses,
            chose1: player1.choice})
        database.ref("game/players/player2").update({
            player2wins: player2.wins,
            chose2: player2.choice})
        
            snapshot.val().player1losses;
            snapshot.val().player2wins;
            snapshot.val().chose1;
            snapshot.val().chose2;    

        // snapshot.val().player1wins;
        // snapshot.val().player2losses;

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name2 + 'wins!</h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name2 + 'wins!</h2>');
        } 

    //TIE GAME

    if (snapshot.val().chose1 === "rockp1" && snapshot.val().chose2 === "rockp2" || snapshot.val().chose1 === "paperp1" && snapshot.val().chose2 === "paperp2" || snapshot.val().chose1 === "scissorsp1" && snapshot.val().chose2 === "scissorsp2") {
        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2> TIE! </h2>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2> TIE!</h2>');
    }

    //POINTS AT END
    if (player1.wins === 5) {

        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>You win the game!</h2>'+ '<button + "type="restart">Restart</button></form>');
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name1 + 'wins the game!</h2>'+ '<button + "type="restart">Restart</button></form>');
        }  

    else if (player2.wins === 5) {
            
        $("#winnerplayer2").html('<div class="row"><div class="col-md-12"><h2>You win the game!</h2>'+ '<button + "type="restart">Restart</button></form>');
        $("#winnerplayer1").html('<div class="row"><div class="col-md-12"><h2>' + snapshot.val().name2 + 'wins the game!</h2>'+ '<button + "type="restart">Restart</button></form>');
        }
    })}

initialInputs();
pickingTurns();
RPS();
points();
