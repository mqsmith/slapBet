// Global variables
var chartTeams = [];
var chartOdds = [];

// Firebase variable
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

// API Call using AJAX for highlight videos
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
          var stringHighlight = String(highlight);
          var splitHighlight = stringHighlight.substr(32, 11);
          console.log(splitHighlight);
          console.log(thumbnail);
          var thumbnail = "https://img.youtube.com/vi/" + splitHighlight + "/0.jpg";
          $("#highlights").append("<div class='highlight-url'id='thumb'><a href='" + response.events[i].strVideo + "'><img src='" + thumbnail + "'></a></div>");
        }
      }
    });
}
// API Call using AJAX for highlight videos
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
          var stringHighlight = String(highlight);
          var splitHighlight = stringHighlight.substr(32, 11);
          console.log(splitHighlight);
          console.log(thumbnail);
          var thumbnail = "https://img.youtube.com/vi/" + splitHighlight + "/0.jpg";
          $("#highlights").append("<div class='highlight-url'id='thumb'><a href='" + response.events[i].strVideo + "'><img src='" + thumbnail + "'></a></div>");
        }

      }
    });
}

// *** API Calls using D3 ***
// Function creating MLS odds data
function importSoccerData() {
  var queryURL = "https://api.the-odds-api.com/v3/odds?sport=soccer_usa_mls&region=us&apiKey=afd1f6803bcc123bffedb1e448fed02d";
  d3.json(queryURL, function (data) {
    var gameBetween = data.data[0].teams;
    var h2hArray = data.data[0].sites[0].odds.h2h;
    console.log(data.data);
    for (i = 0; i < data.data.length; i++) {
      $(".matches").append("<tr class='well' data-state='" + data.data[i].sites[0].odds.h2h + "'id='" + data.data[i].teams + "'>" + "<td class='home' home='" + data.data[i].teams[0] + "'>" + data.data[i].teams[0] + "</td>" + "<td class='away' away='" + data.data[i].teams[1] + "'>" + data.data[i].teams[1] + "</td>"
        + "<td class='odds' odds-data='" + data.data[i].sites[0].odds.h2h + "'>" + data.data[i].sites[0].odds.h2h);
      // console.log(data.data[i].teams);
      // console.log(data.data[i].sites[0].odds.h2h);

    };
  })
}

// Function creating NFL odds data
function importFootballData() {
  var queryURL = "https://api.the-odds-api.com/v3/odds?sport=americanfootball_nfl&region=us&apiKey=afd1f6803bcc123bffedb1e448fed02d";
  d3.json(queryURL, function (data) {
    console.log(data.data);
    for (i = 0; i < data.data.length; i++) {
      $(".matches").append("<tr class='well' data-state='" + data.data[i].sites[0].odds.h2h + "'id='" + data.data[i].teams + "'>" + "<td class='home' home='" + data.data[i].teams[0] + "'>" + data.data[i].teams[0] + "</td>" + "<td class='away' away='" + data.data[i].teams[1] + "'>" + data.data[i].teams[1] + "</td>"
        + "<td class='odds' odds-data='" + data.data[i].sites[0].odds.h2h + "'>" + data.data[i].sites[0].odds.h2h);
      console.log(data.data[i].teams[0]);
      console.log(data.data[i].teams[1]);
      console.log(data.data[i].sites[0].odds.h2h);
      var gameBetween = data.data[i].teams;
      var h2hArray = data.data[i].sites[0].odds.h2h;
    };
  })
}

// Dropdown button calling the creating MLS data
$(".dropdown-menu").on("click", "#mls-button", function () {
  $(".matches").empty();
  $("#highlights").empty();
  importSoccerData();
  soccerHighlights();
});

// Dropdown button calling the creating NFL data
$(".dropdown-menu").on("click", "#nfl-button", function () {
  $(".matches").empty();
  $("#highlights").empty();
  importFootballData();
  nflHighlights();
});

// Event listener to get data from API calls
$(document).on("mouseover", ".well", function () {
  // homeTeam = $(".homeTeam").text();
  // awayTeam = $(".awayTeam").text();
  console.log("======================");
  console.log("New mouseover:");
  console.log(this);
  chartOdds = $(this).attr("data-state");
  names = $(this).attr("id");
  console.log(names);
  console.log(names.split(','));
  names = names.split(',');
  names.push("Draw");
  chartTeams = names
  console.log(chartTeams);
  console.log(chartOdds);
  chart(chartTeams, chartOdds);
})

// Function using Chart.js
function chart(chartTeams, chartOdds) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartTeams,
      datasets: [{
        label: "",
        data: chartOdds.split(','),
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
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
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