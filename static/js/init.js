$.fn.scrollBottom = function() {
  return $(document).height() - this.scrollTop() - this.height();
};
jQuery(document).ready(function($){

  // Quick and Easy Javascript Detection
  $("html").removeClass( "no-js" );

  // Detect old IE just in case {
  var oldIE;
  if ($('html').is('.ie6, .ie7, .ie8')) {
    oldIE = true;
  }

  // Remove no-js titles from signup buttons
  $('.modal-trigger').attr('title', null);
  $('.modal-trigger').attr('disabled', null);

  // Fixing skip nav focus behavior in chrome
  $('.skip-nav').click(function(){
    $('#main').attr('tabindex','0');
  });

  $('#main').blur(function(){
    $(this).attr('tabindex','-1');
  });


  // Toggles
  $('.toggle').click(function(){
    var target = $(this).data('toggle');
    target = $('#' + target);
    if ( target.hasClass('open') ) {
      $('.beta').show().attr('aria-hidden','false');
      target.slideUp('fast');
      target.removeClass('open').attr('aria-expanded','false');
    } else {
      $('.beta').hide().attr('aria-hidden','true');
      target.slideDown('fast');
      target.addClass('open').attr('aria-expanded','true');
    }
  });

  // Tooltips
  $('.tooltip').tooltipster({
    theme: 'tooltipster-light',
    maxWidth: 300,
    position: 'bottom',
    trigger: 'hover',
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
          $(this).attr('aria-selected', 'true');
          $(this).parent('li').addClass('current-section');
          moveProgress();
        } else {
          $(this).parent('li').removeClass('current-section');
          $(this).attr('aria-selected', 'false');
        }
      });
      //fixes bug where the last section was never highlighted by highlighting it when
      //you scroll to the bottom
      if ($(window).scrollBottom() <= 0 && $('.page-nav a:last').attr('aria-selected') == 'false')
      {
        $('.page-nav a').each(function(){
          $(this).parent('li').removeClass('current-section');
          $(this).attr('aria-selected', 'false');
        });
        $('.page-nav a:last').each(function(){
          $('.current-section').removeClass('current-section');
          $(this).attr('aria-selected', 'true');
          $(this).parent('li').addClass('current-section');
          moveProgress();
        });
      }
    });

    // Scroll down to sections in page nav {
    $('.scroll-link').click(function(){
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

    // Set the focus on the element's header
    var nextTab = $(id).first('input, a, button');
    $(nextTab).attr('tabindex', '0');
    $(nextTab).focus();
  }

  // Find and replace to italicize myRA
  $('.myra').each(function(){
    $(this).html('<em>my</em>RA');
  });

  // Equal heights
  function equalHeight(group) {
   tallest = 0;
   group.each(function() {
      thisHeight = $(this).height();
      if(thisHeight > tallest) {
         tallest = thisHeight;
      }
   });
   group.height(tallest);
  }

  equalHeight($('.match-height'));

  // Modals
  // Accessibilty code borrowed from http://www.nczonline.net/blog/2013/02/12/making-an-accessible-dialog-box/

  var trigger, modal, modalOpen, modalId, $modal;

  $('.modal-trigger').click(function(e){
    e.preventDefault();
    trigger = $(this);
    modalId = trigger.data('modal');
    modal = document.getElementById(modalId);
    $modal = $('#' + modalId);
    $('#overlay').fadeIn('fast');
    $modal.show();
    // Set focus on the modal
    $modal.attr('tabindex', '-1');
    $modal.focus();
    modalOpen = true;
  });

  $('.close, #overlay').click(function(e){
    closeModal();
  })

  // Enabling "enter" key to close the dialogue
  $('.close').keypress(function(e){
    if (e.which == 13) {
      closeModal();
    };
  })

  function closeModal(){
    $('#' + modalId).hide();
    $('#overlay').fadeOut('fast');
    modalOpen = false;
    $modal.attr('open', null);
    trigger.attr('tabindex','0');
    trigger.focus();
  }

  if (!oldIE) {
    document.addEventListener("focus", function(event) {

      if (modalOpen && !modal.contains(event.target)) {
        event.stopPropagation();
        modal.focus();
      }

    }, true);

    document.addEventListener("keydown", function(event) {
      if (modalOpen && event.keyCode == 27) {
        closeModal();
      }
    }, true);
  }

  // Employer Resource page alert
  // Mailchimp redirects to the url with the paremeter ?signup=true
  // If that happens, we want to display an alert

  var url = window.location.href.split('?');
  if (url[1] === 'signup') {
    $('.js-individual-signup-form').replaceWith('<div class="js-signup-alert"><p><strong>Thank you</strong></p>In order to receive updates on <span class="myra">myRA</span>, please click the link in the email we just sent you.</p></div>');
    $('.js-signup-alert').fadeIn();
  } else if (url[1] === 'employersignup') {
    $('.js-signup-alert').html('<p><strong>Thank you</strong></p><p>You can download resources to share <span class="myra">myRA</span> with your employees below.</p><p>In order to receive updates on <span class="myra">myRA</span>, please click the link in the email we just sent you.</p>');
    $('.js-signup-alert').fadeIn();
  } else if (url[1] === 'thankyou') {
    if ( $('.js-individual-signup-form').length > 0 ) {
      $('.js-individual-signup-form').replaceWith('<div class="js-signup-alert"></div>');
    }
    $('.js-signup-alert').html('<p><strong>Subscription confirmed</strong></p><p>Thank you for signing up to receive updates on <span class="myra">myRA</span>.</p>');
    $('.js-signup-alert').fadeIn();
  }


});
