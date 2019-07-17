
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

function highlights()
{
  var queryURL = "https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id=4346";

  d3.json(queryURL, function (data)
  {
   
    
    console.log(data.data);

    // for(i=0;i<data.data.length; i++){
    //     $(".matches").append("<tr class='well'><th class='teams'> " + data.data[i].teams +
    //     " </td><td class='odds-data'> " + data.data[i].sites[0].odds.h2h);
    //   console.log(data.data[i].teams);
    //   console.log(data.data[i].sites[0].odds.h2h);
      
    // };
  })
}
highlights();

// $("#highlights").append("<tr class='well'><th class='teams'> " + data.data[i].teams +
//         " </td><td class='odds-data'> " + data.data[i].sites[0].odds.h2h);


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
function importSoccerData()
{
  var queryURL = "https://api.the-odds-api.com/v3/odds?sport=soccer_usa_mls&region=us&apiKey=afd1f6803bcc123bffedb1e448fed02d";

  d3.json(queryURL, function (data)
  {
    var gameBetween=data.data[0].teams;
    var h2hArray=data.data[0].sites[0].odds.h2h;
    
    console.log(data.data);

    for(i=0;i<data.data.length; i++){
        $(".matches").append("<tr class='well'><th class='teams'> " + data.data[i].teams +
        " </td><td class='odds-data'> " + data.data[i].sites[0].odds.h2h);
      console.log(data.data[i].teams);
      console.log(data.data[i].sites[0].odds.h2h);
      
    };
  })
}
// function importFootballData()
// {
//   var queryURL = "https://api.the-odds-api.com/v3/odds?sport=soccer_usa_mls&region=us&apiKey=afd1f6803bcc123bffedb1e448fed02d";

//   d3.json(queryURL, function (data)
//   {
//     var gameBetween=data.data[0].teams;
//     var h2hArray=data.data[0].sites[0].odds.h2h;
    
//     console.log(data.data);

//     for(i=0;i<data.data.length; i++){
//         $(".matches").append("<tr class='well'><th class='teams'> " + data.data[i].teams +
//         " </td><td class='odds-data'> " + data.data[i].sites[0].odds.h2h);
//       console.log(data.data[i].teams);
//       console.log(data.data[i].sites[0].odds.h2h);
      
//     };
//   })
// }

 $(".dropdown-menu").on("click", "#mls-button", function (){
 
 importSoccerData();
 });

//  $(".dropdown-menu").on("click", "#nfl-button", function (){
 
//   importFootballData();
//   });
 