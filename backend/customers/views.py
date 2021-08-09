from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from customers.models import Customer
from customers.serializers import CustomerSerializer


class RetrievePatientAPIView(GenericAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [AllowAny]  # TODO only allow physicians to request list of their patients

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(isPatient=True)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
