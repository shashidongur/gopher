
//SMOOTH PAGE SCROLL
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


//OWL CAROSEL TESTIMONIAL
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:true,
    dotsEach:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

$(document).ready(

  function() { 

    $("html").niceScroll({
    	cursorcolor:"#f74d65",
    	scrollspeed :"100",
    	cursorborder:"1px solid #f74d65",
    	horizrailenabled: "false",
    	cursorborderradius: "0px"
    });

    $('#join_email_list').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        var user =  {
          'email': $("#join_email_list div input").val()
        };
        $.post('/addUserEmail', user, function(data){
          console.log(data)
        });
        $('#join_email_list').fadeOut("slow", function(){
          var div = $("<div style='color:black; font-size: x-large; font-weight: 500;'>Welcome to Gopher! We'll update you when things are ready.</div>");
          $(this).replaceWith(div);
          $('#join_email_list').slideUp("slow");
        });        
    });
    $('#investor_submit').on('click', function(e) { //use on if jQuery 1.7+
      e.preventDefault();  //prevent form from submitting
      var isFormFull = 0;
      if($('#name').val() == ""){
        $('#name').css("border", "2px solid #f73b56");
        isFormFull += 1;
      } else {$('#name').css("border", "none");}
      if($('#email').val() == ""){
        $('#email').css("border", "2px solid #f73b56");
        isFormFull += 1;
      } else {$('#email').css("border", "none");}
      if($('#subject').val() == ""){
        $('#subject').css("border", "2px solid #f73b56");
        isFormFull += 1;
      } else {$('#subject').css("border", "none");}
      if($('#message').val() == ""){
        $('#message').css("border", "2px solid #f73b56");
        isFormFull += 1;
      } else {$('#message').css("border", "none");}

      if($('#antispam').val() == ""){
        if(isFormFull == 0){
            var user =  {
              'name': $("#name").val(),
              'email' : $("#email").val(),
              'subject': $("#subject").val(),
              'body': $("#message").val()
            };
            $.post('/investorMessage', user, function(data){

            });
            $('#investor_submit').replaceWith("<button type='button' id='investor_submit' class='btn btn-default submit-btn form_submit_green'>Message Sent!</button>");
          }
        }        
    });
  }
);

new WOW().init();


    
/*Preloader*/
//<![CDATA[
$(window).load(function() { // makes sure the whole site is loaded
  $('#status').fadeOut(); // will first fade out the loading animation
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
  $('body').delay(350).css({'overflow':'visible'});
})
//]]>


//Ajax call to insert emails.
