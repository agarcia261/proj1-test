$(document).ready(function(){
    
    var database = firebase.database();
    var location = database.ref("/locations");
    var gameStats={}

    var locObject=[]


     var stats = {
        wins:02,
        losses:5,
        best:20
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          gameStats = database.ref("/stats/"+uid);


        //   console.log(displayName);
        //   console.log(email);

        //   console.log(emailVerified);
        //   console.log(photoURL);
        //   console.log(isAnonymous);

        //   console.log(uid);
        //   console.log(providerData);

          
          // ...
        } else {
          // User is signed out.
          // ...
        }
      });

    gameStats.set(stats)
    console.log("testing testing")

    location.on("child_added", function(loc){
        //loc.forEach(function(childSnapshot) {
          //  var childKey = childSnapshot.key;
           // var childData = childSnapshot;

            // locObject.lat=childSnapshot.val().lat
            // locObject.lng=childSnapshot.val().lng

            // locObject.=childSnapshot.val().lat

            // locObject.lat=childSnapshot.val().lat
            // locObject.lat=childSnapshot.val().lat
            // locObject.lat=childSnapshot.val().lat

            //console.log(childKey)
            locObject.push(loc.val())

            console.log(locObject)

         // });

    })

    

    



    gameStats.on("value", function(childSnapshot) {
        // Store everything into a variable.
        $("#win").text(childSnapshot.val().wins);
        $("#losses").text(childSnapshot.val().losses);
        $("#best").text(childSnapshot.val().best);

    });


    //gameStats.set(stats)


    $('.modal').modal({
        dismissible: false,
        onCloseEnd: function(){timer.run()}
    });
    $('.modal').modal('open');  
    $("#timerNum").text(timer.startNumber);
  });

  var timer = {
    startNumber: 120,
    intervalId: '',
    run: function () {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.decrement, 1000);
    },
    decrement: function () {
        timer.startNumber--;
        $("#timerNum").text(timer.startNumber);
        if (timer.startNumber === 0) {
            this.stop();
            //do something here after timer hits zero
        }
    },
    stop: function () {
        clearInterval(this.intervalId);
    }
};