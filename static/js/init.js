// Quick and Easy Javascript Detection
$("html").removeClass( "no-js" );

// Navigation
//// Add the mobile nav option
$(".site-header").prepend('<button type="button" class="nav-toggle btn btn-default"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span><span class="sr-only">Toggle Navigation</span></button>');

//// Activate nav on mobile nav toggle click
$(".nav-toggle").click(function() {
  $(".main-nav").toggleClass("active");
  $(".site-title").toggle();
});


$(document).ready(function(){

  $('.benefit-block').addClass('appear fade-in');
  $('.step').addClass('appear slide-in');
  
  // Page animation behavior
  var windowHeight, scrollPos;
  windowHeight = $(window).height();
  scrollPos = $(window).scrollTop();

  // This handles all of the transitions
  // We'll get the position of anything with the appear class
  // And then if that element is in the viewport, we add visible
  // The animation tranistinos are handled in the sass
  function makeVisible(element) {
    var selfTop = element.offset().top;
    if ( scrollPos > (selfTop - windowHeight + 200)) {
      element.addClass('visible');
    }
  }

  $('.appear').each(function(){
    var self = $(this);
    makeVisible(self);
    $(window).scroll(function(){
      scrollPos = $(window).scrollTop();
      makeVisible(self);
    })
  })

  // Sticking page nav
  // First we get the offset and height of the page nav
  // Then when the scroll position goes beyond we set it to fixed position
  // And add padding to the top of body to keep everything smooth
  var navTop, navHeight;
  navTop = $('.page-nav').offset().top;
  navHeight = $('.page-nav').height();
  $(document).scroll(function(){
    scrollPos = $(window).scrollTop();
    if (scrollPos >= navTop) {
      $('.page-nav').addClass('fixed');
      $('body').css('padding-top', navHeight);
    } else {
      $('.page-nav').removeClass('fixed');
      $('body').css('padding-top', 0);
    }
  })

  // Email signup
  $("#email-capture button").click(function(e){
    e.preventDefault();
    $('#email-capture').append('<div class="flash-success"><p>Congratulations on thinking about your future.</p><p>We will email you when myRA is open for business.</p></div>');
  })

  // Tabs
  $('.tab').click(function(e){
    e.preventDefault();
    var parent, tabID;
    // Get the parent so that it only affects tabs in this section
    parent = $(this).parents('section');
    tabId = $(this).attr('href');
    console.log(tabId);
    parent.find('.active').removeClass('active');
    $(this).addClass('active');
    $(tabId).addClass('active');
  });

  $('.features .tab').click(function(){
    $('.tab-content-container').animate({
      marginTop: 0,
    })
  })

  // Slideshow
  $('.bxslider').bxSlider({
    mode: 'horizontal',
    infiniteLoop: false,

  });

  // Reveal employer forms
  $('#submit').click(function(){
    $('#download-form').addClass('hidden');
    $('#download-button').removeClass('hidden');
  })

})
