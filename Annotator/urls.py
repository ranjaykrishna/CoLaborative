from django.conf.urls import patterns, url
from Annotator import views

urlpatterns = patterns('',
					   #/
					   url(r'^$', views.index, name='index'),
                       url(r'^getAnnotations$', views.getAnnotations, name='getAnnotations'),
                       url(r'^editAnnotation$', views.editAnnotation, name='editAnnotation'),
)