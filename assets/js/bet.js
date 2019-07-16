console.log("Bet Page")

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

$("#create-bet-button").on("click", function (event) {
    event.preventDefault();

     var betName = $("#exampleInputBet").val();
     var addFriends = $("#exampleInputFriends").val();
    var gameBet = $("#exampleBet").val();
    var numberOfSlaps = $("#exampleFormControlSelect1").val();
    console.log(betName);
    console.log(addFriends);
    console.log(gameBet);
    console.log(numberOfSlaps);
    $(".slaps").append("<tr class='well'><th class='betName'> " +
        betName +
        " </th><td class='addFriends'> " + addFriends +
        " </td><td class='gameBet'> " + gameBet + "<td class='numberOfSlpas'> " + numberOfSlaps +
        " </td></tr>");

    database.ref().push({
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