(function($, document, window){

	$(document).ready(function(){

		$("[data-background]").each(function(){
			var retina = window.devicePixelRatio > 1;
			var bg = $(this).data("background");
			if( retina ){
				var retinabg = bg.replace(".jpg","@2x.jpg");
				$(this).css("background-image","url("+retinabg+")");	
			} else{
				$(this).css("background-image","url("+bg+")");
			}
			
		});

		$("[data-bg-color]").each(function(){
			var bg = $(this).data("bg-color");
			$(this).css("background-color",bg);
		});

		$(".slider").flexslider({
			directionNav: false,
			controlNav: true,
		});

		$(".quote-slider").flexslider({
			directionNav: true,
			controlNav: false,
			prevText: "<i class='fa fa-caret-left'></i>",
			nextText: "<i class='fa fa-caret-right'></i>",
		});

		var eventCarousel = $(".event-carousel");
		eventCarousel.owlCarousel({
 
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			rewindNav: false,
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]

		});
		// Custom Navigation Events
		$("#event-next").click(function(e){
			e.preventDefault();
			eventCarousel.trigger('owl.next');
		});
		$("#event-prev").click(function(e){
			e.preventDefault();
			eventCarousel.trigger('owl.prev');
		});

		var $container = $('.filterable-items');

		$container.imagesLoaded(function(){
		    $container.isotope({
		        filter: '.2023',
		        layoutMode: 'fitRows',
		        animationOptions: {
		            duration: 750,
		            easing: 'linear',
		            queue: false
		        }
		    });
		});
		$('.filterable-nav a').click(function(e){
	    	e.preventDefault();
	        $('.filterable-nav .current').removeClass('current');
	        $(this).addClass('current');

	        var selector = $(this).attr('data-filter');
	        $container.isotope({
	            filter: selector,
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	         });
	         return false;
	    });
	    $('.mobile-filter').change(function(){

	        var selector = $(this).val();
	        $container.isotope({
	            filter: selector,
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	         });
	         return false;
	    });

	    initLightbox({
	    	selector : '.filterable-item a',
	    	overlay: true,
	    	closeButton: true,
	    	arrow: true
	    });

	    $(".mobile-menu").append($(".main-navigation .menu").clone());
	    $(".toggle-menu").click(function(){
	    	$(".mobile-menu").slideToggle();
	    });

	    if( $(".map").length ){
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14,
						scrollwheel: false
					}  
				},
				marker:{
					address: "40 Sibley St, Detroit",
				}
			},
			"autofit" );
	    }

	});

	$(window).ready(function(){

	});
	
	if (window.location.href.includes('/band/contact')) {
	
		const contactForm = document.getElementById("contactForm");
		
		contactForm.addEventListener("submit", async (event) => {
		event.preventDefault();

		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const body = document.getElementById("body").value;

		try {
			const response = await fetch("/band/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, body }),
			});

			const data = await response.json();

			if (data.success) {
				alert("Poruka poslana!");

				setTimeout(() => {
					window.location.href = "/band/contact";
			}, 500);
			} else {
				alert("Message Could not be Sent");
			}
		} catch (error) {
			console.log(error);
			alert("An error occurred. Please try again.");
		}
		});
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('shuw');
			} else {
				entry.target.classList.remove('shuw');
			}
		});
	});
	
	const hiddenElements = document.querySelectorAll('.hiddun');
	hiddenElements.forEach((el) => observer.observe(el));

})(jQuery, document, window);