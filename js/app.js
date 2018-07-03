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


  var _DB_FIRST_KEY_GERAL_ = "27_2018-06-24";
  var _DB_FIRST_KEY_FUNK_ = "28_2018-06-27";

function frontPage(){

    var topGeralRef = firebase.database().ref("top_music").limitToLast(1);
    var topFunkRef = firebase.database().ref("top_funk").limitToLast(1);

    topGeralRef.once("value").then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childDataGeral = childSnapshot.val();
    	  //console.log(childDataGeral);

          topFunkRef.once("value").then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                var key = childSnapshot.key;
                // childData will be the actual contents of the child
                var childDataFunk = childSnapshot.val();
              	//console.log(childDataFunk);

              	updateDataPage(childDataGeral, childDataFunk);
            	}
            );
          });

      	}
      );
    });
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
        if(track.img_url != "null"){

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

            $('#header_item_' + i).css("background-image", "url('"+track.img_url+"')");
        }
        else
            i--;
	}

    //Section 2

	var tracksDisplay = 4;

    var random = Math.floor((Math.random() * 10) + 0);

	for(i = random; i < 40; i++){
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
    var month = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    var date_str = str.split("_");
    var res = date_str[1].split("-");

    return (res[2]+" de "+month [parseInt(res[1]) - 1 ]+", "+res[0]);

}

function updateTopPage(data, date, firstKey){
    console.log(date);
    //console.log(data);

    if(date == firstKey )
        document.getElementById("datePrev").style.display = "none";
    else
        document.getElementById("datePrev").style.display = "block";

    date = getStrDate(date);
    $( "#json_date").empty();
    $( "#json_date").append( date );

     for(i = 0; i< data.length; i++){
        var track = data[i];


        $('#json_statusLateral_' + (i+1) ).attr("class", "");
        $('#json_statusLateral_' + (i+1) ).addClass("statusLateral " + translateCompareBg(track.compare));
        $('#json_icon_' + (i+1) ).attr("class", "");
        $('#json_icon_' + (i+1) ).addClass(translateCompare(track.compare));

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

        $('#json_img_bg_' + (i+1) ).attr("src", "https://img.youtube.com/vi/"+track.id+"/0.jpg");

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
    //console.log(type);
    //console.log(number);
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
            //console.log(">>>>>>>" + key)
            updateTopPage(childData, key, _DB_FIRST_KEY_GERAL_);
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
            //console.log(">>>>>>>" + key)
            updateTopPage(childData, key, _DB_FIRST_KEY_FUNK_);
        });
    }

    return number;
}
