var config = {
    apiKey: "AIzaSyDb61eAKxoJbSt9g6NjdhSe2wa9xd4nSr0",
    authDomain: "slapbet-ecc3b.firebaseapp.com",
    databaseURL: "https://slapbet-ecc3b.firebaseio.com",
    projectId: "slapbet-ecc3b",
    storageBucket: "",
    messagingSenderId: "651388190757",
    appId: "1:651388190757:web:ec6bfb4ea34fa69b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


console.log("Contact Page");

// 2. Button for adding User
$("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("click");

    // Grabs user input
    var userName = $("#inputEmail1").val().trim();
    // var contactMethod = $("#").val().trim();
    var messages = ($("#message").val().trim());


    // // Creates local "temporary" object for holding employee data
    // var newUser = {
    //     name: userName,
    //     contact: contactMethod,
    //     message: messages
    // };

    // Uploads employee data to the database
    // database.ref().push(newUser);

    // Logs everything to console
    console.log(userName);
    // console.log(contactMethod);
    console.log(messages);




    // Clears all of the text-boxes
    $("#inputEmail1").val("");
    $("#role-input").val("");
    $("#message").val("");

});

$('.contactMethod').on('change', function () {
    alert($('input[name=radioName]:checked', '.contactMethod').val());
});


// $(".contactMethod input").on("change", function () {
//     console.log("I've been Clicked")
//     alert($("input[name=radio]: checked", ".contactMethod").val());

// });


// 3. Create Firebase event for adding New Users to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function (childSnapshot) {
//     console.log(childSnapshot.val());

//     // Store everything into a variable.
//     var userName = childSnapshot.val().name;
//     var contactMethod = childSnapshot.val().contact;
//     var message = childSnapshot.val().messages;



//     // User Info
//     console.log(userName);
//     console.log(contactMethod);
//     console.log(message);
// });