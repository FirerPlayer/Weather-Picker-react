from django.shortcuts import render
from rest_framework import generics
from .models import Room
from .serializer import RoomToJson

# Create your views here.


def index(request):
    return render(request, "index.html")


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomToJson
