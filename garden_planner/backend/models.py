from django.db import models
from django.conf import settings
import json


class SquareFootLayout(models.Model):
    rows = models.PositiveSmallIntegerField()
    cols = models.PositiveSmallIntegerField()
    fill = models.CharField(max_length=500, default='all')

    def __str__(self):
        return f'{self.rows} x {self.cols}, fill {self.fill}'

    def all_points(self):
        return [[row, col] for row in range(self.rows) for col in range(self.cols)]

    def set_fill(self, value):
        self.fill_rows = json.dumps(value)

    def get_fill(self):
        if self.fill == 'all':
            return self.all_points()
        else:
            return json.loads(self.fill)


class Plant(models.Model):
    name = models.CharField(max_length=100)
    name_plural = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    layouts = models.ManyToManyField(
        SquareFootLayout,
        related_name='plants',
    )
    good_neighbors = models.ManyToManyField('self', blank=True)
    bad_neighbors = models.ManyToManyField('self', blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Garden(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True,
        default=None,
    )
    last_edited_at = models.DateTimeField(auto_now=True)


class Plot(models.Model):
    row = models.PositiveSmallIntegerField('row')
    col = models.PositiveSmallIntegerField('column')
    # planting_date -- add this in the future
    garden = models.ForeignKey(
        Garden,
        on_delete=models.CASCADE,
        related_name='plots',
        related_query_name='plot',
    )
    plant = models.ForeignKey(
        Plant,
        on_delete=models.CASCADE,
        related_name='plots',
        null=True,
        blank=True,
    )
    layout = models.ForeignKey(
        SquareFootLayout,
        on_delete=models.CASCADE,
        related_name='plots',
        null=True,
        blank=True,
    )