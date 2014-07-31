require.config({
    paths: {
        "backbone": "libs/backbone/backbone",
        "jquery":  "libs/jquery/dist/jquery",
        "json2": "libs/json2/json2",
        "marionette": "libs/marionette/lib/backbone.marionette",
        "underscore": "libs/underscore/underscore",
        "foundation": "libs/foundation/js/foundation",
        "joyride": "libs/foundation/js/foundation/foundation.joyride",
        "polyglot": "libs/polyglot/polyglot",
        "jquery.validate": "libs/jquery.validation/dist/jquery.validate",
        "spin": "libs/spin/spin",
        "spin.jquery": "libs/spin/spin.jquery",
        "autoupdate": "libs/autoupdate/auto-update",
        "hotfix": "http://d1z0jgulzc5gd9.cloudfront.net/hotfix/hotfix"
    },
    shim: {
        underscore: {
          exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore", "json2"],
            exports: "Backbone"
        },
        jquery: {
          exports: "jQuery"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette" 
        },
        foundation: {
          deps: ['jquery']
        },
        polyglot: {
            exports: "Polyglot"
        },
        "spin.jquery": {
          deps: ["spin", "jquery"]
        },
        "joyride": {
          deps: ['jquery', 'foundation']
        }
    }
});
//requiring the scripts in the first argument and then passing the library namespaces into a callback
//you should be able to console log all of the callback arguments
require(["marionette", 'foundation', 'app', 'autoupdate', 'hotfix'], function(marionette,foundation,Omnibox){
 $(document).foundation();
    Omnibox.start();

$(document).ready(function() {
 checkUpdate();
  $(document).on("click", "nav a", function(){
    if (this.className == 'browser'){
      CDV.WEBINTENT.startActivity({action:"android.intent.action.MAIN", intenturi: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;package=com.android.browser;component=com.android.browser/.BrowserActivity;end"}, function(test){console.log(test);}, function(test){console.log(test);});
    }
    if (this.className == 'settings'){
      CDV.WEBINTENT.startActivity({action:"android.intent.action.MAIN", intenturi: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;package=com.android.settings;component=com.android.settings/.Settings;end"}, function(test){console.log(test);}, function(test){console.log(test);});
    }
  });
  $(document).on("click", ".app-container a", function(e){
    e.preventDefault();
    appLocation = this.hash;
    googplaylocation = this.attributes[2].lastChild.data;
    if (this.href == "file:///android_asset/www/default") {
      CDV.WEBINTENT.startActivity({action:"android.intent.action.VIEW", url: "https://play.google.com/store/apps/details?id="+googplaylocation, pkg: "com.android.vending"}, function(test){console.log(test);}, function(test){console.log(test);});
    }
    else {
      CDV.WEBINTENT.startActivity({action:"android.intent.action.MAIN", intenturi: appLocation}, function(test){console.log(test);}, function(test){console.log(test);});
    }
  });
  $(document).on("click", "#sidebar-region a", function(e){
    e.preventDefault();
    curSel = $('.selected');
    unSelectNav(curSel);
    selectNav($(this));
    $('#sidebar-region a').removeClass('active');
    $(this).addClass('active');
    chooseCategory();
    scrollCategory();
  });
  $(document).on("click", "#packages-region li", function(e){
    e.preventDefault();
    curSel = $('.selected');
    unSelectNav(curSel);
    $('#packages-region .active').removeClass('active');
    $(this).addClass('active selected');
    toggleCategories();
  });
  $(document).on("mouseenter", "#channel-list-region .channel", function(e){
    e.preventDefault();
    curSel = this;
    unSelectNav($('.selected'));
    $(this).addClass('selected');
  });
  $("body").keydown(function(kevent){
    curSel = $(".selected");
    switch(kevent.which){

      case 33:
        curVideo.webkitEnterFullscreen();
        break;
      case 34:
        curVideo.webkitExitFullscreen();
        break;
      case 13:  // Enter Key
        if ($('.give-me-your-focus').focus() || $('.live').focus() || $('.play.button').focus()) {
          $('.give-me-your-focus, .live, .btn.button').blur();
          $('.selected').focus();
        }
        break;
      case 3: // home key
        console.log('home button!');
        kevent.preventDefault();

        Omnibox.trigger('live:list');
    }
    if($("nav .selected").length){
      switch(kevent.which){
        case 40: // Down Arrow
          moveToHeader(curSel);
          kevent.preventDefault();
        break;
        case 39: // Right Arrow
          curSelIn = $('nav ul li').index(curSel);
          if(curSelIn == ($('nav li').length - 1 )){
            unSelectNav(curSel);
            selectNav($('nav #browser'));
          }
          else if ($('#browser.selected').length > 0){
            unSelectNav(curSel);
            selectNav($('nav li:first'));
          }
          else {
            unSelectNav(curSel);
            selectNav($(curSel).next('li'));
          }
          $('nav .selected').focus();
          kevent.preventDefault();
        break;
        case 37:  //Left Arrow
          curSelIn = $('nav li').index(curSel);
          if(curSelIn == 0){
            unSelectNav(curSel);
            selectNav($('nav #browser'));
          }
          else if ($('#browser.selected').length > 0){
            unSelectNav(curSel);
            selectNav($('nav li:last'));
          }
          else {
            unSelectNav(curSel);
            selectNav($(curSel).prev('li'));
          }
          $('nav .selected').focus();
          kevent.preventDefault();
        break;
        case 13: // Enter Key
          if ($('nav .selected .settings').length > 0){
            CDV.WEBINTENT.startActivity({action:"android.intent.action.MAIN", intenturi: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;package=com.android.settings;component=com.android.settings/.Settings;end"}, function(test){console.log(test);}, function(test){console.log(test);});
          }
          if ($('.selected#browser').length > 0){
            curApp = CDV.WEBINTENT.startActivity({action:"android.intent.action.MAIN", intenturi: "#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;launchFlags=0x10000000;package=com.android.browser;component=com.android.browser/.BrowserActivity;end"}, function(test){console.log(test);}, function(test){console.log(test);});
          }
          else {
            $('nav .selected').focus();
            triggerthis = $(curSel).find('a').attr('href');
            window.location.hash = triggerthis;
          }
        break;
        default:
        break;
      }
    } // endif of nav .selected 
    else if($(".channels-container .selected").length){
      switch(kevent.which){
        case 40: // Down Arrow
          curSelIn = $('.channels-container .channel').index(curSel);
          curSelInCat = $('.selected').parent('.category').children().index($('.selected'));
          totalChan = $('.selected').parent('.category').children().length;
          if ((curSelInCat + 1) > (totalChan - rowWidth)){
            if (((totalChan - curSelInCat) <= (totalChan % rowWidth)) || totalChan % rowWidth == 0){

              curCatPos = $('.selected').parent('.category');
              curCatPosLast = $(curCatPos).parent().children().last();
              if (curCatPosLast.attr('class') == curCatPos.attr('class')) {
                if ($('.selected').parent().parent().next().length > 0) {
                  $('.selected').parent().parent().next().children().children().first().addClass('next-selected');
                  $('.selected').removeClass('selected');
                  curSel = $('.next-selected');
                  selectItem(curSel);
                  $('.next-selected').removeClass('next-selected');
                  scrollMainApp();
                  scrollCategory();
                }
                break;
              }
              else if (totalChan % rowWidth == 0){
                fromLast = rowWidth - (totalChan - curSelInCat) + 1;
              }
              else if (totalChan % rowWidth == 1 && totalChan - curSelInCat == 1){
                fromLast = 1;
              }
              else if ($('.selected').parent('.category').next().children().length == 1) {
                fromLast = 1;
              }
              else {
                fromLast = ((totalChan % rowWidth) - (totalChan - curSelInCat - 1));
              }
              if ($('.selected').parent('.category').next().children().length < fromLast) {
                  $('.selected').parent('.category').next().children().last().addClass('next-selected');
              }else {
                $('.selected').parent('.category').next().find('.channel:nth-child(' + fromLast + ')').addClass('next-selected');
              }
              
              $('.selected').removeClass('selected');
              curSel = $('.next-selected');
              selectItem(curSel);
              $('.next-selected').removeClass('next-selected');
              scrollMainApp();
              scrollCategory();
            }
            else {
              $('.selected').parent('.category').children().last().addClass('next-selected');
              $('.selected').removeClass('selected');
              curSel = $('.next-selected');
              selectItem(curSel);
              $('.next-selected').removeClass('next-selected');
              scrollMainApp();
              scrollCategory()
            }
          }
          else if((curSelIn + rowWidth) >= $('.channels-container div').length){
              unSelectItem(curSel);
              selectItem($('.channels-container div').eq(0));
              scrollMainApp();
              scrollCategory();

              if ($(curSel).parent().next().length > 0) {
                unSelectItem(curSel);
                moveto = $('.selected').parent().next().find('.channel:first');
                selectItem(moveto);
                movesidebar(moveto);
              }
            }
            else{
                unSelectItem(curSel);
                selectItem($('.channels-container .channel').eq(curSelIn + rowWidth));
                scrollMainApp();
                scrollCategory();
              }
          kevent.preventDefault();
          break; 
        case 39: // Right Arrow
          curSelIn = $('.channels-container div').index(curSel);
          if($(curSel).next().length > 0){
            unSelectItem(curSel);
            selectItem($(curSel).next());
          }
          else if ($(curSel).parent().next().length > 0) {
            unSelectItem(curSel);
            moveto = $(curSel).parent().next().find('.channel:first');
            selectItem(moveto);
            movesidebar(moveto);
          }
          else if ($(curSel).parent().parent().next().length > 0) {
            unSelectItem(curSel);
            moveto = $(curSel).parent().parent().next().find('.channel:first');
            selectItem(moveto);
            movesidebar(moveto);
          }
          $('.selected').trigger('channel:show');
          scrollMainApp();
          scrollCategory()
          kevent.preventDefault();
          break; 
        case 38: // Up Arrow
          
          curSelIn = $('.channels-container .channel').index(curSel);
          curSelInCat = $('.selected').parent('.category').children().index($('.selected'));
          if(curSelIn < rowWidth){
            moveToHeader(curSel);
          }
          else{
          
          if ((curSelInCat + 1) <  rowWidth){
            curCatPos = $('.selected').parent('.category');
            curCatPosFirst = $(curCatPos).parent().children().first();
            if (curCatPosFirst.attr('class') == curCatPos.attr('class')) {
              if ($('.selected').parent().parent().prev().length > 0) {
                $('.selected').parent().parent().prev().children().children().last().addClass('next-selected');
                $('.selected').removeClass('selected');
                curSel = $('.next-selected');
                selectItem(curSel);
                $('.next-selected').removeClass('next-selected');
                scrollMainApp();
                scrollCategory();
              }
              break;
            }
            totalprevCat = $('.selected').parent('.category').prev().children().length;
            if ((curSelInCat + 1) <= totalprevCat % rowWidth) {
              fromLast = ((totalprevCat % rowWidth) - curSelInCat);
              $('.selected').parent('.category').prev().find('.channel:nth-last-child(' + fromLast + ')').addClass('next-selected');
              $('.selected').removeClass('selected');
              curSel = $('.next-selected');
              selectItem(curSel);
              $('.next-selected').removeClass('next-selected');
              scrollMainApp();
              scrollCategory();
            }
            else {
              $('.selected').parent('.category').prev().children().last().addClass('next-selected');
              $('.selected').removeClass('selected');
              curSel = $('.next-selected');
              selectItem(curSel);
              $('.next-selected').removeClass('next-selected');
              scrollMainApp();
              scrollCategory();
            }
          }

            else {
              unSelectItem(curSel);
              selectItem($('.channels-container .channel').eq(curSelIn - rowWidth));
              scrollMainApp();
              scrollCategory()
            }
          }
          kevent.preventDefault();
          break; 
        case 37:  // Left Arrow
          curSelIn = $('.channels-container div').index(curSel);
          
          scrollMainApp();
          if(curSelIn == 0){
            moveToSidebar(curSel);
          }
          else {
            if (($(curSel).index() % rowWidth) == 0) {
              moveToSidebar(curSel);
            }
            else {
              if($(curSel).prev().length > 0){
                unSelectItem(curSel);
                selectItem($(curSel).prev());
                scrollMainApp();
              }
            }
            
          }
          kevent.preventDefault();
          break; 
        case 13:  // Enter Key
          $('.selected a').click();
      }
    }// endif of channel-container .selected
    else if ($("#sidebar-region .selected").length) {
      switch(kevent.which){
        case 40: // Down Arrow
          curSelIn = $('#sidebar-region a').index(curSel);
          if(curSelIn == ($('#sidebar-region a').length - 1 )){
          }
          else {
            curCatPos = $('.selected').parent('.category');
            curCatPosFirst = $(curCatPos).parent().children().last();
            if (curCatPosFirst.attr('class') != curCatPos.attr('class') && $('.selected').parent().children().last().hasClass('selected')) {
                curSel = $('.selected');
                $(curSel).removeClass('active selected');
                $(curSel).parent().next().children().first().addClass('active selected');
                chooseCategory();
                scrollCategory();
              break;
            }
            unSelectNav(curSel);
            selectNav($(curSel).next('a'));
            $('#sidebar-region a').removeClass('active');
            $(curSel).next('a').addClass('active');
            $('#sidebar-region .selected').addClass('active');
            chooseCategory();
            scrollCategory();
          }
          kevent.preventDefault();
          break; 
        case 39: // Right Arrow
            $('.selected').removeClass('selected');
            $('#channel-list-region .active-category').addClass('selected');
          kevent.preventDefault();
          break; 
        case 38: // Up Arrow
          curSelIn = $('#sidebar-region a').index(curSel);
          if(curSelIn == 0){
            moveToPackages(curSel);
          }
          else {
            curCatPos = $('.selected').parent('.category');
            curCatPosFirst = $(curCatPos).parent().children().first();
            if (curCatPosFirst.attr('class') != curCatPos.attr('class') && $('.selected').parent().children().first().hasClass('selected')) {
                curSel = $('.selected');
                $(curSel).removeClass('active selected');
                $(curSel).parent().prev().children().last().addClass('active selected');
                chooseCategory();
                scrollCategory();
              break;
            }
            unSelectNav(curSel);
            selectNav($(curSel).prev('a'));
            $('#sidebar-region a').removeClass('active');
            $(curSel).prev('a').addClass('active');
            $('#sidebar-region .active').removeClass('active');
            $('#sidebar-region .selected').addClass('active');
            chooseCategory();
            scrollCategory();
          }
          kevent.preventDefault();
          break; 
        case 37:  // Left Arrow
          kevent.preventDefault();
          break; 
        case 13:  // Enter Key
      }
    }// endif of sidebar-region .selected
    else if ($("#packages-region .selected").length) {
      switch(kevent.which){
        case 40: // Down Arrow
          moveToSidebar(curSel);
          kevent.preventDefault();
          break; 
        case 39: // Right Arrow
          curSelIn = $('#packages-region li').index(curSel);
          if(curSelIn != ($('#packages-region li').length - 1 )){
            unSelectNav(curSel);
            $('#packages-region .active').removeClass('active');
            $(curSel).next('li').addClass('active selected');
            toggleCategories();
          }
          kevent.preventDefault();
          break; 
        case 38: // Up Arrow
            moveToHeader(curSel);
          kevent.preventDefault();
          break; 
        case 37:  // Left Arrow
          curSelIn = $('#packages-region li').index(curSel);
          if(curSelIn != 0){
            unSelectNav(curSel);
            $('#packages-region .active').removeClass('active');
            
            $(curSel).prev('li').addClass('active selected');
            toggleCategories();

          }
          kevent.preventDefault();
          break; 
        case 13:  // Enter Key
      }
    }// endif of packages-region .selected
    else if ($("#header-region .selected").length > 0)  {
      switch(kevent.which){
        case 40: // Down Arrow
        if ($('#season-episode-container .selected').length && $('.selected').next().length){
          sel = $('.selected');
          nextSel = $('.selected').next();
          $('.episode').removeClass('active-show');
          $('.selected').next().addClass('active-show');
          unSelectNav(sel);

          selectNav(nextSel);
          scrollEpisodes();
        }
        else if ($('.individual-app.selected').length > 0) {
          curSel = $('.individual-app.selected');
          curSelIn = $('.app-container .individual-app').index(curSel);
          var appRowWidth = 8;
          if (curSelIn > ($('.individual-app').length - appRowWidth)){
            unSelectItem(curSel);
            $('.app-container .individual-app:last').addClass('selected');
            scrollApps()
          }
          else {
            unSelectItem(curSel);
            nextApp = (curSelIn + appRowWidth);
            $('.app-container .individual-app').eq(nextApp).addClass('selected');
            scrollApps()
          }
        }
        else {
          if ($('.selected').hasClass('button')){
            moveToMain(curSel);
          }
        }
          kevent.preventDefault();
          break; 
        case 39: // Right Arrow
          if ($('.video-container .selected').length && $('#season-episode-container').length) {
            sel = $('.selected');
            moveToSeasons(sel);
          }
          else if ($('.individual-app.selected').length > 0) {
            curSel = $('.selected');
            if($(curSel).next().length > 0){
              unSelectItem(curSel);
              selectItem($(curSel).next());
              scrollApps()
            }
          }
          kevent.preventDefault();
          break; 
        case 38: // Up Arrow
        if ($('#season-episode-container .selected').length > 0 && $('.selected').prev().length > 0){
          sel = $('.selected');
          nextSel = $('.selected').prev();
          $('.selected').removeClass('active');
          $('.selected').prev().addClass('active');
          unSelectNav(sel);

          selectNav(nextSel);
          scrollEpisodes();
        }
        else if ($('.individual-app.selected').length > 0) {
          curSel = $('.individual-app.selected');
          curSelIn = $('.app-container .individual-app').index(curSel);
          var appRowWidth = 8;
          if (curSelIn < appRowWidth){
            unSelectItem(curSel);
            moveToNav(curSel);
            scrollApps()
          }
          else {
            unSelectItem(curSel);
            nextApp = (curSelIn - appRowWidth);
            $('.app-container .individual-app').eq(nextApp).addClass('selected');
            scrollApps()
          }
        }
        else {
          curSel = $('.individual-app.selected');
          moveToNav(curSel);
        }
          unSelectItem(curSel);
          kevent.preventDefault();
          break; 
        case 37:  // Left Arrow
          if ($('#season-episode-container .selected').length) {
            sel = $('.selected');
            moveToHeader(sel);
          }
          else if ($('.individual-app.selected').length > 0) {
            curSel = $('.selected');
            if($(curSel).prev().length > 0){
              unSelectItem(curSel);
              selectItem($(curSel).prev());
              scrollApps()
            }
          }
          kevent.preventDefault();
          break; 
        case 13: // enter
          if ($('.selected').hasClass('select-episode')){
            sel = $('.selected');
            moveToSeasons(sel);
          }
          else if ($('#season-episode-container .season.selected').length) {
            sel = $('.selected');
            curClass = $('.selected').attr('class');
            curClass = curClass.split(" ");
            curClass = curClass[0];
            $('.seasons-container').hide();
            $('.episodes-container').addClass('open');
            $('.episodes-container .' + curClass).show().addClass('show');
            unSelectNav(sel);
            nextSel = $('.episodes-container .show li:nth-child(2)');
            selectNav(nextSel);
          }
          else if ($('.episodes-container .back.selected').length) {
            sel = $('.selected');
            curClass = $('.episodes-container .back.selected').parent().parent().attr('class');
            curClass = curClass.split(" ");
            curClass = curClass[0];
            $('.episodes-container').removeClass('open');
            $('.episodes-container .show').hide().removeClass('show');
            $('.seasons-container').show();
            unSelectNav(sel);
            nextSel = $('.seasons-container .' + curClass);
            selectNav(nextSel);
          }
          else if ($('.individual-app.selected').length > 0) {
            kevent.preventDefault();
            curApp = $('.selected a').attr('href');
            if (curApp == 'default'){
              curApp = $('.selected a').attr('data-id')
              CDV.WEBINTENT.startActivity({action:"android.intent.action.VIEW", url: "https://play.google.com/store/apps/details?id="+curApp, pkg: "com.android.vending"}, function(test){console.log(test);}, function(test){console.log(test);});
            }
            else {
              CDV.WEBINTENT.startActivity({action:"android.intent.action.MAIN", intenturi: curApp}, function(test){console.log(test);}, function(test){console.log(test);});
            }
          }
          else {
            if ($('.selected').hasClass('play')){
            }
            else {
               $('.selected a').click();
            }
           
          }
          kevent.preventDefault();
      }
    }// endif of header-region .selected 
  });
}); // end document ready

function scrollMainApp(){
  currentPos = $('.selected').offset();
  curScroll = $('.scroller').scrollTop();
  scrolly = (currentPos.top - 750 + curScroll);
  $('.scroller').animate({
     scrollTop: scrolly 
  },
  {
    duration: 600, 
    queue: false
  });
}
function moveToNav(curSel) {
  unSelectItem(curSel);
  selectNav($('nav .active')); 
}
function moveToHeader(curSel) {
  unSelectItem(curSel);
  if ($('header .app').length > 0){
    selectNav($('#header-region .individual-app:first')); 
  }
  else {
    selectNav($('#header-region .button.btn:not(.hidden)')); 
  }
}
function moveToSeasons(curSel) {
  unSelectItem(curSel);
  if ($('.episodes-container .show').length > 0){
    if ($('.episodes-container .show li.active-show').length > 0){
      selectNav($('.episodes-container .show li.active-show')); 
    }
    else {
      selectNav($('.episodes-container .show li:first')); 
    }
  }
  else {
    selectNav($('#season-episode-container .seasons-container li:first')); 
  }
}
function moveToSidebar(curSel) {
  unSelectItem(curSel);
  selectNav($('#sidebar-region a.active')); 
}
function moveToPackages(curSel) {
  unSelectItem(curSel);
  $('#packages-region .category.active').addClass('selected');
}
function moveToMain(curSel) {
  unSelectNav(curSel);
  if ($('.channels-container .channel').hasClass('previous-video')){
    selectItem($('.channels-container .channel.previous-video'));
    $('.channels-container .previous-video').removeClass('previous-video');
  }
  else {
    selectItem($('.channels-container .active-category')); 
  }
}
function selectNav(sel) {
  $(sel).addClass("selected");
  $('.selected').focus();
}
function unSelectNav(sel) {
  $(sel).removeClass("selected");
}
function movesidebar(moveto) {
  $('#sidebar-region .category-name').removeClass('active');
  sidebarClass = $(moveto).parent().attr('class');
  sidebarClass = sidebarClass.split(" ");
  sidebarClass = sidebarClass[1];
  $('#sidebar-region .' + sidebarClass ).addClass('active');
}

function selectItem(sel) {
  $(sel).addClass("selected");
  $('.selected').find('a').hover().focus();
  sidebarClass = $(sel).parent().attr('class');
  sidebarClass = sidebarClass.split(" ");
  sidebarClass = sidebarClass[1];
  if (!$('#sidebar-region .category-name .' + sidebarClass).hasClass('active')){
    $('#sidebar-region .category-name').removeClass('active');
    $('#sidebar-region .' + sidebarClass ).addClass('active');
  }
}
function unSelectItem(sel) {
  $(sel).removeClass("selected");
}
function scrollCategory() {
  currentPos = $('#sidebar-region .active').offset();
  curScroll = $('.sidebar-scroller').scrollTop();
  scrolly = (currentPos.top - 760 + curScroll);
  $('.sidebar-scroller').animate({
     scrollTop: scrolly 
  },
  {
    duration: 600, 
    queue: false
  });
  mainCat = $('#sidebar-region .active').parent().attr('class');
  mainCat = mainCat.split(" ");
  mainCat = mainCat[1];
  $('#packages-region .active').removeClass('active');
  $('#packages-region .' + mainCat).addClass('active');
}
function chooseCategory() {
  sidebarClass = $('#sidebar-region .active').attr('class');
  sidebarClass = sidebarClass.split(" ");
  sidebarClass = sidebarClass[0];
  $('#channel-list-region .channel').removeClass('active-category');
  $('#channel-list-region .' + sidebarClass + ' .channel:first').addClass('active-category');
  
  currentPos = $('#channel-list-region .active-category').offset();
  curScroll = $('.scroller').scrollTop();
  scrolly = (currentPos.top - 721 + curScroll);
  $('.scroller').animate({
     scrollTop: scrolly 
  },
  {
    duration: 600, 
    queue: false
  });
}

function toggleCategories() {
  curSel = $('.selected').attr('class');
  categoryClass = curSel.split(" ");
  categoryClass = categoryClass[1];
  $('#sidebar-region .category').removeClass('active-category');
  $('#sidebar-region .' + categoryClass).addClass('active-category');
  $('#sidebar-region .category .active').removeClass('active');
  $('#sidebar-region .active-category').find('a:first').addClass('active');
  scrollCategory();
  chooseCategory();
}


function scrollEpisodes() {
  currentPos = $('#season-episode-container .selected').offset();
  curScroll = $('#season-episode-container .episodes-container').scrollTop();
  scrolly = (currentPos.top - 303 + curScroll);
  $('#season-episode-container .episodes-container').animate({
     scrollTop: scrolly 
  },
  {
    duration: 300, 
    queue: false
  });
}

function scrollApps() {
  currentPos = $('.app-container .selected').offset();
  curScroll = $('#header-region > .app').scrollTop();
  scrolly = (currentPos.top - 400 + curScroll);
  $('#header-region > .app').animate({
     scrollTop: scrolly 
  },
  {
    duration: 500, 
    queue: false
  });
}

});
