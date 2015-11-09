from django.conf.urls import patterns, url
from Annotator import views

urlpatterns = patterns('',
					   #/
					   url(r'^$', views.index, name='index'),
)