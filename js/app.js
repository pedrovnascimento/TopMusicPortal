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

//const dbRef = firebase.database().ref();


//const topGeralRef = dbRef.child('top_music');
//const topFunkRef = dbRef.child('top_funk');

//var topFunkRef = firebase.database().ref("top_funk").limitToLast(1);


var _DB_FIRST_KEY_ = "27_2018-06-24";

function frontPage(){


    var topGeralRef = firebase.database().ref("top_music").limitToLast(1);
    var topFunkRef = firebase.database().ref("top_funk").limitToLast(1);

    topGeralRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childDataGeral = childSnapshot.val();
    	  console.log(childDataGeral);

          topFunkRef.once("value").then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childDataFunk = childSnapshot.val();
              	console.log(childDataFunk);

              	updateDataPage(childDataGeral, childDataFunk);
            	}
            );
          });

      	}
      );
    });
}

function randomBanner(topGeral, topFunk){


}
function updateDataPage(topGeral, topFunk){
    //console.log(topFunk);
    //Section 1

	var tracksDisplay = 5;

	for(i = 1; i <= tracksDisplay; i++){
        var random = Math.floor((Math.random() * 20) + 0);

        if (i % 2 == 0 ){
            var topName = "Funk"
            var track = topFunk[random];
        }
        else{
            var topName = "Geral"
            var track = topGeral[random];
        }

		$('#header_item_' + i).css("background-image", "url('"+track.img_url+"')");

		$( "#json_header_number_" + i ).append( random+1 );
		$( "#json_header_top_" + i ).append( "Top " + topName);
		$( "#json_header_info_" + i ).append( track.artist + " - " + track.music);

        //$('#json_header_number_' + i).html('<a href="http://www.google.com"></a>');
        $('#header_text_' + i).click(function() {
          	//window.location.replace(link);

            if($(this).data("top") == "geral")
                window.location.href = "top.html";
            else if($(this).data("top") == "funk")
                window.location.href = "topFunk.html";

        });
	}


    //Section 2

	var tracksDisplay = 4;

	for(i = 0; i < 50; i++){
		var track = topGeral[i];
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
		var track = topGeral[i];
        $('#json_table_geral_img_' + (i + 1)).attr("src", track.img_url);
        $( "#json_table_geral_title_" + (i + 1)).append( track.artist + "</br>" + track.music);

        var lp = "-";
        if(track.lasPos != 0)
            lp = track.lasPos;

        $( "#json_table_geral_sem_pass_" + (i + 1)).append( lp );
        $( "#json_table_geral_melhor_pos_" + (i + 1)).append( track.bestPos );
	}

    for(i = 0; i < tracksDisplay; i++){
		var track = topFunk[i];
        $('#json_table_funk_img_' + (i + 1)).attr("src", track.img_url);
        $( "#json_table_funk_title_" + (i + 1)).append( track.artist + "</br>" + track.music);

        var lp = "-";
        if(track.lasPos != 0)
            lp = track.lasPos;

        $( "#json_table_funk_sem_pass_" + (i + 1)).append( lp );
        $( "#json_table_funk_melhor_pos_" + (i + 1)).append( track.bestPos );
	}


}

/*
const usersRef = dbRef.child('users');
const userListUI = document.getElementById("userList");
//console.log(usersRef);

usersRef.on("value", function(snapshot) {
  //console.log(snapshot.val());




}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

*/

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


function translateCompare(str){
    if(str == "+")
      return "fas fa-long-arrow-alt-up";
  else if(str == "-")
    return "fas fa-long-arrow-alt-down";
  else if(str == "=")
    return "far fa-dot-circle";
  else
    return "fas fa-star";
}

function translateCompareBg(str){
  if(str == "+")
      return "bg-up";
  else if(str == "-")
    return "bg-down";
  else if(str == "=")
    return "bg-same";
  else
    return "bg-new";
}

function getStrDate(str){
    //var months = {'01': 'January', '02': 'February', '06': 'JUN'}; //etc
    //var month = months[mm];
    var month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    var date_str = str.split("_");
    var res = date_str[1].split("-");


    return (res[2]+" de "+month [parseInt(res[1]) - 1 ]+", "+res[0]);

}

function updateTopPage(data, date){
    console.log(date);
    console.log(data);

    if(date == _DB_FIRST_KEY_)
        document.getElementById("datePrev").style.display = "none";
    else
        document.getElementById("datePrev").style.display = "block";

    date = getStrDate(date);

     for(i = 0; i< data.length; i++){
        var track = data[i];

        $( "#json_date").empty();
        $( "#json_date").append( date );

        $('#json_statusLateral_' + (i+1) ).attr("class", "");
        $('#json_statusLateral_' + (i+1) ).addClass("statusLateral " + translateCompareBg(track.compare));
        $('#json_icon_' + (i+1) ).attr("class", "");
        $('#json_icon_' + (i+1) ).addClass(translateCompare(track.compare));

        $('#json_img_bg_' + (i+1) ).attr("src", "https://img.youtube.com/vi/"+track.id+"/0.jpg");

        $( "#json_artist_" + (i + 1)).empty();
        $( "#json_music_" + (i + 1)).empty();
        $( "#json_artist_" + (i + 1)).append( track.artist );
        $( "#json_music_" + (i + 1)).append( track.music);

        $('#json_cover_' + (i+1) ).attr("src", "img\audio_track_default.png");

        if(track.img_url)
            $('#json_cover_' + (i+1) ).attr("src", track.img_url);
        else{
            $('#json_cover_' + (i+1) ).attr("src", "https://img.youtube.com/vi/"+track.id+"/0.jpg");
            $('#json_cover_' + (i+1) ).addClass("artCoverVideo");
        }

        var lp = "-";
        if(track.lasPos != 0)
            lp = track.lasPos;

        $( "#json_lw_" + (i + 1)).empty();
        $( "#json_lw_" + (i + 1)).append( lp );
        $( "#json_bw_" + (i + 1)).empty();
        $( "#json_bw_" + (i + 1)).append( track.bestPos );

     }



}

function updateTopData(type, number){
    console.log(number);
    if(type == "geral"){
        var topFunkRef = firebase.database().ref("top_music").limitToLast(number);

        topFunkRef.once("value")
          .then(function(snapshot) {
            //var childSnapshot = snapshot[0];
            var first = true;
            var key;
            var childData;

            snapshot.forEach(function(childSnapshot) {
              // key will be "ada" the first time and "alan" the second time
              if(first){
                  first = false;
                  key = childSnapshot.key;
                  childData = childSnapshot.val();
              }

          	});
            console.log(">>>>>>>" + key)
            updateTopPage(childData, key);
        });
    }
    else if(type == "funk"){
        var topFunkRef = firebase.database().ref("top_funk").limitToLast(number);

        topFunkRef.once("value")
          .then(function(snapshot) {
            //var childSnapshot = snapshot[0];
            var first = true;
            var key;
            var childData;

            snapshot.forEach(function(childSnapshot) {
              // key will be "ada" the first time and "alan" the second time
              if(first){
                  first = false;
                  key = childSnapshot.key;
                  childData = childSnapshot.val();
              }

          	});
            console.log(">>>>>>>" + key)
            updateTopPage(childData, key);
        });
    }

    return number;
}















/*
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
*/
