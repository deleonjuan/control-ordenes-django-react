from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class SellerManager(BaseUserManager):
    def create_user(self, email, username, name, password=None):
        if not email:
            raise ValueError("El correo es requerido")
        if not username:
            raise ValueError("El username es requerido")

        user = self.model(
                email=self.normalize_email(email),
                username=username,
                name=name,
            )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, name, password):
        user = self.create_user(
                email=self.normalize_email(email),
                username=username,
                name=name,
                password=password,
            )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class Seller(AbstractBaseUser):
    email           = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username        = models.CharField(max_length=60, unique=True)
    name            = models.CharField(max_length=60)
    date_joined     = models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login      = models.DateTimeField(verbose_name='last login', auto_now_add=True)
    is_admin        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    is_superuser    = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'name', ]

    objects = SellerManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Product(models.Model):
    # seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='product_seller')
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    description = models.TextField()
    price = models.IntegerField()
    category = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Sale(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='sale_seller')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sale_product')
    # created_date = models.DateTimeField(default=timezone.now)
    
