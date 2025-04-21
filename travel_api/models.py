# backend/travel_api/models.py

from django.db import models
from django.contrib.auth.models import User

class TravelRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='travel_requests')
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    departure_date = models.DateField()
    return_date = models.DateField()
    destination = models.CharField(max_length=255)
    purpose = models.TextField()
    accommodations_required = models.BooleanField(default=False)
    transportation_required = models.BooleanField(default=False)
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name}'s travel request to {self.destination}"