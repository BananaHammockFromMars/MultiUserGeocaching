updateURL = 'https://d1z0jgulzc5gd9.cloudfront.net/omniboxtv.json';
thisApp = 'OmniboxTV';
function checkUpdate(){
    if (typeof cordova != 'undefined'){
        cordova.getAppVersion().then(function (version) {
        $.getJSON(updateURL, {},
          function (data) {
            if (data) {
              if(data.currentversion != version){
            doUpdate(data);
              }
            }
          }
        );
      });
    }
}


function doUpdate(data){
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
    fileTransfer = new FileTransfer();
    fileTransfer.download(data.downloadURL, fileSystem.root.toURL() + thisApp + data.currentversion + ".apk", function(entry) {
        CDV.WEBINTENT.startActivity({
            action: CDV.WEBINTENT.ACTION_VIEW,
            url: entry.nativeURL,
            type: 'application/vnd.android.package-archive'
            },
            function(){},
            function(e){
                alert('Error launching app update');
            }
        );

    }, function (error) {
        alert("Error downloading APK: " + error.code);
  });
}, function(evt){
alert("Error preparing to download apk: " + evt.target.error.code);
});
}
