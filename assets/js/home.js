
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

// API Call for highlight videos

function soccerHighlights() {
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4346";
  // NFL ID = 4391
  // MLS ID = 4346

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function (response) {
      // Storing an array of results in the results variable
      console.log(response);
      console.log(response.events[0].strVideo);
      for (i = 0; i < response.events.length; i++) {

        var highlight = response.events[i].strVideo;
        console.log(highlight);
        if (highlight !== null && highlight !== "") {
          $("#highlights").append("<div class='highlight-url'><a href='" + response.events[i].strVideo + "'>"
            + response.events[i].strEvent + "</a></div>");
        }

      }
    });
}

function nflHighlights() {
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4391";
  // NFL ID = 4391
  // MLS ID = 4346

  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function (response) {
      // Storing an array of results in the results variable
      console.log(response);
      console.log(response.events[0].strVideo);
      for (i = 0; i < response.events.length; i++) {

        var highlight = response.events[i].strVideo;
        console.log(highlight);
        if (highlight !== null && highlight !== "") {
          $("#highlights").append("<div class='highlight-url'><a href='" + response.events[i].strVideo + "'>"
            + response.events[i].strEvent + "</a></div>");
        }

      }
    });
}




$("#login").on("click", function (event) {
  event.preventDefault();
  var email = $("#exampleInputEmail1").val().trim();
  var password = $("#exampleInputPassword1").val().trim();
  console.log(email);
  console.log(password);
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

  });
  $("#exampleInputEmail1").val("");
  $("#exampleInputPassword1").val("");
  writeUserData(email, password);
});

function writeUserData(email, password) {
  database.ref('users/').push({
    username: email,
    password: password,
    //   UID: User UID,
  });
}

// *** D3 API CALL ***
function importSoccerData() {
  var queryURL = "https://api.the-odds-api.com/v3/odds?sport=soccer_usa_mls&region=us&apiKey=afd1f6803bcc123bffedb1e448fed02d";

  d3.json(queryURL, function (data) {
    var gameBetween = data.data[0].teams;
    var h2hArray = data.data[0].sites[0].odds.h2h;

    console.log(data.data);

    for (i = 0; i < data.data.length; i++) {
      $(".matches").append("<tr class='well' id='" + i + "'><th id='teams"+i+"'>"  + data.data[i].teams +
        " </td><td class='odds-data'> " + data.data[i].sites[0].odds.h2h);
      console.log(data.data[i].teams);
      console.log(data.data[i].sites[0].odds.h2h);
      
      var gameBetween = data.data[i].teams;
      var h2hArray = data.data[i].sites[0].odds.h2h;
      console.log(gameBetween);
      console.log(h2hArray);
      chart(gameBetween, h2hArray);
      
    };
  })
}




function importFootballData() {
  var queryURL = "https://api.the-odds-api.com/v3/odds?sport=americanfootball_nfl&region=us&apiKey=afd1f6803bcc123bffedb1e448fed02d";

  d3.json(queryURL, function (data) {
    console.log(data.data);
    for (i = 0; i < data.data.length; i++) {
      $(".matches").append("<tr class='well'><th class='teams'" + i +">" + data.data[i].teams +
        " </td><td class='odds-data'> " + data.data[i].sites[0].odds.h2h);
      console.log(data.data[i].teams);
      console.log(data.data[i].sites[0].odds.h2h);
      var gameBetween = data.data[i].teams;
      var h2hArray = data.data[i].sites[0].odds.h2h;
      chart(gameBetween, h2hArray);
      

    };
  })
}

$(".dropdown-menu").on("click", "#mls-button", function () {
  $(".matches").empty();
  $("#highlights").empty();
  importSoccerData();
  soccerHighlights();
 
});

$(".dropdown-menu").on("click", "#nfl-button", function () {
  $(".matches").empty();
  $("#highlights").empty();
  importFootballData();
  nflHighlights();
});

function chart(gameBetween, h2hArray) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: gameBetween,
      datasets: [{
        label: 'H2H Odds',
        data: h2hArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
