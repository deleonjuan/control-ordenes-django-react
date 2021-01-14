from django.db import models
from django.utils import timezone

class Seller(models.Model):
    name = models.CharField(max_length=60)
    nick = models.CharField(max_length=60)

    def __str__(self):
        return self.name

class Product(models.Model):
    #seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='product_seller')
    seller = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    description = models.TextField()
    price = models.IntegerField()
    category = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Sale(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='sale_seller')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sale_product')
    # created_date = models.DateTimeField(default=timezone.now)
    
