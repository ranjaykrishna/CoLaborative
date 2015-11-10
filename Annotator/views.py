from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
import json

from Annotator.models import Annotation

def index(request):
    return render_to_response('Annotator/index.html')

def getAnnotations(request):
    data = []
    for a in Annotation.objects.all():
      data.append({'id':a.id, 'text': a.text, 'x': a.x, 'y': a.y, 'w': a.w, 'h': a.x, 'upVotes': a.upVotes, 'downVotes': a.downVotes})
    return HttpResponse(json.dumps(data), content_type="application/json")

def editAnnotation(request):
    annotationId = request.REQUEST.get("id", -1)

    #get the annotation, or create a new one if it doesnt exist
    try:
        annotation = Annotation.objects.get(id=annotationId)
    except ObjectDoesNotExist:
        annotation = Annotation()

    annotation.x = request.REQUEST.get("x", 0)
    annotation.y = request.REQUEST.get("y", 0)
    annotation.w = request.REQUEST.get("w", 0)
    annotation.h = request.REQUEST.get("h", 0)

    annotation.text = request.REQUEST.get("text", "")

    annotation.upVotes = request.REQUEST.get("upVotes", 0)
    annotation.downVotes = request.REQUEST.get("downVotes", 0)

    annotation.save()
    return HttpResponse("true", content_type="application/json")
