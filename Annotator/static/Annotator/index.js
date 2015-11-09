var mode = 'EDIT'; // Modes are VERIFIED, EDIT and INCORRECT
var VERIFIED_THRESHOLD = 3;
var INCORRECT_THRESHOLD = -3;
// TODO: Remove this later
var annotations = [{'id': 1, 'text': 'lawrence', 'x': 20, 'y': 20, 'w': 20, 'h': 30, 'upVotes': 3, 'downVotes': 1}];
var isDragged = false;

$(function() {
    //register event handlers
    $("#aImg").mousedown(function(mevent){
        //create div
        addAnnotation(1,mevent.x, mevent.y, 10, 10, "default", 0, 0);

    });

    //mouse up
    $("#aImg").mouseup(function(mevent){
        //send update to server

    });
});

function syncAnnotations(server_annotations) {
    annotations = server_annotations;

    for (var i=0; i<annotations.length; i++) {
        var an = annotations[i];
        addAnnotation(an.id, an.x, an.y, an.w, an.h, an.text, an.upVotes, an.downVotes);
    }
}

function render() {
    for (var i=0; i<annotations.length; i++) {
        var an = annotations[i];
        if (mode == 'VERIFIED' && an['upVotes'] - an['downVotes'] >= VERIFIED_THRESHOLD) {
            addAnnotation(an.id, an.x, an.y, an.w, an.h, an.text, an.upVotes, an.downVotes);
        } else if (mode == 'INCORRECT' && an['upVotes'] - an['downVotes'] <= INCORRECT_THRESHOLD) {
            addAnnotation(an.id, an.x, an.y, an.w, an.h, an.text, an.upVotes, an.downVotes);
        } else if (mode == 'EDIT') {
            addAnnotation(an.id, an.x, an.y, an.w, an.h, an.text, an.upVotes, an.downVotes);
        }
    }
}

function addAnnotation(id,x,y,w,h,text,up,down) {
    if ($('#annotation_'+id).length == 0){
        if (id == -1) {
            var id = $('.isResizable').length;
        }
        var annotation = "<div id='annotation_"+id+"' class='isResizable'></div>";
        $("#annotation_container").append(annotation);
    }

    var annotation = $('#annotation_'+id);

    annotation.css({top: y, left: x, width:w, height:h});
}

