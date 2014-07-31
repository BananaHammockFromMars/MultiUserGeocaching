function initUSTV(callback){
  console.log('ustvnow');
$.post("http://m.ustvnow.com/iphone/1/live/login", 
   { 
   "username": "jdemeo@myomnibox.com",
   "password": "Demo2013",
   "device": "iphone"
  },
  function (data, status, xhr) {
    if (data) {
      cookies = xhr.getResponseHeader('Set-Cookie');
      if(cookies){
        cookie_pieces = cookies.split(';');
        token_pieces = cookie_pieces[0].split("=");
        token = token_pieces[1];
      }
      if(typeof token === 'undefined'){
        token = 'dxg0brdyfpfhl9yidzyn';
      }
      window.token = token;
      if(typeof callback == 'function'){
        console.log('going in callback()');
        callback();
      }

    } else {
    }
  }
);
}

function omniLiveUSTV() {
  console.log('omniLiveUSTV');
  if(window.token == ""){
    initUSTV(omniLiveUSTV);
    return false;
  }
  $.get("http://m.ustvnow.com/iphone/1/live/playingnow",
  {
    "token" : window.token 
  },
  function (data) {
    if (data) {
      uspage = $.parseHTML(data);
      uschans = $(uspage).filter('.livetv-content-pages');
      window.USTVarray = {};
      $.each(uschans, function(index, value){
        img = $(value).find('img').attr('src');
        img = img.split("/");
        img = img[img.length-1];
        link = $(value).find('div.videonavbar a').attr('href');
        window.USTVarray[img] = link;
      });

    } else {
    }
  }
  );
}

function omniLiveUSTVplay(id){
  idimg = id.attributes.coverImage.primary;
  idimg = idimg.split("/");
  idimg = idimg[idimg.length-1];
  id.attributes.streamUrl.primary = window.USTVarray[idimg];
  return id;
}