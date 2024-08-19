from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
#from django.contrib.auth.hashers import check_password
from .models import Donor, DeliveryStaff
from .serializers import DeliveryStaffSerializer, DonorLoginSerializer, DeliveryStaffLoginSerializer, DonorSerializer

class DonorCreateView(generics.CreateAPIView):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer

class DeliveryStaffCreateView(generics.CreateAPIView):
    queryset = DeliveryStaff.objects.all()
    serializer_class = DeliveryStaffSerializer


class DonorLoginView(APIView):
    def post(self, request):
        serializer = DonorLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeliveryStaffLoginView(APIView):
    def post(self, request):
        serializer = DeliveryStaffLoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
