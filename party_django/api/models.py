from django.db import models
from random import choices
from string import ascii_uppercase


def code_gen():
    length = 4
    while True:
        code = "".join(choices(ascii_uppercase), k=length)
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=4, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    g_can_pause = models.BooleanField(null=False, default=False)
    votes = models.IntegerField(null=False, default=1)
    create_at = models.DateTimeField(auto_now_add=True)
