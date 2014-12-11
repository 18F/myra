jQuery(document).ready(function(){
  $(':radio').click(function(){
    var value = $(this).val();
    if ( value === 'ineligible' ) {
      $('.eligibility-result, .eligibility-input').hide().attr('aria-hidden','true');
    } else if ( value === 'unsure' ) {
      $('.eligibility-result').hide().attr('aria-hidden','true');
    } else {
      $('.eligibility-result').hide().attr('aria-hidden','true');
    }

    $('#' + value).fadeIn().attr('aria-hidden','false');

  });

})
