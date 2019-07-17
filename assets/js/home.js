console.log("Home Page");
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

