from django.urls import path
from core import views

urlpatterns = [
    path(r'opener', views.Opener.as_view(), name='opener'),
    path(r'files/<int:file_pk>', views.Files.as_view(), name='files'),
    path(r'chunked_upload', views.ChunkedUpload.as_view(), name='chunked_upload'),
]
