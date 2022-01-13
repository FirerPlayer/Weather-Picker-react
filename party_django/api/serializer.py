from rest_framework.serializers import ModelSerializer
from .models import Room


class RoomToJson(ModelSerializer):
    class Meta:
        model = Room
        fields = ("id", "code", "host", "g_can_pause", "votes", "create_at")
