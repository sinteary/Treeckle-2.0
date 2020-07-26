from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from authentication.models import User
from treeckle.common import user_types

class UserAdmin(BaseUserAdmin):
    def get_readonly_fields(self, request, obj=None):
        # restrict admin password modifications for openID users (since they don't have a password...)
        if obj:
            if obj.user_type != user_types.CUSTOM:
                return self.readonly_fields + ('is_staff', 'password')
            else:
                return self.readonly_fields + ('is_staff',)
        return self.readonly_fields

    readonly_fields = ('user_type',)

    fieldsets = [
        ('Particulars', {'fields': ['email', 'full_name', 'user_type', 'password']}),
        ('Organisations', {'fields': ('organisation',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    ]

    add_fieldsets = [
        (None, {
        'classes': ('wide',),
        'fields': ('email', 'full_name', 'password', 'is_staff', 'user_type'),
        }),
    ]

    list_display = ('email', 'full_name', 'organisation', 'user_type', 'is_staff', 'is_active', 'date_joined')
    ordering = ('email',)

