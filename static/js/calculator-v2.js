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
  value1 = Number($('#input-1').val());
  value2 = Number($('#input-2').val());

  function setValues(){
    untilRetirement = 65 - value1;
    lateSaving = untilRetirement - 10;
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
    graphIt();
  });

  // Function for compound interset
  // @param P = initial deposit
  // @param t = number of years the amount is deposited

  function compoundInterest(P, t){
    // Compound interest
    // A = amount of money accumulated after n years, including interest
    // P = principal amount (the initial amount you borrow or deposit)
    // r = annual rate of interest (as a decimal)
    // n = number of times the interest is compounded per year
    // t = number of years the amount is deposited
    var A, r, t;
    r = .02;
    n = 12;
    A = P*Math.pow((1 + r/n), n*t);
    return A;
  }

  // Chart.js implementation
  // http://www.chartjs.org/docs/#line-chart

  function graphIt(){
    // First, build the data
    // Build an array of every age between current age and 65
    // And then build arrays of the savings at each point if you start saving now or later
    var ages, saveNow, saveLater, savings;
    ages = []; // Array of all the ages between your current age and 65
    saveNow = []; // Data points for if you start saving now
    saveLater = []; // Data points if you start in 10 years

    for (i = 1; i <= untilRetirement; i++ ) {
      savings = i * 12 * value2;
      saveNow.push(savings);

      // Now let's make an array for the "start in 10 years" scenario
      if (i <= 10 ) {
        saveLater.push(0);
      } else {
        var lateSavings = (i - 10) * 12 * value2;
        // console.log(lateSavings);
        saveLater.push(lateSavings);
      }
    }

    // While we're at it, let's make an array of all the ages
    for (i = value1; i <= 65; i++ ) {
      ages.push(i);
    };

  // console.log(saveLater);

    // Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#projection").get(0).getContext("2d");
    var options = {
      bezierCurve: true,
      scaleShowGridLines: false,
      pointDot: false,
      showTooltips: false,
      // scaleOverride: true,
      // scaleSteps: 15,
      // scaleStartValue: 0,
      // scaleStepWidth: 1000
    };

    var data = {
      labels: ages,
      datasets: [
          {
              label: "Start saving now",
              fillColor: "rgba(73,181,119, .8)",
              data: saveNow,
          },
          {
              label: "Start saving later",
              fillColor: "rgba(255,255,255.5)",
              data: saveLater,
          }
        ]
    };
    var projection = new Chart(ctx).Line(data, options);
  }




})
