jQuery(document).ready(function(){
  $(':radio').click(function(){
    var value = $(this).val();
    if ( value === 'ineligible' ) {
      $('.eligibility-result, .eligibility-input').hide();
    } else if ( value === 'unsure' ) {
      $('.eligibility-result').hide();
    } else {
      $('.eligibility-result').hide();
    }

    $('#' + value).fadeIn();

  });

})
