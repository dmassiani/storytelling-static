require.config({
	baseUrl: 'components',
	paths: {
		enquire: 'enquire/dist/enquire.min',
		snap: 'Snap.svg/dist/snap.svg-min',
		velocity: 'velocity/velocity.min',
		blast: 'blast-text/jquery.blast.min'
	}
});

require(['enquire', 'snap'], function(enquire, snap) {

		var screenContainer;
		var screenSettings = { w: 400, h: 250, color: '#fff' };

		var sidebarRight, sidebarLeft;
		var sidebarSettings = { 
			w: Math.round(screenSettings.w / 6), 
			h: screenSettings.h, 
			color: '#ddd', 
			padding: {
				top: 40,
				left: 5,
				right: 5
			} 
		};
		var sidebarLeftSettings = { 
			color: '#333'
		};

		var buttonA, buttonB, buttonC, buttonGroup;
		var buttonSize = { 
			w: sidebarSettings.w - (sidebarSettings.padding.left + sidebarSettings.padding.right), 
			h: 10, 
			color: '#ccc' 
		};

		// scene
		var s = snap("#svg");

		enquire.register("screen and (min-width: 45em)", {

			deferSetup : true,
			setup : function() {

				// le bord de l'écran
				screenContainer = s.rect(0, 0, 0, screenSettings.h);
				screenContainer.attr({ fill: screenSettings.color });
				
				// la sidebar de gauche
				sidebarLeft = s.rect( 0, 0, 0, screenSettings.h);
				sidebarLeft.attr({ fill: sidebarLeftSettings.color });	

				// la sidebar de droite
				sidebarRight = s.rect( (screenSettings.w - sidebarSettings.w), 0, sidebarSettings.w, 0);
				sidebarRight.attr({ fill: sidebarSettings.color });
				
				// le top du screen
				topScreen = s.rect(0, 0, 0, 10);
				topScreen.attr({ fill: sidebarLeftSettings.color });

				// les boutons
				buttonA = s.rect( 
					sidebarSettings.padding.left+(screenSettings.w - sidebarSettings.w), 
					sidebarSettings.padding.top + 0, 
					0, 
					buttonSize.h
				);
				buttonB = s.rect(
					sidebarSettings.padding.left+(screenSettings.w - sidebarSettings.w), 
					sidebarSettings.padding.top + buttonSize.h + (buttonSize.h/2), 
					0, 
					buttonSize.h
				);
				buttonC = s.rect(
					sidebarSettings.padding.left+(screenSettings.w - sidebarSettings.w), 
					sidebarSettings.padding.top + ( ( buttonSize.h + (buttonSize.h/2) ) * 2 ), 
					0, 
					buttonSize.h
				);

				buttonA.attr({ fill: buttonSize.color });
				buttonB.attr({ fill: buttonSize.color });
				buttonC.attr({ fill: buttonSize.color });

				buttonGroup = s.group( buttonA, buttonB, buttonC );



   

			},
			match : function() {
				console.log('match');
				screenContainer.animate({ width: screenSettings.w }, 140 );
				topScreen.animate({ width: screenSettings.w }, 100 );
				sidebarRight.animate({height: sidebarSettings.h }, 200, mina.easein);
				sidebarLeft.animate({width: sidebarSettings.w }, 200, mina.easein);
				buttonA.animate({width: buttonSize.w }, 200, mina.easeout);
				buttonB.animate({width: buttonSize.w }, 300, mina.easeout);
				buttonC.animate({width: buttonSize.w }, 400, mina.easeout);
			},
			unmatch : function() {
				// hide sidebar
				console.log('unmatch');
				screenContainer.animate({ width: 0 }, 140 );
				topScreen.animate({ width: 0 }, 100 );
				sidebarRight.animate({height: 0 }, 200, mina.easein);
				sidebarLeft.animate({width: 0 }, 200, mina.easein);
				buttonA.animate({width: 0 }, 200, mina.easeout);
				buttonB.animate({width: 0 }, 300, mina.easeout);
				buttonC.animate({width: 0 }, 400, mina.easeout);
			}  

		});

});