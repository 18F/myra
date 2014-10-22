//// jQuery noUISlider implementation
//// Documentation: http://refreshless.com/nouislider/
//// Calculator v2
Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d === undefined ? "." : d,
    t = t === undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

jQuery(document).ready(function($){
  // First slider
  $('#input-1-slider').noUiSlider({
    start: 20,
    step: 1,
    range: {
      'min': 0,
      'max':100

    },
    serialization: {
      lower: [
        $.Link({
          target: $('#input-1')
        })
      ],
      format: {
        decimals: 0,
        thousand: ' ',
        prefix: '$'
      }
    }
  });

  // Second slider
  $('#input-2-slider').noUiSlider({
    start: 6,
    step: 1,
    range: {
      'min': 0,
      'max': 30
    },
    serialization: {
      lower: [
        $.Link({
          target: $('#input-2')
        })
      ],
      format: {
        decimals: 0,
      }
    }
  });

  //Set Interest Compound Periods
  // Set the APR in decimal form
  var ip = 12;
  var apr = 0.025;
  var goal = 5000;

  // Get the savings goal
  $('.toggle-buttons .button').click(function(){
    $('.button[aria-pressed="true"]').attr('aria-pressed', 'false');
    $(this).attr('aria-pressed', 'true');
    goal = Number($(this).val().replace('$','').replace(',',''));
    updateSlide1();
    updateSlide2();
  });

  // Set the displayed values
  var value1, value2, principal, interest, total, pWidth, iWidth;
  function setValues(){
    value1 = Number($('#input-1').val().replace('$',''));
    value2 = Number($('#input-2').val());
    total = compoundInterest(0, apr, ip, value2, value1);

    // What happens as long as the total is under 15k
    if ( total < goal ) {
      principal = value1 * value2 * 12;
      interest = total - principal;

      // Now let's set the widths of each meter section
      pWidth = (principal / goal) * 100;
      iWidth = (interest / goal) * 100;
      $('.meter-p').width(pWidth + '%');
      $('.meter-i').width(iWidth + '%');
      $('.results .calculator-helper').fadeOut();
      moveInterestLabel(pWidth);
      setLabels(goal, value1, value2);
      $('.results .calculator-helper').hide();
    }
    // Once we hit 15k
    else {
        principal = value1 * value2 * 12;
        interest = total - principal;
        $('.years-to-goal').html(value2);
        $('.results .calculator-helper').fadeIn();
        pWidth = (principal / goal) * 100;
        iWidth = 100 - pWidth;
        $('.meter-p').width(pWidth + '%');
        $('.meter-i').width(iWidth + '%');
        setLabels(goal, value1, value2);
        moveInterestLabel(pWidth);
    }
  }

  function moveInterestLabel(pWidth){
    if ($(window).width() > 600 ) {
      if (25 < pWidth && pWidth < 78 ) {
        $('.interest-label').css('left', pWidth + '%');
      } else if ( pWidth > 78 ) {
        $('.interest-label').css('right', '0%').css('left','auto');
      } else if ( pWidth < 25 ) {
        $('.interest-label').css('left', '25%');
      }
    }
  }

  function setLabels(value0, value1, value2) {
    $('.total-saved').html('$' + total.formatMoney(0,'.',','));
    $('.principal-saved').html('$' + principal.formatMoney(0,'.',','));
    $('.interest-earned').html('$' + interest.formatMoney(0,'.',','));
    $('.savings-goal').html('$' + value0.formatMoney(0,'.',','));
    $('.monthly-rate').html('$' + value1);
    $('.daily-rate').html('$' + (value1/30).formatMoney(2,'.',','));
  }

  function updateSlide2(){
    var value1=Number($('#input-1-slider').val().replace('$',''));
    var value2=Number($('#input-2-slider').val());
    var total=compoundInterest(0, apr, ip, value2, value1);
    if (total > goal)
    {
      $('#input-2-slider').val(value2-1);
      value1=Number($('#input-1-slider').val().replace('$',''));
      value2=Number($('#input-2-slider').val());
      total=compoundInterest(0, apr, ip, value2, value1);
      $('#input-2-slider .noUi-origin').css('background-color', '#2FA380');
      if(total < goal) {
        $('#input-2-slider').val(value2+1);
        $('#input-2-slider .noUi-origin').css('background-color', '#fff');
      } else {
        updateSlide2();
      }
    }
    setValues();
  }
  function updateSlide1(){
    value1=Number($('#input-1-slider').val().replace('$',''));
    value2=Number($('#input-2-slider').val());
    total=compoundInterest(0, apr, ip, value2, value1);
    if (total > goal)
    {
      $('#input-2-slider').val(value2-1);
      value1=Number($('#input-1-slider').val().replace('$',''));
      value2=Number($('#input-2-slider').val());
      total=compoundInterest(0, apr, ip, value2, value1);
      if (total < goal)
        $('#input-2-slider').val(value2+1);
      else
        updateSlide2();
    }
    setValues();
  }

  function compoundInterest(p,r,n,t,D){
    /*****************************
    p = principal, starting amount
    r = apr in decimal format
    n = number of compounds
    t = time in years
    D = Monthly deposit ammount
    ******************************/
    for (var i = 0; i < t*n; i++)
    {
      p = (p+D)*(1+(r/12));
    }
    return p;
  }


  $('#input-1-slider').change(function(e){
    console.log('yolo');
    setValues();
    updateSlide1();
  });

  $('#input-2-slider').change(function(e){
    console.log('yolo');
    setValues();
    updateSlide2();
  });

  setValues();
});
