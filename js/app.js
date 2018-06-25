  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDQjMwadrPIwDn89fR3GDSX67IeZyS_ZSE",
    authDomain: "topmusic-eb198.firebaseapp.com",
    databaseURL: "https://topmusic-eb198.firebaseio.com",
    projectId: "topmusic-eb198",
    storageBucket: "topmusic-eb198.appspot.com",
    messagingSenderId: "738031714594"
  };
  firebase.initializeApp(config);

const dbRef = firebase.database().ref();


const topGeralRef = dbRef.child('top_music');
//const topFunkRef = dbRef.child('top_funk');

var topFunkRef = firebase.database().ref("top_funk").limitToLast(1);

topFunkRef.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
	  console.log(childData);

	  updateDataPage(childData);

  	}

);
});

function updateDataPage(topFunk){
    //Section 1

	var tracksDisplay = 5;

	for(i = 1; i <= tracksDisplay; i++){
		var random = Math.floor((Math.random() * 39) + 0);

		$('#header_item_' + i).css("background-image", "url('"+topFunk[random].img_url+"')");

		$( "#json_header_number_" + i ).append( random+1 );
		$( "#json_header_top_" + i ).append( "Top Geral");
		$( "#json_header_info_" + i ).append( topFunk[random].artist + " - " + topFunk[random].music);
	}


    //Section 2

	var tracksDisplay = 4;

	for(i = 0; i < 50; i++){
		var track = topFunk[i];
		if(track.img_url != "null" && track.preview_url != "null"){

			$('#json_img_' + tracksDisplay).attr("src", track.img_url);
			$('#json_audio_' + tracksDisplay).attr("src", track.preview_url);
			tracksDisplay--;

		}
		if(tracksDisplay == 0)
			break;
	}

    //Section 3

    var tracksDisplay = 5;

	for(i = 0; i < tracksDisplay; i++){
		var track = topFunk[i];
        $('#json_table_geral_img_' + (i + 1)).attr("src", track.img_url);
        $( "#json_table_geral_title_" + (i + 1)).append( track.artist + "</br>" + track.music);
        $( "#json_table_geral_sem_pass_" + (i + 1)).append( track.lasPos );
        $( "#json_table_geral_melhor_pos_" + (i + 1)).append( track.bestPos );
	}


}


const usersRef = dbRef.child('users');
const userListUI = document.getElementById("userList");
//console.log(usersRef);

usersRef.on("value", function(snapshot) {
  //console.log(snapshot.val());




}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
/*
usersRef.on("child_added", snap => {

	let user = snap.val();
	console.log(user.name);

	let $li = document.createElement("li");
	$li.innerHTML = user.name;
	$li.setAttribute("child-key", snap.key);
	$li.addEventListener("click", userClicked)
	userListUI.append($li);



  	//$('body').show();


});

*/
function userClicked(e) {

	var userID = e.target.getAttribute("child-key");

	const userRef = dbRef.child('users/' + userID);
	const userDetailUI = document.getElementById("userDetail");

	userDetailUI.innerHTML = ""

	userRef.on("child_added", snap => {


		var $p = document.createElement("p");
		$p.innerHTML = snap.key  + " - " +  snap.val()
		userDetailUI.append($p);


	});

}
