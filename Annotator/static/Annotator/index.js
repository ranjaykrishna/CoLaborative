var MODE_VERIFIED = "VERIFIED";
var MODE_EDIT = "EDIT";
var MODE_INCORRECT = "INCORRECT";

var VERIFIED_THRESHOLD = 3;
var INCORRECT_THRESHOLD = -3;

$(function() {
    //register event handlers
    $("#aImg").mousedown(function(mevent){
        //create div
        addAnnotation(-1,mevent.offsetX, mevent.offsetY, 50, 50, "default", 0, 0);

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
    //does the annotation exist?
    if ($('#annotation_'+id).length == 0){
        //create a new id if it doesnt have one
        if (id == -1) {
            var id = $('.isResizable').length;
        }

        //create a new annotation
        var annotation = "<div id='annotation_"+id+"' class='isResizable'></div>";
        $("#annotation_container").append(annotation);

        $('#annotation_'+id).draggable().resizable();
        $('#annotation_'+id).on('dragstop', function(e){dropAnnotation(e)});

        fillAnnotation($('#annotation_'+id));
    }

    //change the css of the annotation
    var annotation = $('#annotation_'+id);

    annotation.css({top: y, left: x, width:w, height:h});

    annotation.attr("upVotes", upVotes);
    annotation.attr("downVotes", downVotes);
}

function dropAnnotation(e){
    console.log("Dropping annotation..");
    console.log(e);
}



function fillAnnotation(annotation) {
    annotation.append("<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-chevron-up'></span></button>");
    annotation.append("<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-chevron-down'></span></button>");
    annotation.append("<input type='text'>");
}