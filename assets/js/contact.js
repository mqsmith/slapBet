


console.log("Contact Page");

// 2. Button for adding User
$("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("click");

    // Grabs user input
    var userName = $("#email").val().trim();
    // var contactMethod = $("#").val().trim();
    var messages = ($("#comment").val().trim());

    console.log(userName);
    console.log(messages);




    // Creates local "temporary" object for holding user data
    var newUser = {
        name: userName,
        message: messages
    };


    console.log(newUser);




    // // Clears all of the text-boxes
    // $("#inputEmail1").val("test");

    // $("#message").val("test");

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

