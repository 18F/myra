//// jQuery noUISlider implementation
//// Documentation: http://refreshless.com/nouislider/
//// Calculator v2
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

  function setValues(){
    value1 = Number($('#input-1').val());
    value2 = Number($('#input-2').val().replace('$',''));
    value3 = Number($('#input-3').val().replace('$',''));
    untilRetirement = 65 - value1;
    $('#base-rate').html('$' + value2 + '/month');
    $('#reach-rate').html('$' + value3 + '/month');
    $('#result-1').html('$' + (value2 * untilRetirement * 12));
    $('#result-2').html('$' + (value3 * untilRetirement * 12));
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

  function graphIt(){
    // First, build the data
    // Build an array of every age between current age and 65
    // And then build arrays of the savings at each point if you start saving now or later
    var ages, baseGoal, reachGoal, baseSavings, reachSavings;
    ages = []; // Array of all the ages between your current age and 65
    baseGoal = []; // Data points for if you start saving now
    reachGoal = []; // Data points if you start in 10 years

    for (i = 1; i <= untilRetirement; i++ ) {
      baseSavings = i * 12 * value2;
      reachSavings = i * 12 * value3;
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
