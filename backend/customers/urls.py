from django.urls import path

from customers.views import RetrievePatientAPIView

urlpatterns = [
    path('patients/', RetrievePatientAPIView.as_view()),
]
