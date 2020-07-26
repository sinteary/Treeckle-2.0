from django.db import models
from django.contrib.auth.models import AbstractUser


"""
Custom User model for Treeckle
Reference: https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#substituting-a-custom-user-model
"""
class User(AbstractUser):
    pass

