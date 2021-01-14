from django.urls import include, path
from rest_framework import routers
from . import views
# from rest_framework.authtoken import views as v

router = routers.DefaultRouter()
# router.register(r'sellers', views.SellerViewSet)
router.register(r'products', views.ProductViewSet, basename='products')
router.register(r'sales', views.SaleViewSet, basename='sales')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest-framework')),
    # path('api-token-auth/', v.obtain_auth_token, name='api-token-auth'),
]