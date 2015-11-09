var MODE_VERIFIED = "VERIFIED";
var MODE_EDIT = "EDIT";
var MODE_INCORRECT = "INCORRECT";

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

function filter(mode) {
    $('[id^="content_"]').each(function(index) {
        var annotationdiv = $(this);

        if (mode == MODE_EDIT) {
            annotationdiv.show();
        } else {
            var ups = annotationdiv.attr("upVotes");
            var downs = annotationdiv.attr("downVotes");
            var total = ups - downs;

            if (mode == MODE_VERIFIED) {
                if (total >= VERIFIED_THRESHOLD) {
                    annotationdiv.show();
                }else {
                    annotationdiv.hide();
                }
            }
            else if (mode == MODE_INCORRECT) {
                if (total <= INCORRECT_THRESHOLD) {
                    annotationdiv.show();
                }else {
                    annotationdiv.hide();
                }
            }
        }
    });
}

function addAnnotation(id,x,y,w,h,text,upVotes,downVotes) {
    if ($('#annotation_'+id).length == 0){
        if (id == -1) {
            var id = $('.isResizable').length;
        }
        var annotation = "<div id='annotation_"+id+"' class='isResizable'></div>";
        $("#annotation_container").append(annotation);
    }

    var annotation = $('#annotation_'+id);

    annotation.css({top: y, left: x, width:w, height:h});

    annotation.attr("upVotes", upVotes);
    annotation.attr("downVotes", downVotes);
}

