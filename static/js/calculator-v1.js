//// jQuery noUISlider implementation
//// Documentation: http://refreshless.com/nouislider/
//// Calculator v1
$(document).ready(function(){
  // First slider
  $('#input-1').noUiSlider({
    start: 25,
    step: 1,
    range: {
      'min': 0,
      'max': 100
    }
  });

  Second slider
  $('#input-2').noUiSlider({
    start: 10,
    step: 1,
    range: {
      'min': 0,
      'max': 60
    }
  });

  // Set the displayed values
  var value1, value1, result;
  value1 = $('#input-1').val();
  value2 = $('#input-2').val();

  function setValues(){
    $('#input-1-value').html('$' + value1);
    $('#input-2-value').html(value2 + ' years');
    $('#calculator-result-value').html('$' + (value1 * value2 * 12));
  }

  // Set the values on page load to the defaults
  setValues();

  // Multiply the values of the two sliders
  $('.calculator-input').change(function(){
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
