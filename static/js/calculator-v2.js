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
  $('#input-2-slider').noUiSlider({
    start: 25,
    step: 1,
    range: {
      'min': 0,
      'max': 100
    },
    serialization: {
      lower: [
        $.Link({
          target: $('#input-2')
        })
      ],
      format: {
        decimals: 0,
  			thousand: ' ',
  			prefix: '$'
      }
    }
  });

  $('#input-3-slider').noUiSlider({
    start: 35,
    step: 1,
    range: {
      'min': 0,
      'max': 100
    },
    serialization: {
      lower: [
        $.Link({
          target: $('#input-3')
        })
      ],
      format: {
        decimals: 0,
        thousand: ' ',
        prefix: '$'
      }
    }
  });

  // Set the displayed values
  var value1, value2, result1, result2, untilRetirement;

  //Set APR, in decimal form
  var apr = .05;
  //Set Interest Compound Periods
  var ip = 12;

  function setValues(){
    value1 = Number($('#input-1').val());
    value2 = Number($('#input-2').val().replace('$',''));
    value3 = Number($('#input-3').val().replace('$',''));
    untilRetirement = 65 - value1;
    $('#base-rate').html('$' + value2 + '/month');
    $('#reach-rate').html('$' + value3 + '/month');
    $('#result-1').html('$' + compoundInterest(0,apr,ip,untilRetirement,value2).formatMoney(2,'.',','));
    $('#result-2').html('$' + compoundInterest(0,apr,ip,untilRetirement,value3).formatMoney(2,'.',','));
  }


  // Multiply the values of the two sliders
  $('#calculator-2, #calculator-3').change(function(){
    $('#calculator-results .hidden').removeClass('hidden');
    setValues();
    graphIt();
  });

  // Function for compound interset
  // @param P = initial deposit
  // @param t = number of years the amount is deposited
  //
  // function compoundInterest(P, t){
  //   // Compound interest
  //   // A = amount of money accumulated after n years, including interest
  //   // P = principal amount (the initial amount you borrow or deposit)
  //   // r = annual rate of interest (as a decimal)
  //   // n = number of times the interest is compounded per year
  //   // t = number of years the amount is deposited
  //   var A, r, t;
  //   r = .02;
  //   n = 12;
  //   A = P*Math.pow((1 + r/n), n*t);
  //   return A;
  // }

  // Chart.js implementation
  // http://www.chartjs.org/docs/#line-chart


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


  function graphIt(){
    // First, build the data
    // Build an array of every age between current age and 65
    // And then build arrays of the savings at each point if you start saving now or later
    var ages, baseGoal, reachGoal, baseSavings, reachSavings;
    ages = []; // Array of all the ages between your current age and 65
    baseGoal = [compoundInterest(0,apr,ip,1,value2)]; // Data points for if you start saving now
    reachGoal = [compoundInterest(0,apr,ip,1,value3)]; // Data points if you start in 10 years
    for (i = 1; i <= untilRetirement; i++ ) {
      baseSavings = compoundInterest(baseGoal[i-1], apr, ip, 1, value2);
      reachSavings = compoundInterest(reachGoal[i-1], apr, ip, 1, value3)
      baseGoal.push(baseSavings);
      reachGoal.push(reachSavings);
    }

    // While we're at it, let's make an array of all the ages
    for (i = value1; i <= 65; i++ ) {
      ages.push(i);
    };

    // Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#projection").get(0).getContext("2d");
    ctx.canvas.width = 800;
    ctx.canvas.height = 300;
    var options = {
      bezierCurve: true,
      scaleShowGridLines: false,
      pointDot: false,
      showTooltips: false,
      scaleLabel : "<%= '$' + parseFloat(value).formatMoney(0,'.',',') %>"
    };

    var data = {
      labels: ages,
      datasets: [
          {
              label: "Start saving later",
              fillColor: "#49B577",
              data: reachGoal,
          },
          {
              label: "Start saving now",
              fillColor: "#1297B5",
              data: baseGoal,
          },

        ]
    };
    var projection = new Chart(ctx).Line(data, options);
  }




})
