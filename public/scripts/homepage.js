require(['enquire'], function(enquire) {

        enquire.register("screen and (min-width: 45em)", {

            deferSetup : true,
            setup : function() {
                // load content via AJAX
                console.log('setup');
            },
            match : function() {
                console.log('match');
                // show sidebar
            },
            unmatch : function() {
                // hide sidebar
                console.log('unmatch');
            }  

        });

});