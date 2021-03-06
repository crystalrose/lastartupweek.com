var dayNumber = 0;
var isMobile = {
	Android: function() {
	    return navigator.userAgent.match(/Android/i) ? true : false;
	},
	BlackBerry: function() {
	    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
	},
	iOS: function() {
	    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	Windows: function() {
	    return navigator.userAgent.match(/IEMobile/i) ? true : false;
	},
	any: function() {
	    return (this.Android() || this.BlackBerry() || this.iOS() || this.Windows());
	}
};
if(isMobile.any()) {
	mobileDevice = true;
} else {
	mobileDevice = false;
	$('.snowshoe-link').remove();
}
jQuery(document).ready(function($) {
   
   'use strict';


	//SMOOTH SCROLL
	smoothScroll.init({
		speed: 500, // How fast to complete the scroll in milliseconds
		easing: 'easeInOutCubic', // Easing pattern to use
		updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
		callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
		callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
	 });
	 
	  
	//COUNTDOWN TIMER
	var newYear = new Date(); 
    newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1); 
    $('#countdown').countdown({until: new Date(2014, 12-1, 18)}); // enter event day
    
    $('#removeCountdown').toggle(
        function() {
            $(this).text('Re-attach'); 
            $('#defaultCountdown').countdown('destroy'); 
        }, 
        function() { 
            $(this).text('Remove'); 
            $('#defaultCountdown').countdown({until: newYear}); 
        }
    );
	  
	//MILESTONE
    $('.timer').countTo();
	
	
	//MAGNIFIC POPUP LOAD CONTENT VIA AJAX
	$('.speaker-detail').magnificPopup({type: 'ajax'});
	// $('.register').magnificPopup({type: 'ajax'});	
 	
	//MAGNIFIC POPUP IMAGE
	$('.image-link').magnificPopup({type:'image'});	
	
	//OWLCAROUSEL SCHEDULE
	var timetable = $("#timetable");
  	var days = $("#days");

  	getEventSchedule();
 
  timetable.owlCarousel({
    singleItem : true,
    slideSpeed : 1000,
    navigation: false,
    pagination:false,
    afterAction : syncPosition,
    responsiveRefreshRate : 200,
  });
 
  days.owlCarousel({
   	items : 5,
   	itemsDesktop : [1000,5],
   	itemsDesktopSmall : [900,5],
   	itemsTablet : [600,5],
    itemsMobile : false,
    pagination:false,
    responsiveRefreshRate : 100,
    afterInit : function(el){
      el.find(".owl-item").eq(0).addClass("synced");
    }
  });
 
  function syncPosition(el){
    var current = this.currentItem;
    $("#days")
      .find(".owl-item")
      .removeClass("synced")
      .eq(current)
      .addClass("synced")
    if($("#days").data("owlCarousel") !== undefined){
      center(current)
    }
  }
 
  $("#days").on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).data("owlItem");
    dayNumber = $(this).data("owlItem");
    $('#timetable').height( $('#timetable .owl-item:eq(' + number + ')').height() );
    timetable.trigger("owl.goTo",number);
	$('.item .event').off().on('click', function() {
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			if(!mobileDevice) $('#timetable').height( $('#timetable .owl-item:eq(' + dayNumber + ')').height() );
			if(mobileDevice) $('#timetable').height( $('#timetable .owl-item:eq(' + number + ')').height() );
		} else {
			$('.item .event.active').removeClass('active');
			$(this).addClass('active');
			if(!mobileDevice) $('#timetable').height( $('#timetable .owl-item:eq(' + dayNumber + ')').height() );
			if(mobileDevice) $('#timetable').css('height', '+=600px' );
		}
	});
  });
 
  function center(number){
    var daysvisible = days.data("owlCarousel").owl.visibleItems;
    var num = number;
    var found = false;
    for(var i in daysvisible){
      if(num === daysvisible[i]){
        var found = true;
      }
    }
 
    if(found===false){
      if(num>daysvisible[daysvisible.length-1]){
        days.trigger("owl.goTo", num - daysvisible.length+2)
      }else{
        if(num - 1 === -1){
          num = 0;
        }
        days.trigger("owl.goTo", num);
      }
    } else if(num === daysvisible[daysvisible.length-1]){
      days.trigger("owl.goTo", daysvisible[1])
    } else if(num === daysvisible[0]){
      days.trigger("owl.goTo", num-1)
    }
    
  }

	//OWLCAROUSEL GALLERY
	var owl = $(".gallery");
 
	  owl.owlCarousel({
		  itemsCustom : [
			[0, 2],
			[450, 2],
			[600, 4],
			[700, 4],
			[1000, 4],
			[1200, 4],
			[1600, 4]
		  ],
		  navigation : true,
		  navigationText : ['<i class="fa fa-4x fa-chevron-circle-left"></i>','<i class="fa fa-4x  fa-chevron-circle-right"></i>'],
	  });

	  
	//OWLCAROUSEL TESTIMONIAL
	$("#quote").owlCarousel({
 
		pagination : false, 
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		navigation : true,
		navigationText : ['<i class="fa fa-3x fa-chevron-circle-left"></i>','<i class="fa fa-3x  fa-chevron-circle-right"></i>'],
	});
	
	//FIX HOVER EFFECT ON IOS DEVICES
	document.addEventListener("touchstart", function(){}, true);

});

$(window).load(function(){
	
	
	//PARALLAX BACKGROUND
	$(window).stellar({
		horizontalScrolling: false,
	});
    
	
    //PRELOADER
    //$('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	
	
	//HEADER ANIMATION
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

});

	// CONTACT FORM FUNCTION
	var contact_send = function(){
	
	'use strict';
	
	var name  = $("#name").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var type  = $("#type").val();
	
		 if ( name=="" ){ alert("name area is empty!"); $("#name").focus(); }
	else if ( email=="" ){ alert("email address area is empty!"); $("#email").focus(); }
	else if ( phone=="" ){ alert("phone number area is empty!"); $("#phone").focus(); }
	else if ( type=="" ){ alert("register type isn't selected!"); $("#type").focus(); }
	else {
		$.post("contact.send.php", { name:name, email:email, phone:phone, type:type }, function( result ){
			if ( result=="SUCCESS" ){
				alert("Your contact form is sent.");
				setTimeout(function(){
					$("#name").val("");
					$("#email").val("");
					$("#phone").val("");
					$("#type").val("");
				}, 3000);
			} else {
				alert("Your contact form isn't sent. Please check fields and try again.");
			}
		});
	}

};

	/* Newsletter Functions */
	var newsletter_send = function(){
	
		'use strict';
		
		var email 	= $("#newsletter_email").val();
		if ( email=="" ){ alert("Your email address is empty!"); $("#newsletter_email").focus(); }
		else {
			$.post("newsletter.send.php", { email:email }, function( result ){
				
				console.log( result );
				
				if ( result=="SUCCESS" ){
					alert("Thank you. Your email is added to our database.");
					setTimeout(function(){ $("#newsletter_email").val(""); }, 3000);
				}
				
				else if ( result=="EXIST" ){
					alert("Error. Your email address is already exist our database.");
					$("#newsletter_email").focus();
				}
				
				else {
					alert("Error. Your email isn't added to our database.");
					$("#newsletter_email").focus();
				}
				
			});
		}
	
	};

	var getEventSchedule = function() {

		$.ajax({
			url: 'http://default-environment-pvwnemptmw.elasticbeanstalk.com/events/detailed',
			type: 'GET',
			dataType: 'json',
			success: function(data) {
				parseEvents(data);
			}
		});

	};

	var parseEvents = function(data) {

		data.events.forEach(function(day) {
			parseTime(day);
		});

	};

	var parseTime = function(eventArray) {

		eventArray.forEach(function(event) {
		var dayContainer = $('#day' + event.day);

		var eventStr = '<div class="event"><div class="event-inner">'
            	+ '<div class="icon">'
                + '<i class="fa fa-2x fa-clock-o"></i>'
                + '<span class="time">'+ convertTime(event['start-time']) + ' - ' + convertTime(event['end-time']) + '</span></div><div class="description">';
			eventStr += '<h3>' + event.name + '</h3><p>' + event.description + '</p><p class="bold">' + event.venue + '</p>';

			eventStr += '<span class="show-more">^</span></div></div></div>';
			dayContainer.append(eventStr);
		});

		// Height fix
		$('#timetable').height( $('#timetable .owl-item:eq(0)').height() );

		$('.item .event').off().on('click', function() {
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				if(!mobileDevice) $('#timetable').height( $('#timetable .owl-item:eq(' + dayNumber + ')').height() );
				if(mobileDevice) $('#timetable').css( 'height', $('#timetable .owl-item:eq(' + number + ')').height() );
			} else {
				$('.item .event.active').removeClass('active');
				$(this).addClass('active');
				if(!mobileDevice) $('#timetable').height( $('#timetable .owl-item:eq(' + dayNumber + ')').height() );
				if(mobileDevice) $('#timetable').css('height', '+=600px' );
			}
		});

	};

	var convertTime = function(time) {
		var hour = time.split(':')[0],
			minutes = time.split(':')[1],
			suffix = '';

		if(hour > 11 && hour < 24) {
			suffix = 'PM';
		} else {
			suffix = 'AM';
		}

		if(hour > 12) hour -= 12;

		return hour + ':' + minutes + suffix;
	};
	

	//GOOGLE MAP
	// function init_map() {
 //    var myOptions = {
 //        zoom: 14,
 //        center: new google.maps.LatLng(40.801485408197856, -73.96745953467104), //change the coordinates
 //        mapTypeId: google.maps.MapTypeId.ROADMAP,
	// 	scrollwheel: false,
	// 	styles: [{featureType:'all',stylers:[{saturation:-100},{gamma:0.50}]}]
 //    };
 //    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
 //    marker = new google.maps.Marker({
 //        map: map,
 //        position: new google.maps.LatLng(40.801485408197856, -73.96745953467104) //change the coordinates
 //    });
 //    infowindow = new google.maps.InfoWindow({
 //        content: "<b>Evential 2014</b><br/>1571 Hidden Terrace<br/> New York"  //add your address
 //    });
 //    google.maps.event.addListener(marker, "click", function () {
 //        infowindow.open(map, marker);
 //    });
 //    infowindow.open(map, marker);
	// }
	// google.maps.event.addDomListener(window, 'load', init_map);
	

	