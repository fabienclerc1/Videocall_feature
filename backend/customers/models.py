from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Customer(models.Model):
    patient_code = models.TextField(null=True)
    isPatient = models.BooleanField(default=False)
    isPhysician = models.BooleanField(default=False)
    isContact = models.BooleanField(default=False)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='customer')
    created_by = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name='users_created')
