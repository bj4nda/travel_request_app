# backend/travel_api/admin.py

from django.contrib import admin
from .models import TravelRequest

@admin.register(TravelRequest)
class TravelRequestAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'destination', 'departure_date', 'return_date', 'status', 'created_at')
    list_filter = ('status', 'departure_date', 'destination')
    search_fields = ('full_name', 'email', 'destination')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('User Information', {
            'fields': ('user', 'full_name', 'email', 'phone')
        }),
        ('Travel Details', {
            'fields': ('destination', 'purpose', 'departure_date', 'return_date')
        }),
        ('Requirements', {
            'fields': ('accommodations_required', 'transportation_required', 'estimated_cost')
        }),
        ('Status', {
            'fields': ('status',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )