from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Product, Sale

# admin.site.register(Seller)
admin.site.register(Product)
admin.site.register(Sale)
