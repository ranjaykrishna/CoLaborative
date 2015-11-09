$(function() {
  //start pulling annotations from server every second
  setInterval(getAnnotations, 1000);

  //load the image
  var image_url = 'https://cs.stanford.edu/people/rak248/VG_100K/2349753.jpg';
  var ctx = myCanvas.getContext('2d');
  var img = new Image;
  img.onload = function() {
    ctx.drawImage(img,0,0,1000,1000); // Or at whatever offset you like
  };
  img.src = image_url;
});

function addAnnotations(annotations) {
  for(var i=0; i<annotations.length; i++) {
    var an = annotations[i];
    addAnnotation(an);
  }
}

function addAnnotation(annotation) {
    var annotationdiv = "<div class='annotation'><div></div><div class='isResizable' style='top:" + annotation.y + "; left:" + annotation.x + "; width:" + annotation.w + "; height:" + annotation.h + "'></div>";
    console.log("Adding: "+annotation);
	$("#annotation_container").append(annotation);
}
