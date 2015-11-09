from django.shortcuts import render_to_response
from django.http import HttpResponse
from Annotator.models import Annotation
from django.core import serializers

def index(request):
    return render_to_response('Annotator/index.html')

def getAnnotations(request):
    data = serializers.serialize("json", Annotation.objects.all())
    return HttpResponse(data, content_type="application/json")