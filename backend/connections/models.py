from django.contrib.auth import get_user_model
from django.db import models

from customers.models import Customer

User = get_user_model()


class Connection(models.Model):
    socket_id = models.TextField()
    status = models.TextField(default='available')
    customer = models.OneToOneField(to=Customer, null=True, on_delete=models.CASCADE, related_name='connection')
