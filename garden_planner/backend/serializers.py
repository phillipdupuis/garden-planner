from rest_framework import serializers
from .models import Plant, SquareFootLayout


class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = '__all__'


class SquareFootLayoutSerializer(serializers.ModelSerializer):
    fill = serializers.SerializerMethodField()

    class Meta:
        model = SquareFootLayout
        fields = '__all__'

    def get_fill(self, obj):
        return obj.get_fill()
