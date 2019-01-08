var config = {
    apiKey: "AIzaSyAuzOWzyYqpbwF8Ec1CPvDtQlZGLnVifKk",
    authDomain: "my-first-firebase-a9f2d.firebaseapp.com",
    databaseURL: "https://my-first-firebase-a9f2d.firebaseio.com",
    projectId: "my-first-firebase-a9f2d",
    storageBucket: "my-first-firebase-a9f2d.appspot.com",
    messagingSenderId: "891719830958"
  };

  firebase.initializeApp(config);

  var database = firebase.database();



  // Function that gets snapshot of the stored data, allowing page to update in real-time.
  database.ref().on("value", function(snapshot) {
      
  })