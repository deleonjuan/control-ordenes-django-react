from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet, basename='products')
router.register(r'sales', views.SaleViewSet, basename='sales')

urlpatterns = [
    path('', include(router.urls)),
    path('allproducts', views.AllProductViewSet.as_view()),
    path('allproducts/user/', views.AllProductFromUser.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest-framework')),
    # path('api-token-auth/', v.obtain_auth_token, name='api-token-auth'),
]