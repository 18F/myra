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
  $('#benefits .object--third').addClass('appear fade-in');
  $('.numbered-step').addClass('appear fade-in');

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
  var navTop, 
      navHeight, 
      sections,
      firstSection,
      firstSectionTop;

  if ( $('.page-nav').length > 0 ) {
    navTop = $('.page-nav').offset().top;
    firstSection = $('.page-nav').find('li:first-child a').attr('href');
    firstSectionTop = $(firstSection).offset().top;

    $(document).scroll(function(){
      scrollPos = $(window).scrollTop();

      // Show it if we're past the top of the first section
      if (scrollPos >= firstSectionTop) {
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
        if ( scrollPos > (sectionTop - 60)) {
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
    var offset = 0;
    if ( $('.page-nav').length > 0 ) {
      offset = 10;
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

  // Tab navigation for dropdowns
  var mostRecentItem;

  $('.nav-menu__submenu').addClass('hidden').attr('aria-hidden','true');

  $('.nav-menu__item').hover(function(){
    showSubmenu($(this));
  }, function(){
    hideSubmenu($(this));
  })

  $('.nav-menu__item > a').focus(function(){
    mostRecentItem = this.parentNode;
    hideSubmenus();
    showSubmenu($(this).parent());
  });

  $('.nav-menu__submenu a').focus(function(){
    $(this).parent('.nav-menu__item').addClass('sub-menu-open');
    var nextItem = $(this).parents('.nav-menu__item').get(0);
    if ( nextItem != mostRecentItem && mostRecentItem ) {
      hideSubmenu(mostRecentItem);
    }
    mostRecentItem = nextItem;
  })

  $('*').focus(function(){
    if ( !$(this).parents('.nav-menu__item').get(0) ) {
      hideSubmenus();
    }
  });

  function showSubmenu(parent) {
    $(parent).addClass('sub-menu-open');
    $(parent).children('.nav-menu__submenu').removeClass('hidden').attr('aria-hidden','false');
  }

  function hideSubmenu(parent) {
    $(parent).removeClass('sub-menu-open');
    $(parent).children('.nav-menu__submenu').addClass('hidden').attr('aria-hidden','true');
  }

  function hideSubmenus($parent) {
    $('.nav-menu__submenu').addClass('hidden');
    $('.sub-menu-open').removeClass('sub-menu-open');
    $(parent).children('.nav-menu__submenu').addClass('hidden').attr('aria-hidden','true');
  } 
});