from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from .serializers import ProductSerializer, SaleSerializer
from .models import Product, Sale

class AllProductViewSet(generics.ListAPIView):
    serializer_class = ProductSerializer
    def get_queryset(self):
        return Product.objects.all()


class AllProductFromUser(generics.ListAPIView):
    serializer_class = ProductSerializer
    def get_queryset(self):
        # id_user = self.kwargs['id']
        id_user = self.request.query_params.get('id', None)
        return Product.objects.filter(seller=id_user)


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

    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = SaleSerializer

    def get_queryset(self):
        return self.request.user.sales.all()

    def perform_create(self, serializer):
        serializer.save()

    # queryset = Sale.objects.all()