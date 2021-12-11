from django.urls import path
from core import views

urlpatterns = [
    path(r'opener', views.Opener.as_view(), name='opener'),
    path(r'files/<int:file_pk>', views.Files.as_view(), name='files'),
    path(r'file_contents/<int:file_pk>', views.FileContents.as_view(), name='file_contents'),
    path(r'chunked_upload', views.ChunkedUpload.as_view(), name='chunked_upload'),
    path(r'signature/<int:file_pk>', views.Signature.as_view(), name='signature')
]
