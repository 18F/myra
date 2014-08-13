//// jQuery noUISlider implementation
//// Documentation: http://refreshless.com/nouislider/
//// Calculator v2
$(document).ready(function(){
  // First slider
  $('#input-2').noUiSlider({
    start: 25,
    step: 1,
    range: {
      'min': 0,
      'max': 100
    }
  });

  // Set the displayed values
  var value1, value2, result1, result2, untilRetirement, lateSaving;
  value1 = $('#input-1').val();
  value2 = $('#input-2').val();
  untilRetirement = 65 - value1;
  lateSaving = untilRetirement - 10;

  function setValues(){
    $('#input-2-value').html('$' + value2);
    $('#result-1').html('$' + (value2 * untilRetirement * 12));
    $('#result-2').html('$' + (value2 * lateSaving * 12));
  }

  $('#calculator-1').change(function(){
    $('#calculator-2').fadeIn();
  })

  // Multiply the values of the two sliders
  $('#calculator-2').change(function(){
    $('#calculator-results').fadeIn();
    value1 = $('#input-1').val();
    value2 = $('#input-2').val();
    setValues();
  });


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

  $('#features .tab').click(function(){
    $('.tab-content-container').animate({
      top: 0,
    })
  })

})
