from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Plant, SquareFootLayout
from .serializers import (
    PlantSerializer,
    SquareFootLayoutSerializer,
    UserSerializer,
    UserSerializerWithToken,
)


class PlantList(generics.ListAPIView):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class SquareFootLayoutList(generics.ListAPIView):
    queryset = SquareFootLayout.objects.all()
    serializer_class = SquareFootLayoutSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


@api_view(['GET'])
def current_user(request):
    """ Determine the current user by their token, and return their data.
        Consider changing this to generics.RetrieveApiView?"""
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(generics.ListCreateAPIView):
    """ Trying to do it my own way. Might have to revert this."""
    queryset = User.objects.all()
    serializer_class = UserSerializerWithToken
    permission_classes = [permissions.AllowAny]
