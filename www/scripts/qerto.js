$(function() {


    $("a[href='#contact']").on('click', function(e){
        e.preventDefault();
        $('html,body').animate({scrollTop: $('#contact').offset().top},'normal');
    });
 
   // Get the form.
    var form = $('#contact-form');
    var formRecrutement = $('#contact-form-recrutement');

    // Get the messages div.
    var formMessages = $('#form-messages');

    $(form).on('submit', function(event) {
        // Stop the browser from submitting the form.

        event.preventDefault();

        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields       
        $("#contact-form input[required=true], #contact-form textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ //if this field is empty 
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag              
            }   
        });



        if( $('#contact-form input[name=url]').val() != "" ){

            proceed = false;
        }
       
        if(proceed) //everything looks good! proceed...
        {

            //get input field values data to be sent to server
            post_data = {
                'user_name'     : $('input[name=name]').val(), 
                'user_email'    : $('input[name=email]').val(), 
                'user_society'  : $('input[name=society]').val(), 
                'msg'           : $('textarea[name=message]').val()
            };
            
            //Ajax post data to server
            $.post('real-mailer.php', post_data, function(response){  

                if(response.type == 'error'){ //load json data from server and output message     
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    $("#contact-form  input[required=true], #contact-form textarea[required=true]").val(''); 
                    $("#contact-form .form").slideUp(); //hide form after success
                }
                $("#contact-form #contact-results").hide().html(output).slideDown();
            }, 'json');
        }
        //reset previously set border colors and hide all message on .keyup()
        $("#contact-form  input[required=true], #contact-form textarea[required=true]").keyup(function() { 
            $(this).css('border-color',''); 
        });

    });

    $('input[type=file]').on('change', prepareUpload);
    function prepareUpload(event)
    {
        files = event.target.files;
    }

	$(formRecrutement).on('submit', function(event) {
	    // Stop the browser from submitting the form.
        event.stopPropagation();
	    event.preventDefault();


        var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields       
        $("#contact-form input[required=true], #contact-form textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){ //if this field is empty 
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag
                alert('proceed false 1');            
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red   
                proceed = false; //set do not proceed flag  
                alert('proceed false 2');            
            }   
        });



        if( $('#contact-form input[name=url]').val() != "" ){

            proceed = false;
                alert('proceed url');            
        }
       
        if(proceed) //everything looks good! proceed...
        {

            alert('mop');

            //get input field values data to be sent to server
            post_data = {
                'user_name'     : $('input[name=name]').val(), 
                'user_email'    : $('input[name=email]').val(), 
                'user_society'  : $('input[name=society]').val(), 
                'msg'           : $('textarea[name=message]').val()
            };

            var formData = new FormData( this );

            $.each(files, function(key, value)
            {
                formData.append(key, value);
            });
            console.log(formData);

            // $.ajax({
            //     url: 'real-uploader.php',
            //     type: 'POST',
            //     data: formData,
            //     async: false,
            //     success: function (response) {
            //         if(response.type == 'error'){ //load json data from server and output message     
            //             output = '<div class="error">'+response.text+'</div>';
            //         }else{
            //             output = '<div class="success">'+response.text+'</div>';
            //             //reset values in all input fields
            //             $("#contact-form  input[required=true], #contact-form textarea[required=true]").val(''); 
            //             $("#contact-form .form").slideUp(); //hide form after success
            //         }
            //         $("#contact-form #contact-results").hide().html(output).slideDown();
            //     },
            //     cache: false,
            //     contentType: false,
            //     processData: false
            // });

            //Ajax post data to server
            $.post('real-mailer.php', formData, function(response){  

                if(response.type == 'error'){ //load json data from server and output message     
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    $("#contact-form  input[required=true], #contact-form textarea[required=true]").val(''); 
                    $("#contact-form .form").slideUp(); //hide form after success
                }
                $("#contact-form #contact-results").hide().html(output).slideDown();
            }, 'json');
        }
	    //reset previously set border colors and hide all message on .keyup()
	    $("#contact-form  input[required=true], #contact-form textarea[required=true]").keyup(function() { 
	        $(this).css('border-color',''); 
	    });

    });
    

});