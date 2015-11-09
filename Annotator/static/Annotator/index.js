var image_url = 'https://cs.stanford.edu/people/rak248/VG_100K/2349753.jpg';
var ctx = myCanvas.getContext('2d');
var img = new Image;
img.onload = function(){
  ctx.drawImage(img,0,0,1000,1000); // Or at whatever offset you like
};
img.src = image_url;


