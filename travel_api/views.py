# backend/travel_api/views.py

from rest_framework import viewsets, generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserSerializer, TravelRequestSerializer
from .models import TravelRequest

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class TravelRequestViewSet(viewsets.ModelViewSet):
    serializer_class = TravelRequestSerializer

    def get_queryset(self):
        user = self.request.user
        # If user is staff (admin), return all requests
        if user.is_staff:
            return TravelRequest.objects.all().order_by('-created_at')
        # Otherwise, return only the user's requests
        return TravelRequest.objects.filter(user=user).order_by('-created_at')

    def get_permissions(self):
        if self.action in ['update', 'partial_update']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]

class UpdateTravelRequestStatusView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def patch(self, request, pk):
        try:
            travel_request = TravelRequest.objects.get(pk=pk)
            status_value = request.data.get('status')

            if status_value not in [choice[0] for choice in TravelRequest.STATUS_CHOICES]:
                return Response({"detail": "Invalid status value"}, status=status.HTTP_400_BAD_REQUEST)

            travel_request.status = status_value
            travel_request.save()

            serializer = TravelRequestSerializer(travel_request)
            return Response(serializer.data)
        except TravelRequest.DoesNotExist:
            return Response({"detail": "Travel request not found"}, status=status.HTTP_404_NOT_FOUND)

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)