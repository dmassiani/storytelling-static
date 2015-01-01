require.config({
	baseUrl: '/components',
	paths: {
		enquire: 'enquire/dist/enquire.min',
		velocity: 'velocity/velocity.min'
	}
});

require(['enquire', 'velocity'], function(enquire, velocity) {

		  $('#js-navigation-menu').removeClass("show");

		  $('#js-mobile-menu').on('click', function(e) {
		    e.preventDefault();
		    $('#js-navigation-menu').slideToggle(function(){
		      if($('#js-navigation-menu').is(':hidden')) {
		        $('#js-navigation-menu').removeAttr('style');
		      }
		    });
		  });
		  
		$(".js-vertical-tab-content").hide();
		$(".js-vertical-tab-content:first").show();

		/* if in tab mode */

		$(".js-vertical-tab").click(function(event) {
		  event.preventDefault();

		  $(".js-vertical-tab-content").hide();
		  var activeTab = $(this).attr("rel");
		  $("#"+activeTab).show();

		  $(".js-vertical-tab").removeClass("is-active");
		  $(this).addClass("is-active");

		  $(".js-vertical-tab-accordion-heading").removeClass("is-active");
		  $(".js-vertical-tab-accordion-heading[rel^='"+activeTab+"']").addClass("is-active");
		});

		/* if in accordion mode */

		$(".js-vertical-tab-accordion-heading").click(function(event) {
		  event.preventDefault();

		  $(".js-vertical-tab-content").hide();
		  var accordion_activeTab = $(this).attr("rel");
		  $("#"+accordion_activeTab).show();

		  $(".js-vertical-tab-accordion-heading").removeClass("is-active");
		  $(this).addClass("is-active");

		  $(".js-vertical-tab").removeClass("is-active");
		  $(".js-vertical-tab[rel^='"+accordion_activeTab+"']").addClass("is-active");
		});

		enquire.register("screen and (min-width: 100em)", {

			deferSetup : true,
			setup : function() {

				console.log('setup desktop');

			},
			match : function() {

				console.log('match');

			},
			unmatch : function() {

				console.log('unmatch');

			}  

		});

});