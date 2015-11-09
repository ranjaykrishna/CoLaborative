from django.conf.urls import patterns, url
from Annotator import views

urlpatterns = patterns('',
					   #/
					   url(r'^$', views.index, name='index'),
                       url(r'^$', views.getAnnotations, name='getAnnotations'),
                       url(r'^$', views.editAnnotation, name='editAnnotation'),
)