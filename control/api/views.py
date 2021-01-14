from rest_framework import viewsets, permissions
from .serializers import SellerSerializer, ProductSerializer, SaleSerializer
from .models import Seller, Product, Sale

class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all().order_by('id')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SellerSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer