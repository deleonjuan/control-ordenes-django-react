from rest_framework import viewsets
from .serializers import SellerSerializer, ProductSerializer, SaleSerializer
from .models import Seller, Product, Sale

class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all().order_by('id')
    serializer_class = SellerSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer