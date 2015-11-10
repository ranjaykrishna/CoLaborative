// Code to handle mode
var MODE_VERIFIED = "VERIFIED";
var MODE_EDIT = "EDIT";
var MODE_INCORRECT = "INCORRECT";
var verifyClicked = function() {
  filter("VERIFIED");
  $('#verified').removeClass('btn-info').addClass('btn-primary');
  $('#edit').addClass('btn-info').removeClass('btn-primary');
  $('#incorrect').addClass('btn-info').removeClass('btn-primary');
}
var editClicked = function() {
  filter("EDIT");
  $('#verified').addClass('btn-info').removeClass('btn-primary');
  $('#edit').removeClass('btn-info').addClass('btn-primary');
  $('#incorrect').addClass('btn-info').removeClass('btn-primary');
}
var incorrectClicked = function() {
  filter("INCORRECT");
  $('#verified').addClass('btn-info').removeClass('btn-primary');
  $('#edit').addClass('btn-info').removeClass('btn-primary');
  $('#incorrect').removeClass('btn-info').addClass('btn-primary');
}

var VERIFIED_THRESHOLD = 3;
var INCORRECT_THRESHOLD = -3;

$(function() {
    //get from server every second
    setInterval(getAnnotations, 1000);

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
            var ups = parseInt(annotationdiv.attr("upVotes"));
            var downs = parseInt(annotationdiv.attr("downVotes"));
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
        $('#annotation_'+id).on('dragstop', function(e){editAnnotation(e)});

        fillAnnotation(id);
    }

    //change the css of the annotation
    var annotation = $('#annotation_'+id);

    annotation.css({top: y, left: x, width:w, height:h});

    annotation.attr("upVotes", upVotes);
    annotation.attr("downVotes", downVotes);

    $("#text_"+id).val(text);
    upDownVote(id, 0);

    $(".isResizable").draggable().resizable(function(e){ console.log("resizing"); console.log(e); });
    $('.isResizable').on('mousedrop', function(e){editAnnotation(e);});
    //$('.isResizable').on('resize', function(e){editAnnotation(e);});

    editAnnotationByID(id);
}

function editAnnotation(e){
    /* send the annotation to the server */
    console.log("Dropping annotation..");
    var n_id = e.currentTarget.id.substring(11);
    editAnnotationByID(n_id);
}

function editAnnotationByID(id) {
    var annotation = $("#annotation_"+id);
    var y = parseInt(annotation.css("top").replace("px", ""));
    var x = parseInt(annotation.css("left").replace("px", ""));
    var w = parseInt(annotation.css("width").replace("px", ""));
    var h = parseInt(annotation.css("height").replace("px", ""));

    var desc = $("#text_"+id).val();
    var ups = parseInt(annotation.attr("upVotes"));
    var downs = parseInt(annotation.attr("downVotes"));

    /* send the annotation to the server */
    sendAnnotation(id, x, y, h, w, desc, ups, downs);
}


function upDownVote(id, vote) {
    var annotation=$("#annotation_"+id);
    var ups = parseInt(annotation.attr("upVotes"));
    var downs = parseInt(annotation.attr("downVotes"));

    if (vote > 0) {
        ups += 1
    }else if(vote < 0) {
        downs += 1
    }
    annotation.attr("upVotes", ups);
    annotation.attr("downVotes", downs);

    var total = ups - downs;
    $("#upvotecount_"+id).text(total);
}

function fillAnnotation(id) {
    var annotation=$("#annotation_"+id);
    annotation.append("<button id='upvote_"+id+"' type='button' class='btn btn-default'><span class='glyphicon glyphicon-chevron-up'></span><span id='upvotecount_"+id+"'>0</span></button>");
    annotation.append("<button id='downvote_"+id+"' type='button' class='btn btn-default'><span class='glyphicon glyphicon-chevron-down'></span></button>");
    annotation.append("<input id='text_"+id+"' type='text'>");

    $("#upvote_"+id).click(function() {
        upDownVote(id, 1);
        editAnnotationByID(id);
    });
    $("#downvote_"+id).click(function() {
        upDownVote(id, -1);
        editAnnotationByID(id);
    });
    $("#text_"+id).on('input', function() {
        editAnnotationByID(id);
    });
}
