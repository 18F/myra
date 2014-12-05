jQuery(document).ready(function(){
  $(':radio').click(function(){
    var value = $(this).val();
    $('#' + value).fadeIn();

    if ( value === 'ineligible' ) {
      $('#eligibility-part-2, #eligibility-part-3').hide();
    } else {
      $('#ineligible').hide();
    }
  });

})
