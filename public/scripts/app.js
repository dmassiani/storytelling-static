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

		  $('#js-navigation-menu').removeClass("show");

		  $('#js-mobile-menu').on('click', function(e) {
		    e.preventDefault();
		    $('#js-navigation-menu').slideToggle(function(){
		      if($('#js-navigation-menu').is(':hidden')) {
		        $('#js-navigation-menu').removeAttr('style');
		      }
		    });
		  });

		enquire.register("screen and (min-width: 100em)", {

			deferSetup : true,
			setup : function() {

				Screen = new Storytelling();
				console.log('setup desktop');

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