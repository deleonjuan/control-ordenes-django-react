from rest_framework import serializers
from .models import Seller, Product, Sale
from django.contrib.auth.models import User

class SellerSerializer(serializers.HyperlinkedModelSerializer):
    # products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())
    # owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Seller
        fields = '__all__'#('name', 'username')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    # seller = SellerSerializer(required=False)
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'category', 'seller')

class SaleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'