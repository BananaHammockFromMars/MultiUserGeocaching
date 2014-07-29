function initFilmOn(callback) {
  //console.log('filmon');
$.getJSON("http://www.filmon.com/tv/api/init", {},
  function (data) {
    if (data) {
      window.session_key = data.session_key; 
      if(typeof callback == 'function'){
        callback();
      }
    } else {
    }
  }
);
}

function getStream(chanid) {
      if(window.session_key == ""){
        initFilmOn(function(){getStream(chanid)});
        return false;
      }
$.getJSON("http://www.filmon.com/tv/api/channel/" + chanid + "?session_key=" + window.session_key, { },
  function (data) {
    if (data) {
      window.streams = data.streams; 
      response = JSON.stringify(data.streams, null, 4);
      stream = data.streams[1];
      protocol = stream.url.split(":");
      query = protocol[1].split("?");
      newurl = "http:" + query[0] + stream.name + "/playlist.m3u8?" + query[1];
      $("body #vid").remove();
      video = "<video class='filmon' id='vid' width='5px' height='5px' src='" + newurl + "' ></video>";
      $(".hidden-video").append(video);
      curVideo = document.getElementById('vid');
      $(curVideo)[0].play();
    } else {
      initFilmOn();
    }
  }
);
}