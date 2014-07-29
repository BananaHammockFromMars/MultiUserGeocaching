function preloadImages() {

  if (document.images) {
    img1 = new Image();
    img2 = new Image();
    img3 = new Image();

    img1.src = "img/selected-menu.png";
    img2.src = "img/play-pause.png";
    img3.src = "img/loading.gif";
    console.log('preloaded image');
  }
}