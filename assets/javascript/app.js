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
          $("#name-input").remove();
          var greeting = $("<h3>").text("Hi " + playername + "!" + "You are Player 1!");
          $(".greeting").append(greeting);}
  };

  var player2 = {
    name: '',
    choice: '',
    losses: 0,
    wins: 0,
    status: 'not selected',
    turn: '',
    message(playername) {
        $("#name-input").remove();
        var greeting = $("<h3>").text("Hi " + playername + "!" + "You are Player 2!");
        $(".greeting").append(greeting);}
};

var player1name = player1.name;
var player2name = player2.name;
var player1status = player1.status;
var player2status = player2.status;

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

    $(".playerinfo").html('<form role="form"><div class="form-group"><label for="name-input">Name:<input class="form-control" id="name-input" type="text"><button class="btn btn-default" id="' + player + '" + "type="start">Start</button></form>')
}

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.

database.ref().on("value", function(snapshot) { 
        console.log(snapshot.val());
    if (snapshot.val().name1 === undefined) {
        console.log("player1 is true")
        createUser("player1");
        // {database.ref().update({
        //         name1: "player1"})}
    }

    // if (snapshot.val().name1 !== undefined) {
    //      console.log("player2 is true")
    //     createUser("player2");
    //     {database.ref().update({
    //         name2: "player2"})}
    // }

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
