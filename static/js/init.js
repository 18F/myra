jQuery(document).ready(function($){

  // Quick and Easy Javascript Detection
  $("html").removeClass( "no-js" );

  // Find and replace to italicize myRA
  $('.myra').each(function(){
    $(this).html('<em>my</em>RA');
  });

  // Fixing skip nav focus behavior in chrome
  $('.skip-nav').click(function(){
    $('#main').attr('tabindex','0');
  });

  $('#maindiv').blur(function(){
    $(this).attr('tabindex',-1);
  });

  // Tooltips
  $('.tooltip').tooltipster({
    theme: 'tooltipster-light',
    maxWidth: 300,
    position: 'bottom'
  });

  // Tooltips on focus
  $('.tooltip').focus(function(){
        $(this).tooltipster('show');
    }).blur(function(){
        $(this).tooltipster('hide');
    });

  // Page animation behavior
  var windowHeight, scrollPos;
  windowHeight = $(window).height();
  scrollPos = $(window).scrollTop();
  // We'll just add the appear classes in here so it doesn't mess up non-js browsers
  $('.headline, .hero-signup').addClass('appear fade-in');
  $('.individuals .benefit-block:nth-child(even)').addClass('appear slide-in-left fade-in');
  $('.individuals .benefit-block:nth-child(odd)').addClass('appear slide-in-right fade-in');
  $('.employer .benefit-block').addClass('appear fade-in');
  $('.payroll-logos li').addClass('appear fade-in');
  $('.stacked-steps .step').addClass('appear fade-in');
  $('.face').addClass('appear fade-in');

  // This handles all of the transitions
  // We'll get the position of anything with the appear class
  // And then if that element is in the viewport, we add visible
  // The animation tranistinos are handled in the sass
  function makeVisible(element) {
    var selfTop = element.offset().top;
    if ( scrollPos > (selfTop - windowHeight + 100)) {
      element.addClass('visible');
    }
  }

  $('.appear').each(function(){
    var self = $(this);
    makeVisible(self);
    $(window).scroll(function(){
      scrollPos = $(window).scrollTop();
      makeVisible(self);
    });
  });



  // Sticking page nav
  // First we get the offset and height of the page nav
  // Then when the scroll position goes beyond we set it to fixed position
  // And add padding to the top of body to keep everything smooth
  var navTop, navHeight, sections;
  if ( $('.page-nav').length > 0 ) {
    navTop = $('.page-nav').offset().top;

    // Build an array of all of the section ids
    sections = [];
    $('.page-nav a').each(function(){
      var id = $(this).attr('href');
      sections.push(id);
    });

    $(document).scroll(function(){
      scrollPos = $(window).scrollTop();
      if (scrollPos >= navTop) {
        navHeight = $('.page-nav').height();
        $('.page-nav').addClass('fixed');
        $('body').css('padding-top', navHeight);
      } else {
        $('.page-nav').removeClass('fixed');
        $('body').css('padding-top', 0);
      }

      // See if the section associated with each link is visible
      $('.page-nav a').each(function(){
        var sectionId = $(this).attr('href');
        var sectionTop = $(sectionId).offset().top;
        if ( scrollPos > (sectionTop - 46)) {
          $('.current-section').removeClass('current-section');
          $(this).parent('li').addClass('current-section');
          moveProgress();
        } else {
          $(this).parent('li').removeClass('current-section');
        }
      });
    });

    // Scroll down to sections in page nav {
    $('.page-nav a').click(function(){
      var sectionId = $(this).attr('href');
      scrollDown(sectionId);
    });
  }

  // Function to slide the progress bar over
  function moveProgress() {
    // .progress is absolutely position.
    // We want it's left equal the points of the .current-section
    var currentSection, left, width;
    left = $('.current-section').position().left;
    width = $('.current-section').width() + 1; // Adding 1px to close the gap
    $('.progress').css('left', left + 'px');
    $('.progress').css('width', width + 'px');
  }

  // Function to scroll down on anchor links
  // id = the element we're scrolling to
  function scrollDown(id) {
    // Get the target's position
    var sectionTop = $(id).offset().top;

    // Offset the top nav if it is there
    var offset;
    if ( $('.page-nav').length > 0 ) {
      offset = $('.page-nav').height();
    } else {
      offset = 0;
    }

    // Now scroll the body down to the element
    $('html, body').animate({
      scrollTop: sectionTop - offset
    });
  }

  // Email signup
  $("#email-capture button").click(function(e){
    e.preventDefault();
    $('#email-capture').append('<div class="flash-success"><p>Congratulations on thinking about your future.</p><p>We will email you when myRA is open for business.</p></div>');
  });

  // Tabs
  $('.tab').click(function(e){
    e.preventDefault();
    var parent, tabId;
    // Get the parent so that it only affects tabs in this section
    parent = $(this).parents('section');
    tabId = $(this).attr('href');
    parent.find('[aria-selected="true"]').attr('aria-selected','false');
    parent.find('[aria-hidden="false"]').attr('aria-hidden','true');
    $(this).attr('aria-selected', 'true');
    $(tabId).attr('aria-hidden','false');
  });

  $('.features .tab').click(function(){
    $('.tab-content-container').animate({
      marginTop: 0,
    });
  });

  // Slideshow
  // $('.bxslider').bxSlider({
  //   mode: 'horizontal',
  //   adaptiveHeight: true,
  // });

  // Employer Resource page alert
  // Mailchimp redirects to the url with the paremeter ?signup=true
  // If that happens, we want to display an alert

  var url = window.location.href.split('?');
  if (url[1] === 'signup') {
    $('.js-signup-alert').html('<p><strong>Email signup almost complete</strong></p><p>In order for you to receive updates on <span class="myra">myRA</span>, we need to confirm your email address.</p><p>To complete the subscription process, please click the link in the email we just sent you.</p>');
    $('.js-signup-alert').fadeIn();
  }

});
