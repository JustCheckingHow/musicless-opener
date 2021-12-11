from django.urls import path
from core import views

urlpatterns = [
    path(r'open', views.open.as_view(), name='open'),
]
