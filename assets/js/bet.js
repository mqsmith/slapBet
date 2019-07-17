console.log("Bet Page")

var betName;
var addFriends;
var gameBet;
var numberOfSlaps;

var firebaseConfig = {
    apiKey: "AIzaSyDb61eAKxoJbSt9g6NjdhSe2wa9xd4nSr0",
    authDomain: "slapbet-ecc3b.firebaseapp.com",
    databaseURL: "https://slapbet-ecc3b.firebaseio.com",
    projectId: "slapbet-ecc3b",
    storageBucket: "slapbet-ecc3b.appspot.com",
    messagingSenderId: "651388190757",
    appId: "1:651388190757:web:ec6bfb4ea34fa69b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

database.ref('bets/').on("child_added", function makeDiv(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().Name);
    console.log(snapshot.val().Friends);
    console.log(snapshot.val().Bet);
    console.log(snapshot.val().Wager);
    // Change the HTML to reflect
    $(".slaps").append("<tr class='well'><th class='betName'> " + snapshot.val().Name + " </th><td class='addFriends'> " + 
        snapshot.val().Friends + " </td><td class='gameBet'> " + snapshot.val().Bet + "<td class='numberOfSlpas'> " + 
        snapshot.val().Wager + " </td></tr>");


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$("#create-bet-button").on("click", function (event) {
    event.preventDefault();

    betName = $("#exampleInputBet").val();
    addFriends = $("#exampleInputFriends").val();
    gameBet = $("#exampleBet").val();
    numberOfSlaps = $("#exampleFormControlSelect1").val();
    console.log(betName);
    console.log(addFriends);
    console.log(gameBet);
    console.log(numberOfSlaps);


    database.ref('bets/').push({
        Name: betName,
        Friends: addFriends,
        Bet: gameBet,
        Wager: numberOfSlaps,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#exampleInputBet").val("");
    $("#exampleInputFriends").val("");
    $("#exampleBet").val("");
    $("#exampleFormControlSelect1").val("1");
});