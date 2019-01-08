var config = {
  apiKey: "AIzaSyDe5eSla3iPsS_QEmOhYbq2i7iXRNCcaRg",
  authDomain: "train-scheduler-1393c.firebaseapp.com",
  databaseURL: "https://train-scheduler-1393c.firebaseio.com",
  projectId: "train-scheduler-1393c",
  storageBucket: "",
  messagingSenderId: "486204515125"
}
firebase.initializeApp(config);

var database = firebase.database();



// Function that gets snapshot of the stored data, allowing page to update in real-time.
database.ref().on("value", function (snapshot) {

})

var trainName = "";
var des = "";
var firstTrain = "";
var frequency = "";

$("#trainData").on("click", function (event) {
  event.preventDefault();

  trainName = $("#train").val().trim();
  des = $("#destination").val().trim();
  firstTrain = $("#time").val().trim();
  frequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: des,
    train: firstTrain,
    frequency: frequency
  };

  database.ref().push(newTrain);

  

  alert("Train info successfully added!");

  $("#train").val("");
  $("#destination").val("");
  $("#time").val("");
  $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  var tname = childSnapshot.val().name;
  var tdestination = childSnapshot.val().destination;
  var tfirstTrain = childSnapshot.val().train;
  var tfrequency = childSnapshot.val().frequency;

  var firstTimeConverted = moment(tfirstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % tfrequency;
  console.log(tRemainder);

  var tMinutesTillTrain = tfrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  var newRow = $("<tr>").append(
    $("<td>").text(tname),
    $("<td>").text(tdestination),
    $("<td>").text(tfirstTrain),
    $("<td>").text(tfrequency)
  );
  $("#train-table > tbody").append(newRow);
});