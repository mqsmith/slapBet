console.log("Contact Page");

// Button for adding User
$("#submit").on("click", function (event) {
    event.preventDefault();
    
    // Grabs user input
    var userName = $("#email").val().trim();
    var messages = ($("#comment").val().trim());
    console.log(userName);
    console.log(messages);
    
    // Creates local "temporary" object for holding user data
    var newUser = {
        name: userName,
        message: messages
    };
    console.log(newUser);
});