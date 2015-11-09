
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function sendAnnotation(){
    var csrftoken = getCookie('csrftoken');
    var t_id, t_x, t_y, t_h, t_w, t_description;

    /* make the asychronous call */
    $.ajax({
        type: "POST",
        url: "/editAnnotation/",
        data: {id: t_id, x: t_x, y: t_y, h: t_h, w: t_w, description: t_description, csrfmiddlewaretoken: csrftoken},
        fail: function(data){
            /* TODO: Revert the change on the front end. */
        }
    });
}

function getAnnotations(){
    var csrftoken = getCookie('csrftoken');

    /* make the asychronous call */
    $.ajax({
        type: "GET",
        url: "/getAnnotations/",
        data: {csrfmiddlewaretoken: csrftoken},
        success: function (data) {
            /* TODO: Parse the JSON into SVG elements. */

        }
    });
}