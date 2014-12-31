// Define a class like this
function Storytelling( svg, landing ){

		// Add object properties like this

		this.accelerator = 2;
		// scene
		this.s = svg;
		// landing page
		this.l = landing;
		
		this.Settings = {
			w: 400,
			h: 250,
			bg: '#fff',
			padding: 10
		};
		this.Settings.Landing  = {
			w: 400,
			h: 500,
			bg: '#fff'
		};
		this.Settings.Sidebar = {
			w: Math.round( this.Settings.w / 6 ),
			h: this.Settings.h, 
			bg: {
				right: '#ddd',
				left: '#333'
			},
			padding: {
				top: 40,
				left: this.Settings.padding,
				right: this.Settings.padding
			},
		};

		this.animText = function( element ) {
	        Snap.animate(0,1, function( value ) {
	                element.attr({ opacity: value });
	        }, 20 );
		};

		this.tap = function( id ){

			var element = $('#' + id );

			x = element.attr('x');
			y = element.attr('y');

			var tapr = this.s.circle( x, y, 0 ).attr({ fill: '#5AC0FF', id: "tap" });

			jQuery('#tap').velocity({ r: 50, opacity: 0 }, { duration: 600, easing: "easeout", complete: function(){
				tapr.remove();
			} } );

		}


}

Storytelling.prototype.buttons = function(){

	var t = this;

	this.Settings.Sidebar.Button = {
		w: this.Settings.Sidebar.w - (this.Settings.Sidebar.padding.left + this.Settings.Sidebar.padding.right), 
		h: this.Settings.padding, 
		bg: '#ccc' ,
		publish: '#5AC0FF'
	};

	t.open = function(){
		// les boutons
		t.buttonA = t.s.rect( 
			t.Settings.Sidebar.padding.left + (t.Settings.w - t.Settings.Sidebar.w), 
			t.Settings.Sidebar.padding.top, 
			0, 
			t.Settings.Sidebar.Button.h
		);
		t.buttonB = t.s.rect(
			t.Settings.Sidebar.padding.left + ( t.Settings.w - t.Settings.Sidebar.w), 
			t.Settings.Sidebar.padding.top + t.Settings.Sidebar.Button.h + (t.Settings.Sidebar.Button.h/2), 
			0, 
			t.Settings.Sidebar.Button.h
		);
		t.buttonC = t.s.rect(
			t.Settings.Sidebar.padding.left + ( t.Settings.w - t.Settings.Sidebar.w), 
			t.Settings.Sidebar.padding.top + ( ( t.Settings.Sidebar.Button.h + (t.Settings.Sidebar.Button.h/2) ) * 2 ), 
			0, 
			t.Settings.Sidebar.Button.h
		);

		t.buttonA.attr({ fill: t.Settings.Sidebar.Button.bg, id: "button-a" });
		t.buttonB.attr({ fill: t.Settings.Sidebar.Button.bg, id: "button-b" });
		t.buttonC.attr({ fill: t.Settings.Sidebar.Button.bg, id: "button-c" });

		jQuery('#button-a').velocity({width: t.Settings.Sidebar.Button.w }, { duration: 140 * t.accelerator, delay: 100 * t.accelerator }, "swing");
		jQuery('#button-b').velocity({width: t.Settings.Sidebar.Button.w }, { duration: 140 * t.accelerator, delay: 200 * t.accelerator }, "swing");
		jQuery('#button-c').velocity({width: t.Settings.Sidebar.Button.w }, { duration: 140 * t.accelerator, delay: 300 * t.accelerator }, "swing");

		t.buttonGroup = t.s.group( t.buttonA, t.buttonB, t.buttonC );

		// publish button
		t.publish = t.s.rect(
			t.Settings.Sidebar.padding.left + ( t.Settings.w - t.Settings.Sidebar.w), 
			t.Settings.padding * 2, 
			0, 
			t.Settings.Sidebar.Button.h
		).attr({ fill: t.Settings.Sidebar.Button.publish, id: "publish" });
		jQuery('#publish').velocity({width: t.Settings.Sidebar.Button.w }, { duration: 140 * t.accelerator, delay: 400 * t.accelerator }, "swing");

	}

	t.close = function(){

	}
}

// Add methods like this.  All Person objects will be able to invoke this
Storytelling.prototype.constructScreen = function(){
		
		var t = this;

		// Landing page

	
		// le titre
		t.title = t.s.rect(
			t.Settings.Sidebar.w + t.Settings.padding,
			t.Settings.padding * 2,
			0,
			t.Settings.padding
		).attr({ fill: t.Settings.Sidebar.bg.right, id: "title" });

		// le content
		t.content = t.s.rect(
			t.Settings.Sidebar.w + t.Settings.padding,
			t.Settings.padding * 4,
			0,
			( t.Settings.h / 2 ) - ( t.Settings.padding * 4 )
		).attr({ fill: t.Settings.Sidebar.bg.right, id: "content" });


		// t.editorGroup1 = t.s.group( t.title, t.content );

		// t.buttons.open();
		t.buttons();

		// titre
		t.titleText = "Lorem ipsum";

        t.titleArray = t.titleText.split('');
        t.titleText = t.s.text(82, 27, t.titleArray).attr({ fontSize: 8, fill: '#555' });
		t.titleGroup = t.titleText.selectAll("tspan").attr({
			opacity: 0
		});

		// content
		t.contentText = t.s.text(200, 120, [
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
			,"Aliquam elit justo, iaculis ac eros a condimentum" 
			,"blandit libero."
		])
		.attr({fill:"#555", fontSize:"8px"})
		.selectAll("tspan").forEach(function(tspan, i){
			tspan.attr({x:82, y:8*(i+1) + 45, opacity: 0});
		});
		// t.editorGroup2 = t.s.group( t.titleGroup, t.contentText );

		t.addHero = function(){

			t.heroBG = t.l.rect( 0, 15, 0, 120 )
			.attr({ fill: '#5AC0FF', id: "heroBG" });

			jQuery('#heroBG').velocity({ width: t.Settings.Landing.w }, { duration: 200 * t.accelerator, easing: [500, 20]  });

			t.heroTitle = "LOREM IPSUM";

	        t.heroArray = t.heroTitle.split('');
	        t.heroTitle = t.l.text(20, 47, t.heroArray).attr({ fontSize: 14, fill: '#fff' });
			t.heroGroup = t.heroTitle.selectAll("tspan").attr({
			        opacity: 0
			});
			for( var i=0; i < t.heroGroup.length; i++ ) {
			    setTimeout( t.animText.bind(null, t.heroGroup[i]) , ( i * 20 ) * t.accelerator );
			}
			t.heroText = t.l.text(20, 120, [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				,"Aliquam elit justo, iaculis ac eros a condimentum" 
				,"blandit libero."
			])
			.attr({fill:"#fff", fontSize:"10px"})
			.selectAll("tspan").forEach(function(tspan, i){
				tspan.attr({x:20, y:10*(i+1) + 70, opacity: 0});
			});
			for( var i=0; i < t.heroText.length; i++ ) {
			    setTimeout( t.animText.bind(null, t.heroText[i]) , ( i * 20 ) * t.accelerator );
			}
		}

		t.addSectionA = function(){

			// ajout d'une section dans l'admin
				// ajout des input

				// le titre
				t.storyTitle = t.s.rect(
					t.Settings.Sidebar.w + t.Settings.padding,
					140,
					0,
					t.Settings.padding
				).attr({ fill: t.Settings.Sidebar.bg.right, id: "story-title" });

				jQuery('#story-title').velocity({ width: (t.Settings.w - ( t.Settings.Sidebar.w * 2 ) - ( t.Settings.padding * 2 )) }, { duration: 140 * t.accelerator, delay: 300 * t.accelerator } );
				
				// le content
				t.storyContent = t.s.rect(
					t.Settings.Sidebar.w + t.Settings.padding,
					160,
					0,
					( t.Settings.h / 2 ) - ( t.Settings.padding * 3 )
				).attr({ fill: t.Settings.Sidebar.bg.right, id: "story-content" });

				jQuery('#story-content').velocity({ width: (t.Settings.w - ( t.Settings.Sidebar.w * 2 ) - ( t.Settings.padding * 2 )) }, { duration: 140 * t.accelerator, delay: 300 * t.accelerator, complete:function(){

					// on ecrit
					// titre
					t.storytitleArray = "Lorem ipsum".split('');

			        t.storytitleText = t.s.text(82, 147, t.storytitleArray).attr({ fontSize: 8, fill: '#555' });
					t.storytitleGroup = t.storytitleText.selectAll("tspan").attr({
					        opacity: 0
					});
					for( var i=0; i < t.storytitleGroup.length; i++ ) {
					    setTimeout( t.animText.bind(null, t.storytitleGroup[i]) , ( i * 20 ) * t.accelerator );
					}
					// content
					t.storycontentText = t.s.text(200, 167, [
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
						,"Aliquam elit justo, iaculis ac eros a condimentum" 
						,"blandit libero."
					])
					.attr({fill:"#555", fontSize:"8px"})
					.selectAll("tspan").forEach(function(tspan, i){
						tspan.attr({x:82, y:8*(i+1) + 165, opacity: 0});
					});
					setTimeout(function(){

						for( var i=0; i < t.storycontentText.length; i++ ) {
						    setTimeout( t.animText.bind(null, t.storycontentText[i]) , ( i * 20 ) * t.accelerator );
						}

					}, ( t.storytitleGroup.length * 20 ) * t.accelerator );
					// on publish
				// ajout d'une section dans la landing page

				} } );


		}

		t.addSectionB = function(){

		}

// **********************************************************************
//
// 		Rewrite storyboard
//
// **********************************************************************

	// ===============================
	// Ajout de la landing page
	// ===============================
	t.addLandingPage = function(){

		t.landing = t.l.rect( 0, 500, t.Settings.Landing.w, t.Settings.Landing.h )
		.attr({ fill: t.Settings.Landing.bg, id: "landing" });
		jQuery('#landing').velocity({ y: 0 }, { duration: 1000 * t.accelerator, delay: 600 * t.accelerator, easing: [500, 20] });

		t.headerLanding = t.l.rect( 0, 0, 0, 15 )
		.attr({ fill: t.Settings.Sidebar.bg.left, id: "landingHeader" });
		jQuery('#landingHeader').velocity({ width: t.Settings.Landing.w }, { duration: 200 * t.accelerator, delay: 600 * t.accelerator, easing: [500, 20] });

	}

	// ===============================
	// Ajout de l'écran
	// ===============================
	t.addDesktop = function(){
		
		// Desktop
		t.fx = t.s.rect( 0, 0, 0, t.Settings.h )
		.attr({ fill: t.Settings.Sidebar.left, id: "fx" });
		jQuery('#fx').velocity({ width: t.Settings.Landing.w }, { duration: 140 * t.accelerator, delay: 100 * t.accelerator, easing: [500, 20] });


		t.screenContainer = t.s.rect( 0, 0, 0, t.Settings.h )
		.attr({ fill: t.Settings.bg, id: "screen" });	
		jQuery('#screen').velocity({ width: t.Settings.w }, { duration: 140 * t.accelerator, delay: 300 * t.accelerator } );

		// la sidebar de gauche
		t.sidebarLeft = t.s.rect( 0, 0, 0, t.Settings.h)
		.attr({ fill: t.Settings.Sidebar.bg.left, id: "sidebar-left" });	
		jQuery('#sidebar-left').velocity({ width: t.Settings.Sidebar.w }, { duration: 140 * t.accelerator, delay: 600 * t.accelerator, easing: "swing", complete: function(){
	        
	        setTimeout( function(){

				for( var i=0; i < t.titleGroup.length; i++ ) {
				    setTimeout( t.animText.bind(null, t.titleGroup[i]) , ( i * 20 ) * t.accelerator );
				}

	        }, 500 * t.accelerator);
	        
	        setTimeout( function(){

				for( var i=0; i < t.contentText.length; i++ ) {
				    setTimeout( t.animText.bind(null, t.contentText[i]) , ( i * 20 ) * t.accelerator );
				}

	        }, 1000 * t.accelerator);

	        setTimeout( function(){

				setTimeout( function(){

					t.tap( 'publish' );
					setTimeout(function(){
						t.addHero();

						setTimeout(function(){

							t.tap( 'button-a' );
							t.addSectionA();


							setTimeout(function(){

								t.tap( 'publish' );
								t.addSectionB();

							},1000 * t.accelerator);

						},400 * t.accelerator);


					}, 400 * t.accelerator);

				}, t.contentText.length * ( 20 * t.accelerator ) );

	        }, 1500 * t.accelerator);

		} });

		// la sidebar de droite
		t.sidebarRight = t.s.rect( (t.Settings.w - t.Settings.Sidebar.w), 0, t.Settings.Sidebar.w, 0)
		.attr({ fill: t.Settings.Sidebar.bg.right, id: "sidebar-right" });
		jQuery('#sidebar-right').velocity({height: t.Settings.Sidebar.h }, { duration: 140 * t.accelerator, delay: 300 * t.accelerator }, "swing");
		
		// le top du screen
		t.topScreen = t.s.rect( 0, 0, 0, t.Settings.padding )
		.attr({ fill: t.Settings.Sidebar.bg.left, id: "header" });
		jQuery('#header').velocity({ width: t.Settings.w }, { duration: 140 * t.accelerator, delay: 600 * t.accelerator } );


	}

}

Storytelling.prototype.open = function(){

	var t = this;

	t.addLandingPage();
	t.addDesktop();

	// t.writeFirstContent();
	// t.publishFirstContent();

	// t.writeSecondContent();
	// t.publishSecondContent();

	jQuery('#title').velocity({ width: (t.Settings.w - ( t.Settings.Sidebar.w * 2 ) - ( t.Settings.padding * 2 )) }, { duration: 140 * t.accelerator, delay: 300 * t.accelerator } );
	jQuery('#content').velocity({ width: (t.Settings.w - ( t.Settings.Sidebar.w * 2 ) - ( t.Settings.padding * 2 )) }, { duration: 200 * t.accelerator, delay: 400 * t.accelerator } );


	


}

Storytelling.prototype.close = function(){

	jQuery('#screen').velocity({ width: 0 }, 140 );
	jQuery('#title').velocity({ width: 0 }, 100 );
	jQuery('#content').velocity({ width: 0 }, 100 );
	jQuery('#header').velocity({ width: 0 }, 100 );
	jQuery('#sidebar-right').velocity({height: 0 }, 200, "swing");
	jQuery('#sidebar-left').velocity({width: 0 }, 200, "swing");
	jQuery('#button-a').velocity({width: 0 }, 200, "swing");
	jQuery('#button-b').velocity({width: 0 }, 300, "swing");
	jQuery('#button-c').velocity({width: 0 }, 400, "swing");

}
