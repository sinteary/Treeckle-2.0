from django.contrib import admin
from authentication.user_admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)