from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from treeckle.common import organisations
from treeckle.common import user_types
from authentication.user_manager import UserManager
from django.utils import timezone

"""
Custom User model for Treeckle
Reference: https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#substituting-a-custom-user-model
"""
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=200)
    user_type = models.CharField(
        max_length=20,
        choices=user_types.USER_TYPES,
        blank=False,
        default=user_types.CUSTOM,
    )
    organisation = models.CharField(
        max_length=100,
        choices=organisations.ORGANISATIONS,
        blank=False,
        default=organisations.UNASSIGNED,
    )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'user_type', 'organisation']

