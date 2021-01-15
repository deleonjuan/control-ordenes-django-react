from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import User


class Product(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products", null=True) 
    name = models.CharField(max_length=60)
    description = models.TextField()
    price = models.IntegerField()
    category = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Sale(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sale_seller')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sale_product')
    # created_date = models.DateTimeField(default=timezone.now)