var secsTotal = 0;

function _timer( secs, func ){ 
	secsTotal+= secs;
	window.setTimeout( func, secsTotal );
}
function resetTimer(){
	secsTotal = 0;
}

function Storytelling(){

		// snap = snap;
		this.scene = Snap('#browser'),
		this.page = Snap('#page'),
		this.imac = Snap('#imac'),
		this.imacbottom = Snap('#imacbottom');

		this.setSVG = function( svg ){

			switch ( svg ) {
			  case "scene":
			    t.svg = t.scene;
			    break;
			  case "page":
			    t.svg = t.page;
			    break;
			  case "imac":
			    t.svg = t.imac;
			    break;
			  case "imacbottom":
			    t.svg = t.imacbottom;
			    break;
			  default:
			    t.svg = t.scene;
			}

		}

		this.tap = function( id ){

			var element = jQuery('#' + id );
			t.setSVG('browser');

			x = element.attr('x');
			y = element.attr('y');


			var tapr = t.svg.circle( x, y, 0 ).attr({ fill: '#5AC0FF', id: "tap" });

			jQuery('#tap').velocity({ r: 50, opacity: 0 }, { duration: 600, easing: "easeout", complete: function(){
				tapr.remove();
			} } );

		}

		this.addSceneImac = function(){
			// l'imac
			t.setSVG('imac');

				t.Imac = new Rect( 'imac-desktop' );
				t.Imac.attr({
					width: t.settings.imac.w,
					height: t.settings.imac.h
				});
				t.Imac.attr({ fill:'#1BC5E4', stroke: t.settings.screen.bg, 'stroke-width': 15, 'stroke-linejoin': 'round' });
				t.Imac.positionne({ x: 15, y: 15 });
				
				t.bottomScreen = new Rect( 'imac-desktop-bottom', 'imac' );
				t.bottomScreen.fill( t.settings.screen.bg );
				t.bottomScreen.positionne({
					x: 15,
					y: 290,
					height: 30
				});

			t.setSVG('imacbottom');

				t.Footer = new Rect( 'footer' );
				t.Footer.attr({
					fill: '#8E8E8E',
					width: 90,
					height: 0,
					x: 199,
					y: 50
				});

				t.FootFooter = new Rect( 'foot-footer' );
				t.FootFooter.attr({
					fill: '#e1e1e1',
					height: 6,
					x: 163,
					y: 100
				});

				t.Imacbottom = new Rect( 'imac-bottom' );
				t.Imacbottom.attr({ 
					height: '80px',
					fill: '#e1e1e1', 
					stroke: '#e1e1e1', 
					'stroke-width': 15, 
					'stroke-linejoin': 'round'
				});
				t.Imacbottom.positionne({
					x: 15, y: -30
				});

				t.Pomme = new Circle( 'pomme' );
				t.Pomme.fill( t.settings.screen.bg );
				t.Pomme.positionne({
					cx: 242, cy: 30, r: 0
				});
		}

		this.accelerator = 2;


		this.padding = 20;
		this.settings = {};

		this.settings.imac = {
			w: 460,
			h: 300,
			bg: '#e1e1e1'
		}
		this.settings.browser = {
			h: 16
		}
		this.settings.screen = { 
			w: 400,
			h: 250,
			bg: '#383838'
		}
		this.settings.landing = { 
			w: 400,
			h: 500
		}
		this.settings.sidebar = { 
			w: Math.round( this.settings.screen.w / 6 ),
			h: this.settings.screen.h,
			x: this.settings.screen.w - ( Math.round( this.settings.screen.w / 6 ) )
		}

		this.settings.button = { 
			w: this.settings.sidebar.w - ( this.padding * 2 ),
			h: 30
		}
		this.settings.publish = { 
			w: this.settings.button.w,
			h: this.settings.button.h
		}

		var t = this;

		var Rect = function( id ){ 

				this.id = id;
				this.settings = { x: 0, y: 0, w: 0, h: 0 };

				var that = this;
				var settings = this.settings;
				var rect = t.svg.rect( this.settings.x, this.settings.y, this.settings.w, this.settings.h );
				rect.attr({ id: id });

				this.attr = function( attribut ){
					jQuery( '#' + this.id ).attr( attribut );
				};
				this.fill = function( color ){
					jQuery( '#' + this.id ).attr({ fill: color });
				}
				this.positionne = function( position ){
					jQuery( '#' + this.id ).attr( position );
				}
				this.anime = function( duree, animate ){
					jQuery( '#' + this.id ).velocity( animate , { duration: duree * t.accelerator, easing: "easeOutQuint" } );	
				}
				this.show = function(){ 
					jQuery( '#' + this.id ).velocity( { width: 200 }, { duration: 140 * t.accelerator, easing: "easeOutQuint" } );	
				}
				this.hide = function( options ){
					jQuery( '#' + this.id ).velocity( options );	
				}

		}
		var Circle = function( id ){ 


				this.id = id;
				this.settings = { x: 0, y: 0, r: 0 };

				var that = this;
				var settings = this.settings;
				var circleMop = t.svg.circle( this.settings.x, this.settings.y, this.settings.r );
				circleMop.attr({ id: id });

				this.attr = function( attribut ){
					jQuery( '#' + this.id ).attr( attribut );
				};
				this.fill = function( color ){
					jQuery( '#' + this.id ).attr({ fill: color });
				}
				this.positionne = function( position ){
					jQuery( '#' + this.id ).attr( position );
				}
				this.anime = function( duree, animate ){
					jQuery( '#' + this.id ).velocity( animate , { duration: duree * t.accelerator, easing: "easeOutQuint" } );	
				}
				this.show = function(){ 
					jQuery( '#' + this.id ).velocity( { width: 200 }, { duration: 140 * t.accelerator, easing: "easeOutQuint" } );	
				}
				this.hide = function( options ){
					jQuery( '#' + this.id ).velocity( options );	
				}

		}

		var Text = function( id, text ){ 


				this.id = id;
				this.settings = { x: 0, y: 0, r: 0 };

				var contentText = t.svg.text(this.settings.x, this.settings.y, [ text ]);

				contentText.attr({ id: id });

				this.attr = function( attribut ){
					jQuery( '#' + this.id ).attr( attribut );
				};
				this.fill = function( color ){
					jQuery( '#' + this.id ).attr({ fill: color });
				}
				this.positionne = function( position ){
					jQuery( '#' + this.id ).attr( position );
				}
				this.anime = function( duree, animate ){
					jQuery( '#' + this.id ).velocity( animate , { duration: duree * t.accelerator, easing: "easeOutQuint" } );	
				}
				this.show = function(){ 
					jQuery( '#' + this.id ).velocity( { width: 200 }, { duration: 140 * t.accelerator, easing: "easeOutQuint" } );	
				}
				this.hide = function( options ){
					jQuery( '#' + this.id ).velocity( options );	
				}

		}

		var Image = function( id ){ 


				this.id = id;
				this.settings = { src: 'images/sky.jpg', x: 0, y: 0, width: 300, height:120 };

				var contentText = t.svg.image( this.settings );

				contentText.attr({ id: id });

				this.attr = function( attribut ){
					jQuery( '#' + this.id ).attr( attribut );
				};
				this.fill = function( color ){
					jQuery( '#' + this.id ).attr({ fill: color });
				}
				this.positionne = function( position ){
					jQuery( '#' + this.id ).attr( position );
				}
				this.anime = function( duree, animate ){
					jQuery( '#' + this.id ).velocity( animate , { duration: duree * t.accelerator, easing: "easeOutQuint" } );	
				}
				this.show = function(){ 
					jQuery( '#' + this.id ).velocity( { width: 200 }, { duration: 140 * t.accelerator, easing: "easeOutQuint" } );	
				}
				this.hide = function( options ){
					jQuery( '#' + this.id ).velocity( options );	
				}

		}

		t.addSceneImac();


		t.setSVG('scene');


			t.Screen = new Rect( 'screen' );
			t.Screen.fill( '#fff' );
			t.Screen.positionne({
				y: t.settings.browser.h , height: t.settings.screen.h
			});

			// le title et le content
			t.Title = new Rect( 'title' );
			t.Title.fill( '#ccc' );
			t.Title.attr({
				x: 100,
				width: 200
			});

			t.Content = new Rect( 'content' );
			t.Content.fill( '#ccc' );
			t.Content.attr({
				x: 100,
				width: 140,
			});

			t.TitleTextBrowser = new Text( 'title-text-browser' , [
				"Lorem ipsum dolor sit amet."
			]);
			t.TitleTextBrowser.attr({fill:"#333", opacity: 0 });

			t.ContentTextBrowser = new Text( 'content-text-browser' , [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				,"Aliquam elit justo, iaculis ac eros a condimentum" 
				,"blandit libero."
			]);
			t.ContentTextBrowser.attr({fill:"#333", opacity: 0 });

			// le title et le content de la section A
			t.TitleSA = new Rect( 'title-sa' );
			t.TitleSA.fill( '#ccc' );
			t.TitleSA.attr({
				x: 100,
				width: 200
			});

			t.ContentSA = new Rect( 'content-sa' );
			t.ContentSA.fill( '#ccc' );
			t.ContentSA.attr({
				x: 100,
				width: 140,
			});

			t.ContentSA2 = new Rect( 'content-sa2' );
			t.ContentSA2.fill( '#ccc' );
			t.ContentSA2.attr({
				x: 100,
				width: 140,
			});

			t.TitleTextBrowserSA = new Text( 'title-text-browserSA' , [
				"Lorem ipsum dolor sit amet."
			]);
			t.TitleTextBrowserSA.attr({fill:"#333", opacity: 0 });

			t.ContentTextBrowserSA1 = new Text( 'content-text-browserSA1' , [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				,"Aliquam elit justo, iaculis ac eros a condimentum" 
				,"blandit libero."
			]);
			t.ContentTextBrowserSA1.attr({fill:"#333", opacity: 0 });

			t.ContentTextBrowserSA2 = new Text( 'content-text-browserSA2' , [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				,"Aliquam elit justo, iaculis ac eros a condimentum" 
				,"blandit libero."
			]);
			t.ContentTextBrowserSA2.attr({fill:"#333", opacity: 0 });

			// le title et le content de la section 3 // titre image
			t.TitleBrowserSA2 = new Rect( 'title-browser-sa2' );
			t.TitleBrowserSA2.attr({
				fill: '#ccc',
				x: 100,
				width: 200
			});

			t.ContentBrowserSA2 = new Rect( 'content-browser-sa2' );
			t.ContentBrowserSA2.attr({
				fill: '#eee',
				x: 100,
				width: 140,
			});

			t.TitleTextBrowserSA2 = new Text( 'title-text-browserSA2' , [
				"Lorem ipsum dolor sit amet."
			]);
			t.TitleTextBrowserSA2.attr({fill:"#333", opacity: 0 });

			t.ScreenBackground = new Rect( 'screen-background' );
			t.ScreenBackground.fill( '#fff' );
			t.ScreenBackground.positionne({
				height: 20
			});

			// open close reduce

			t.Close = new Circle( 'close' );
			t.Close.fill( '#F17164' );
			t.Close.positionne({
				cx: 8, cy: 8, r: 2
			});

			t.Reduce = new Circle( 'reduce' );
			t.Reduce.fill( '#FFD73B' );
			t.Reduce.positionne({
				cx: 16, cy: 8, r: 2
			});

			t.Full = new Circle( 'full' );
			t.Full.fill( '#5DBF87' );
			t.Full.positionne({
				cx: 24, cy: 8, r: 2
			});


			// les sidebars
			t.SidebarLeft = new Rect( 'sidebar-left' );
			t.SidebarLeft.fill( '#ddd' );
			t.SidebarLeft.positionne({
				x: t.settings.sidebar.x,
				y: t.settings.browser.h,
				width: t.settings.sidebar.w
			});

			t.SidebarRight = new Rect( 'sidebar-right' );
			t.SidebarRight.fill( '#333' );
			t.SidebarRight.positionne({
				y: t.settings.browser.h,
				width: t.settings.sidebar.w
			});

			// le header
			t.Header = new Rect( 'header' );
			t.Header.fill( '#333' );
			t.Header.positionne({
				y: t.settings.browser.h,
				height: 15
			});


			t.Publish = new Rect( 'publish' );
			t.Publish.fill('#298FFF');
			t.Publish.positionne({ 
				x: t.settings.sidebar.x + t.padding, 
				height: t.settings.button.h
			});

			t.buttonA = new Rect( 'button-a' );
			t.buttonA.fill('#ccc');
			t.buttonA.positionne({ 
				x: t.settings.sidebar.x + t.padding, height: t.settings.button.h
			});
			
			t.buttonB = new Rect( 'button-b' );
			t.buttonB.fill('#ccc');
			t.buttonB.positionne({
				x: t.settings.sidebar.x + t.padding, height: t.settings.button.h 
			});

			t.buttonC = new Rect( 'button-c' );
			t.buttonC.fill('#ccc');
			t.buttonC.positionne({ 
				x: t.settings.sidebar.x + t.padding, height: t.settings.button.h 
			});

		t.setSVG('page');

			// le title et le content
			t.Page = new Rect( 'landing-page' );
			t.Page.fill( '#fff' );
			t.Page.attr({
				y: 600,
				width: 340
			});

			t.BrowserLanding = new Rect( 'browser-landing' );
			t.BrowserLanding.fill( '#fff' );
			t.BrowserLanding.attr({
				height: 20
			});

			t.HeaderLanding = new Rect( 'header-landing' );
			t.HeaderLanding.fill( '#333' );
			t.HeaderLanding.attr({
				y: 20,
				height: 15
			});

			// close reduce
			t.CloseLanding = new Circle( 'close-landing' );
			t.CloseLanding.fill( '#F17164' );
			t.CloseLanding.positionne({
				cx: 8, cy: 10, r: 0
			});

			t.ReduceLanding = new Circle( 'reduce-landing' );
			t.ReduceLanding.fill( '#FFD73B' );
			t.ReduceLanding.positionne({
				cx: 16, cy: 10, r: 0
			});

			t.FullLanding = new Circle( 'full-landing' );
			t.FullLanding.fill( '#5DBF87' );
			t.FullLanding.positionne({
				cx: 24, cy: 10, r: 0
			});

			// first section
			t.SectionOne = new Rect( 'section-one' );
			t.SectionOne.fill( '#1BC5E4' );
			t.SectionOne.positionne({
				y: 35, height: 120, width: 0
			});

			t.ContentText = new Text( 'content-text' , [
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit."
				,"Aliquam elit justo, iaculis ac eros a condimentum" 
				,"blandit libero."
			]);
			t.ContentText.attr({fill:"#fff", opacity: 0 });

			t.TitleText = new Text( 'title-text' , [
				"Lorem ipsum dolor sit amet."
			]);
			t.TitleText.attr({fill:"#fff", opacity: 0 });

			// seconde section
			t.TitleTextSS = new Text( 'title-text-ss' , [
				"Lorem ipsum dolor sit amet."
			]);
			t.TitleTextSS.attr({fill:"#333", opacity: 0 });

			t.ContentTextSS1 = new Text( 'content-text-ss1' , [
				"Lorem ipsum dolor sit amet,"
				," consectetur adipiscing elit."
				,"Aliquam elit justo, iaculis"
				," ac eros a condimentum" 
				,"blandit libero."
			]);
			t.ContentTextSS1.attr({fill:"#333", opacity: 0 });

			t.ContentTextSS2 = new Text( 'content-text-ss2' , [
				"Lorem ipsum dolor sit amet,"
				," consectetur adipiscing elit."
				,"Aliquam elit justo, iaculis"
				," ac eros a condimentum" 
				,"blandit libero."
			]);
			t.ContentTextSS2.attr({fill:"#333", opacity: 0 });

			// third section
			t.SectionThree = new Image( 'section-three' );
			t.SectionThree.positionne({
				y: 300
			});

			t.TitleTextTS = new Text( 'title-text-ts' , [
				"Lorem ipsum dolor sit amet."
			]);
			t.TitleTextTS.attr({fill:"#fff", opacity: 0 });
}


Storytelling.prototype.runImac = function(){
	
		var t = this;
		resetTimer();

		_timer( 0, function(){		
			t.Imac.anime( 80, {
				width: t.settings.imac.w
			});
				t.Footer.anime(140,{
					height: 50
				});

				t.FootFooter.anime(140,{
					width: 160
				});

				t.bottomScreen.anime( 140, {
					width: t.settings.imac.w
				});

				t.Imacbottom.anime(140,{
					width: t.settings.imac.w
				});

				t.Pomme.anime(140,{
					r: 6
				});
		});

		_timer( 80, function(){		
			t.ScreenBackground.anime( 80, {
				width: t.settings.screen.w
			});
		});

		_timer( 100, function(){		
			t.Screen.anime( 80, {
				width: t.settings.screen.w
			});
		});

		_timer( 100, function(){		
			t.Header.anime( 100, {
				width: t.settings.screen.w
			});
		});

		_timer( 100, function(){		
			t.SidebarLeft.anime( 100, {
				height: t.settings.sidebar.h
			});
		});
		
		_timer( 100, function(){		
			t.SidebarRight.anime( 100, {
				height: t.settings.sidebar.h
			});
			t.Publish.anime( 100, {
				width: 46,
				height: 12,
				x: 343,
				y: 43
			});
		});

		_timer( 100, function(){
			t.buttonA.anime( 80, {
				width: 46,
				height: 12,
				x: 343,
				y: 63
			});
		});

		_timer( 100, function(){		
			t.buttonB.anime( 80, {
				width: 46,
				height: 12,
				x: 343,
				y: 78
			});
		});

		_timer( 100, function(){		
			t.buttonC.anime( 80, {
				width: 46,
				height: 12,
				x: 343,
				y: 93
			});
		});

		_timer( 100, function(){		
			t.Title.anime( 80, {
				y: 50,
				height: 10
			});
		});

		_timer( 100, function(){		
			t.Content.anime( 80, {
				y: 70,
				width: 200,
				height: 70
			});
		});

		_timer( 100, function(){	
			t.Page.anime( 100, {
				y: 0,
				height: 530
			});
		});


		_timer( 100, function(){	
			t.BrowserLanding.anime( 80, {
				width: 300
			});	
			t.HeaderLanding.anime( 120, {
				width: 300
			});
			t.CloseLanding.anime( 80, {
				r: 2
			});
			t.ReduceLanding.anime( 80, {
				r: 2
			});
			t.FullLanding.anime( 80, {
				r: 2
			});
		});

		t.accelerator = 4;
		
		_timer( 100, function(){	

			t.ContentTextBrowser.anime( 140, {
				opacity:1
			});
			t.TitleTextBrowser.anime( 80, {
				opacity:1
			});
			jQuery( '#title-text-browser' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:103,y:8*(i+1) + 49, "font-size": "8px"});

			});
			jQuery( '#content-text-browser' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:103,y:8*(i+1) + 70, "font-size": "8px"});

			});

		});

		_timer( 140, function(){	
			t.tap('publish');
		});

		_timer( 300, function(){	
			t.SectionOne.anime( 300, {
				width: 300
			});
		});

		_timer( 140, function(){	
			t.ContentText.anime( 140, {
				opacity:1
			});
			t.TitleText.anime( 80, {
				opacity:1
			});
			jQuery( '#title-text' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:40,y:8*(i+1) + 60, "font-size": "14px"});

			});
			jQuery( '#content-text' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:40,y:8*(i+1) + 80, "font-size": "8px"});

			});
		});
		
		_timer( 300, function(){		
			t.tap('button-a');
		});


		_timer( 100, function(){		
			t.TitleSA.anime( 80, {
				y: 150,
				height: 10
			});
	
			t.ContentSA.anime( 80, {
				y: 170,
				width: 200,
				height: 70
			});	

			t.ContentSA2.anime( 80, {
				y: 250,
				width: 200,
				height: 70
			});
		});

		_timer( 500, function(){

			var scroll = 100;

			t.Title.anime( 200, {
				y: '-='+scroll
			});
			jQuery( '#title-text-browser' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).velocity({ y:'-='+scroll });

			});
			jQuery( '#content-text-browser' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).velocity({ y:'-='+scroll });

			});
			t.Content.anime( 200, {
				y: '-='+scroll
			});	

			t.TitleSA.anime( 200, {
				y: '-='+scroll
			});
			t.ContentSA.anime( 200, {
				y: '-='+scroll
			});
			t.ContentSA2.anime( 200, {
				y: '-='+scroll
			});


		});


		_timer( 500, function(){	
			t.ContentTextBrowserSA1.anime( 140, {
				opacity:1
			});
			t.ContentTextBrowserSA2.anime( 140, {
				opacity:1
			});
			t.TitleTextBrowserSA.anime( 80, {
				opacity:1
			});
			jQuery( '#title-text-browserSA' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:103,y:8*(i+1) + 49, "font-size": "8px"});

			});
			jQuery( '#content-text-browserSA1' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:103,y:8*(i+1) + 70, "font-size": "8px"});

			});
			jQuery( '#content-text-browserSA2' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:103,y:8*(i+1) + 150, "font-size": "8px"});

			});
		});

		
		_timer( 140, function(){		
			t.tap('publish');
		});


		_timer( 140, function(){	
			t.TitleTextSS.anime( 80, {
				opacity:1
			});
			t.ContentTextSS1.anime( 140, {
				opacity:1
			});
			t.ContentTextSS2.anime( 140, {
				opacity:1
			});
			jQuery( '#title-text-ss' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:60,y:8*(i+1) + 190, "font-size": "14px"});

			});
			jQuery( '#content-text-ss1' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:40,y:8*(i+1) + 220, "font-size": "8px"});

			});
			jQuery( '#content-text-ss2' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:160,y:8*(i+1) + 220, "font-size": "8px"});

			});
		});
		
		_timer( 700, function(){		
			t.tap('button-b');
		});

		_timer( 100, function(){		
			t.TitleBrowserSA2.anime( 80, {
				y: 230,
				height: 10
			});
	
			t.ContentBrowserSA2.anime( 80, {
				y: 250,
				width: 200,
				height: 70
			});
		});

		_timer( 500, function(){

			var scroll = 180;

			t.Title.anime( 200, {
				y: '-='+scroll
			});
			jQuery( '#title-text-browser' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).velocity({ y:'-='+scroll });

			});
			jQuery( '#content-text-browser' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).velocity({ y:'-='+scroll });

			});
			t.Content.anime( 200, {
				y: '-='+scroll
			});	

			t.TitleSA.anime( 200, {
				y: '-='+scroll
			});
			t.ContentSA.anime( 200, {
				y: '-='+scroll
			});
			t.ContentSA2.anime( 200, {
				y: '-='+scroll
			});
			jQuery( '#title-text-browserSA' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).velocity({ y:'-='+scroll });

			});
			jQuery( '#content-text-browserSA1' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).velocity({ y:'-='+scroll });

			});
			jQuery( '#content-text-browserSA2' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).velocity({ y:'-='+scroll });

			});
			t.TitleBrowserSA2.anime( 80, {
				y: '-='+scroll
			});
	
			t.ContentBrowserSA2.anime( 80, {
				y: '-='+scroll
			});

		});
		_timer( 500, function(){	
			t.TitleTextBrowserSA2.anime( 80, {
				opacity:1
			});
			jQuery( '#title-text-browserSA2' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:103,y:8*(i+1) + 49, "font-size": "8px"});

			});
		});

		_timer( 700, function(){		
			t.tap('publish');
		});

		_timer( 140, function(){	
			t.TitleTextTS.anime( 80, {
				opacity:1
			});


			jQuery( '#title-text-ts' ).find( 'tspan tspan' ).each(function(i, tspan){

				jQuery( tspan ).attr({ x:60,y:8*(i+1) + 320, "font-size": "12px"});

			});

		});
}

Storytelling.prototype.unRunImac = function(){
	
		var t = this;
		t.accelerator = 4;
	
			t.Imac.anime( 80, {
				width: 0
			});
	
			t.ScreenBackground.anime( 80, {
				width: 0
			});
		
			t.Screen.anime( 80, {
				width: 0
			});

			t.Close.anime( 140,{
				r: 0
			});

			t.Reduce.anime( 140,{
				r: 0
			});

			t.Full.anime( 140,{
				r: 0
			});

			t.Header.anime( 100, {
				width: 0
			});
	
			t.SidebarLeft.anime( 100, {
				height: 0
			});
		
			t.SidebarRight.anime( 100, {
				height: 0
			});
			t.Publish.anime( 100, {
				height: 0
			});
		
			t.buttonA.anime( 80, {
				height:0
			});
		
			t.buttonB.anime( 80, {
				width: 0
			});
		
			t.buttonC.anime( 80, {
				width: 0
			});
		
			t.Title.anime( 80, {
				height: 0
			});
		
			t.Content.anime( 80, {
				width: 0
			});
	
			t.Page.anime( 100, {
				height: 0
			});
	
			t.BrowserLanding.anime( 80, {
				width: 0
			});	
			t.HeaderLanding.anime( 120, {
				width: 0
			});
			t.CloseLanding.anime( 80, {
				r: 0
			});
			t.ReduceLanding.anime( 80, {
				r: 0
			});
			t.FullLanding.anime( 80, {
				r: 0
			});

			t.ContentTextBrowser.anime( 140, {
				opacity:0
			});
			t.TitleTextBrowser.anime( 80, {
				opacity:0
			});

			t.SectionOne.anime( 300, {
				width: 0
			});

			t.ContentText.anime( 140, {
				opacity:0
			});
			t.TitleText.anime( 80, {
				opacity:0
			});


			t.TitleSA.anime( 80, {
				height: 0
			});
	
			t.ContentSA.anime( 80, {
				width: 0
			});	

			t.ContentSA2.anime( 80, {
				width: 0
			});


			t.ContentTextBrowserSA1.anime( 140, {
				opacity:0
			});
			t.ContentTextBrowserSA2.anime( 140, {
				opacity:0
			});
			t.TitleTextBrowserSA.anime( 80, {
				opacity:0
			});


			t.TitleTextSS.anime( 80, {
				opacity:0
			});
			t.ContentTextSS1.anime( 140, {
				opacity:0
			});
			t.ContentTextSS2.anime( 140, {
				opacity:0
			});

			t.Imac.anime( 140, { width:0 });

			t.bottomScreen.anime(150,{
				width: 0
			});

			t.Footer.anime(140,{
				height: 0
			});

			t.FootFooter.anime(150,{
				width: 0
			});

			t.Imacbottom.anime(140,{
				width: 0
			});

			t.Pomme.anime(140,{
				r:0
			});

}
