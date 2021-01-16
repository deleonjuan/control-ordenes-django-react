from rest_framework import serializers
from .models import Product, Sale
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
    
    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.price = validated_data.get('price', instance.price)
    #     instance.category = validated_data.get('category', instance.category)
    #     instance.save()
    #     return instance

    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'category', 'seller')

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'