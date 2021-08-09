from rest_framework import serializers

from connections.models import Connection
from customers.models import Customer


class CustomerNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['user']


class ConnectionSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    def get_first_name(self, instance):
        return instance.customer.user.first_name

    def get_last_name(self, instance):
        return instance.customer.user.last_name

    class Meta:
        model = Connection
        fields = '__all__'
