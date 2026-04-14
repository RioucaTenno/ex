from django.db import models

class Computer(models.Model):
    name = models.CharField(max_length=50)
    status = models.CharField(max_length=30)
