// this gets called if the auth status changes from
// signed in to signed out, or signed out to signed in

// user represents the user that is signed in
// if no user is signed in, then no user object is there

auth.onAuthStateChanged(user => {
   if (user) {
       // get data if a valid user is logged in
	   // do any set up code needed for a logged in user
       hideShowStudentData(true);
   }
   else {
	   // do any code needed once someone logs our or if
	   // we load the app and no one is currently logged in
       hideShowStudentData(false);
   }
})

function signUp(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(email + " " + password);

    auth.createUserWithEmailAndPassword(email,password).then(()=> {
        console.log("Signed up" + email);
		// after we successfully created the user with eamil and pw
		// the method returns a "promise" and we can call the .then()
		// function that will run after this async task has completed.
		
		// any code that executes in here, is only going to run if the 
		// user was successfully created.
    }).catch(e => console.log(e.message));
		// if the firebase add user was not successful, then an
		// error message is returned and we can access the contents of
		// that error message using a catch then log it to console
}

function signIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password).then(()=> {
        console.log("Signed in" + email);
		// put any action or method calls you wnat to execute
		// after sign in has occurred
    }).catch(e => console.log(e.message));
}

function signOut(){
    auth.signOut();
    console.log("Signed out");
	// any action or methods calls you want to execute after
	// sign out has occurred
}
