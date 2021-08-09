from rest_framework import status
from rest_framework.generics import ListAPIView, GenericAPIView, get_object_or_404, DestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from connections.models import Connection
from connections.serializers import ConnectionSerializer


class SearchDevicesByPatientCodeAPIView(ListAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        patient_code = request.query_params.get('search')
        queryset = self.get_queryset().filter(customer__patient_code__contains=patient_code)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CreateConnectionAPIView(GenericAPIView):
    serializer_class = ConnectionSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        customer = self.request.user.customer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(customer=customer)
        return Response(serializer.data)


class DeleteConnectionAPIView(DestroyAPIView):
    serializer_class = ConnectionSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = Connection.objects.all()
        connection = queryset.filter(socket_id=request.data['socket_id'])
        connection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
