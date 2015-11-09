from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'CoLaborative.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', include('Annotator.urls', namespace="annotator")),
    url(r'^admin/', include(admin.site.urls)),

)
