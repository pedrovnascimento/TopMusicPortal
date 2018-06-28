function homePage(){
	window.location.href = "/TopMusicPortal/";
}

//SECTION 2
function playTrack(div){
	var index = div.getAttribute("data-id");
	var song = document.getElementById("json_audio_" + index);
	if(song.paused){
		//PAUSE OTHER SONGS
		for( i = 1; i <= 4; i++){
			var otherTrack = document.getElementById("json_audio_" + i);
			document.getElementById('album-slot_' + i).classList.remove('div-playing');
			//document.getElementById('json_img_' + i).classList.remove('img-playing');

			otherTrack.pause();

		}

		document.getElementById('album-slot_' + index).classList.remove('div-playing');
		document.getElementById('album-slot_' + index).classList.add('div-playing');

		//document.getElementById('json_img_' + index).classList.remove('img-playing');
		//document.getElementById('json_img_' + index).classList.add('img-playing');

		song.play();


		song.addEventListener("ended", function(){
		     song.currentTime = 0;

			 document.getElementById('album-slot_' + index).classList.remove('div-playing');

 			 //document.getElementById('json_img_' + index).classList.remove('img-playing');
		});

	}
	else{
		document.getElementById('album-slot_' + index).classList.remove('div-playing');


		//document.getElementById('json_img_' + index).classList.remove('img-playing');
		song.pause();
	}
}



// SECTION 3

$(function() {
  var tabs = $('#features > nav a');
  var tabsContent = $('#features > article > section');

  tabs.click(function(e) {
    e.preventDefault();

    var that = $(this);

    tabs.removeClass('is-selected');
    that.addClass('is-selected');
    tabsContent.removeClass('is-selected');

    tabsContent
      .filter((i, tab) => $(tab).data('id') === that.data('id'))
      .addClass('is-selected');
  });
});

// navbar
function responsiveNavBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


var fade = true;
$(document).scroll(function() {
	if($(window).width() >= 576 ){
		if($(window).scrollTop() === 0) {
			 $(".topnav").fadeTo("slow", 1);
			 //console.log("asa");
			 fade = true;
		}
		else if(fade) {
			 $(".topnav").fadeTo("fast", 0.7);
			 //console.log("z");
			 fade = false;
		}

	}

});

/*
var fadingIn = false;
    var fadingOut = false;
    $(document).scroll(function() {
        var $scrollVal = $(window).scrollTop();
        if ($scrollVal > 10 && $scrollVal < 550) {
            //Check if there is an ongoing fade-in. If so, do not animate
            if (!fadingIn) {
                $(".topnav").fadeTo("slow", 1, function() {
                    //Reset the fade-in flag when the animation is over
                    fadingIn = false;
                });
            }
        } else {
            if (!fadingOut) {
                $(".topnav").fadeTo("slow", 0.5, function() {
                    fadingOut = false;
                });
            }
        }

    });
*/


//sect 1
function carouselSwipe(){
	$(".carousel").swipe({
	  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
	    if (direction == 'left') $(this).carousel('next');
	    if (direction == 'right') $(this).carousel('prev');
	  },
	  allowPageScroll:"vertical"

	});
}



//sec 3

function scrollToAnchor(id){
	var tag = $("#" + id);
    $('html,body').animate({scrollTop: tag.offset().top},'slow');
}
