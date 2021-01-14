from rest_framework import serializers
from .models import Seller, Product, Sale

class SellerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Seller
        fields = ('name', 'nick')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    seller = SellerSerializer(required=False)

    class Meta:
        model = Product
        fields = '__all__'

class SaleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'