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

  // Set the displayed values
  var value1, value2, value3, yearsBase, yearsReach, savingsBase, savingsReach, untilRetirement;

  //Set Interest Compound Periods
  var ip = 12;

  function setValues(){
    value1 = Number($('#input-1').val());
    value2 = Number($('#input-2').val().replace('$',''));
    value3 = value2 * 1.2; // 20% greater monthly savings
    untilRetirement = 65 - value1;
    // yearsBase =
    // yearsReach =
    savingsBase = compoundInterest(0,apr,ip,untilRetirement,value2).formatMoney(0,'.',',');
    savingsReach = compoundInterest(0,apr,ip,untilRetirement,value3).formatMoney(0,'.',',');

    // Set summary stats
    $('.summary-savings .base .big-number').html('$' + savingsBase);
    $('.summary-savings .reach .big-number').html('$' + savingsReach);

    // Set savings rates in summary stats
    $('.summary-savings .base .rate').html('$' + value2);
    $('.summary-savings .reach .rate').html('$' + value3.formatMoney(0,'.',','));
    $('.reach-goal-explanation .rate.base').html('$' + value2);
    $('.reach-goal-explanation .rate.reach').html('$' + value3.formatMoney(0,'.',','));
  }

  // Set the values and generate the graph every time you set input-2 value
  $('#calculator-2').change(function(){
    $('#calculator-results').removeClass('hidden');
    setValues();
    graphIt();
  });

  //Set APR, in decimal form
  var apr = .035;

  // Set the values and generate graph every time you set input-3 value
  $('#calculator-3 button').click(function(){
      $('#calculator-3 .selected').removeClass('selected');
      $(this).addClass('selected');
      apr = $(this).data('apr');
      setValues();
      graphIt();
  })


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
    ctx.canvas.width = 450;
    ctx.canvas.height = 300;
    var options = {
      bezierCurve: true,
      scaleShowGridLines: false,
      pointDot: false,
      showTooltips: false,
      scaleLabel : "<%= '$' + parseFloat(value).formatMoney(0,'.',',') %>",
      // scaleOverride: true,
      // scaleStepWidth: 100000,
      // scaleStartValue: 0,
      // scaleSteps: 5
    };

    var data = {
      labels: ages,
      datasets: [
          {
              label: "Reach goal",
              fillColor: "#49B577",
              data: reachGoal,
          },
          {
              label: "Base goal",
              fillColor: "#1297B5",
              data: baseGoal,
          },

        ]
    };
    var projection = new Chart(ctx).Bar(data, options);
  }




})
