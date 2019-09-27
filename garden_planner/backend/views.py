from rest_framework import generics
from .models import Plant, SquareFootLayout
from .serializers import PlantSerializer, SquareFootLayoutSerializer


class PlantList(generics.ListAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer


class SquareFootLayoutList(generics.ListAPIView):
    queryset = SquareFootLayout.objects.all()
    serializer_class = SquareFootLayoutSerializer
