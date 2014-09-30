//// jQuery noUISlider implementation
//// Documentation: http://refreshless.com/nouislider/
//// Calculator v2
Number.prototype.formatMoney = function(c, d, t){
var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

$(document).ready(function(){
  // First slider
  $('#input-1-slider').noUiSlider({
    start: 10,
    step: 1,
    range: {
      'min': 1,
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
    start: 1,
    step: 1,
    range: {
      'min': 1,
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
  var apr = .035;

  // Set the displayed values
  var value1, value2, principal, interest, total;
  function setValues(){

    value1 = Number($('#input-1').val().replace('$',''));
    value2 = Number($('#input-2').val());
    total = compoundInterest(0, apr, ip, value2, value1);
    // What happens as long as the total is under 15k
    if ( total < 15000 ) {
      principal = value1 * value2 * 12;
      interest = total - principal;
      // Now let's set the widths of each meter section
      var pWidth = (principal / 15000) * 100;
      var iWidth = (interest / 15000) * 100;
      $('.meter-p').width(pWidth + '%');
      $('.meter-i').width(iWidth + '%');

      $('.calculator-helper:not(:first)').fadeOut();

      // And set the values displayed
      $('.total-saved').html('$' + total.formatMoney(0,'.',','));
      $('.principal-saved').html('$' + principal.formatMoney(0,'.',','));
      $('.interest-earned').html('$' + interest.formatMoney(0,'.',','));
      $('.monthly-rate').html('$' + value1);
      $('.daily-rate').html('$' + (value1/30).formatMoney(2,'.',','));
    }

    // Once we hit 15k
    else {
        total = 15000;
        principal = value1 * value2 * 12;
        interest = total - principal;
        $('.years-to-goal').html(value2);
        $('.calculator-helper').fadeIn();

        var pWidth = (principal / 15000) * 100;
        var iWidth = 100 - pWidth;
        $('.meter-p').width(pWidth + '%');
        $('.meter-i').width(iWidth + '%');

        // And set the values displayed
        $('.total-saved').html('$' + total.formatMoney(0,'.',','));
        $('.principal-saved').html('$' + principal.formatMoney(0,'.',','));
        $('.interest-earned').html('$' + interest.formatMoney(0,'.',','));
        $('.monthly-rate').html('$' + value1);
        $('.daily-rate').html('$' + (value1/30).formatMoney(2,'.',','));

    }

  }
  function updateSlide2(){
    var value1=Number($('#input-1-slider').val().replace('$',''));
    var value2=Number($('#input-2-slider').val());
    var total=compoundInterest(0, apr, ip, value2, value1); 
    if (total > 15000)
    {
      $('#input-2-slider').val(value2-1);
      var value1=Number($('#input-1-slider').val().replace('$',''));
      var value2=Number($('#input-2-slider').val());
      var total=compoundInterest(0, apr, ip, value2, value1);
      if(total < 15000) 
        $('#input-2-slider').val(value2+1);
      else
        updateSlide2();
    }
    setValues();
  }
  function updateSlide1(){
    var value1=Number($('#input-1-slider').val().replace('$',''));
    var value2=Number($('#input-2-slider').val());
    var total=compoundInterest(0, apr, ip, value2, value1); 
    if (total > 15000)
    {
      $('#input-1-slider').val(value1-1);
      var value1=Number($('#input-1-slider').val().replace('$',''));
      var value2=Number($('#input-2-slider').val());
      var total=compoundInterest(0, apr, ip, value2, value1);
      if (total < 15000) 
        $('#input-1-slider').val(value1+1);
      else
        updateSlide1();
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


  $('#calculator-1').change(function(){
    setValues();
    updateSlide1();
    $(this).next('.calculator-helper').fadeIn();

  })

  $('#calculator-2').change(function(){
    setValues();
    updateSlide2();
    $('.results').fadeIn();
  })



  setValues();
})
