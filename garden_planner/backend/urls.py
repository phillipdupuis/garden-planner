from django.urls import path
from . import views


app_name = 'backend'
urlpatterns = [
    path('plants/', views.PlantList.as_view(), name='plants'),
    path('layouts/', views.SquareFootLayoutList.as_view(), name='layouts'),
]
