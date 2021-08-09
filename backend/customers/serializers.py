from rest_framework import serializers

from connections.serializers import ConnectionSerializer
from users.serializers import UserSerializer
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    connection = ConnectionSerializer()
    user = UserSerializer()

    class Meta:
        model = Customer
        fields = '__all__'  # ['patient_code', 'connection']
