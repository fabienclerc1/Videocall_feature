from django.urls import path

from connections.views import SearchDevicesByPatientCodeAPIView, CreateConnectionAPIView, DeleteConnectionAPIView

urlpatterns = [
    path('connections/', SearchDevicesByPatientCodeAPIView.as_view()),
    path('connections/create/', CreateConnectionAPIView.as_view()),
    path('connections/delete/', DeleteConnectionAPIView.as_view())
]
