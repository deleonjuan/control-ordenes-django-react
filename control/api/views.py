from rest_framework import viewsets, permissions
from .serializers import ProductSerializer, SaleSerializer
from .models import Product, Sale

# class SellerViewSet(viewsets.ModelViewSet):
#     queryset = Seller.objects.all().order_by('id')
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = SellerSerializer

class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ProductSerializer

    def get_queryset(self):
        return self.request.user.products.all()

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer