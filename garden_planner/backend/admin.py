from django.contrib import admin
from django.forms.widgets import CheckboxSelectMultiple
from django.db import models
from .models import Plant, SquareFootLayout


@admin.register(Plant)
class PlantAdmin(admin.ModelAdmin):
    exclude = []
    formfield_overrides = {
        models.ManyToManyField: {'widget': CheckboxSelectMultiple},
    }


@admin.register(SquareFootLayout)
class SquareFootLayoutAdmin(admin.ModelAdmin):
    exclude = []
