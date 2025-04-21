# backend/travel_api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, TravelRequestViewSet, UpdateTravelRequestStatusView, CurrentUserView

router = DefaultRouter()
router.register(r'travel-requests', TravelRequestViewSet, basename='travel-request')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('current-user/', CurrentUserView.as_view(), name='current-user'),
    path('travel-requests/<int:pk>/update-status/', UpdateTravelRequestStatusView.as_view(), name='update-travel-request-status'),
]