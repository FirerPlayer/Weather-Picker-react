from .views import RoomView, index
from django.urls import path

urlpatterns = [path("home", RoomView.as_view()), path("", index)]
