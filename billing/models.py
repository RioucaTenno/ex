from django.db import models

class Tariff(models.Model):
    name = models.CharField(max_length=100)
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
