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

		enquire.register("screen and (min-width: 45em)", {

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