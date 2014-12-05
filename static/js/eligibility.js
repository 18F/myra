jQuery(document).ready(function(){
  $(':radio').click(function(){
    var value = $(this).val();
    $('#' + value).fadeIn();

    if ( value === 'ineligible' ) {
      $('#eligibility-part-2, #eligibility-part-3, #unsure, #eligibility-success').hide();
    } else if ( value === 'unsure' ) {
      $('#eligibility-part-2, #eligibility-part-3, #ineligible, #eligibility-success').hide();
    } else {
      $('#ineligible, #unsure').hide();
    }
  });

})
