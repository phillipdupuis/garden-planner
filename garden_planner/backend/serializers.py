from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User
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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class UserSerializerWithToken(serializers.ModelSerializer):
    """ Used for handling sign-ups. Returns the user data plus a token."""
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['token', 'username', 'email', 'password']

    def get_token(self, obj):
        payload = api_settings.JWT_PAYLOAD_HANDLER(obj)
        token = api_settings.JWT_ENCODE_HANDLER(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
