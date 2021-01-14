from rest_framework import serializers
from .models import Seller, Product, Sale

class SellerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Seller
        fields = '__all__'#('name', 'username')

class ProductSerializer(serializers.HyperlinkedModelSerializer):
    # seller = SellerSerializer(required=False)
    class Meta:
        model = Product
        fields = ('id', 'name', 'description', 'price', 'category')

class SaleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'