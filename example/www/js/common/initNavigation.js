function initLiveNavigation() {
  console.log('initLiveNavigation');
  $('<div class="channel delete-now"></div>').appendTo('.large-9.columns');
  rowWidth = ~~($('.large-9.columns').outerWidth(true) / $('.channel').outerWidth(true));
  $('.channel.delete-now').remove();
  setTimeout(function(){
    $('#packages-region li:first').addClass('active');
    $('#packages-region .category-name').remove();

    _.each($('.categories-container .category'), function(category) {
      newClass = $(category).children('.parent').attr('class');
      newClass = newClass.split(" ");
      newClass = newClass[1];
      $(category).addClass(newClass);
    });

    $('#sidebar-region .category:first .category-name:first').addClass('active');
    $('#sidebar-region .category .parent').remove();

  }, 2500);
}