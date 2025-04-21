# backend/travel_api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import TravelRequest

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class TravelRequestSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = TravelRequest
        fields = '__all__'
        read_only_fields = ('user', 'status', 'user_username')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)