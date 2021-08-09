from django.contrib.auth.models import AbstractUser
from django.db import models

from project import settings


def user_directory_path(instance, filename):
    return f'{instance.username}/{filename}'


class User(AbstractUser):

    USERNAME_FIELD = 'username'
    #REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=False, null=True)

    def __str__(self):
        return self.username
