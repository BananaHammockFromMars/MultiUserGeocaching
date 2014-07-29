function showBlurbs(){
  seenTutorial = localStorage.getItem('seenTutorial');
    if (seenTutorial != 'v1') {
      $('body').addClass('blurbs-open');
      $(document).foundation({
        'joyride': {
          post_ride_callback: function() {
            $('.active-category').addClass('selected');
            $('body').removeClass('blurbs-open').addClass('blurbs-closed');
          },
          pre_step_callback: function() {
            var addFocus = $(this.$current_tip['0'].children['1'].children['2']);
            setTimeout(function(){
              $(addFocus).focus();
            },500);
          }
        }
      })
      $(document).foundation('joyride', 'start');
      localStorage.setItem('seenTutorial', 'v1');
    }
    else {

    }
}