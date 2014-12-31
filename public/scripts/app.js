require.config({
	baseUrl: 'components',
	paths: {
		enquire: 'enquire/dist/enquire.min',
		snap: 'Snap.svg/dist/snap.svg-min',
		velocity: 'velocity/velocity.min',
		velocityUI: 'velocity/velocity.ui.min'
	}
});

require(['enquire', 'snap', 'velocity', 'velocityUI'], function(enquire, snap, velocity, velocityUI) {

		var Screen;

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

				Screen = new Storytelling();
				console.log(Screen);

			},
			match : function() {

				console.log('match');
				Screen.runImac();

			},
			unmatch : function() {

				console.log('unmatch');

			}  

		});

});