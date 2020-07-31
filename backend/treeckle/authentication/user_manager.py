from django.contrib.auth.base_user import BaseUserManager
from treeckle.common import organisations, user_types

class UserManager(BaseUserManager):
    def create_user(self, email, full_name, user_type, organisation=organisations.UNASSIGNED, password=None, **extra_fields):
        normalized_email = self.normalize_email(email)

        new_user = self.model(
            email=email,
            full_name=full_name,
            user_type=user_type,
            organisation=organisation,
            **extra_fields,
        )

        if user_type == user_types.CUSTOM and password:
             new_user.set_password(password)
        else:
            new_user.set_unusable_password()
        
        new_user.save()
        return new_user
    
    def create_superuser(self, email, full_name, organisation, user_type, password):
        extra_fields = {
            'is_staff': True,
            'is_superuser': True,
            'is_active': True,
        }

        if user_type == user_types.NUSNET:
            raise ValueError('Superuser account cannot be an NUS account')
        
        self.create_user(
            email=email,
            full_name=full_name,
            user_type=user_types.CUSTOM,
            organisation=organisation,
            password=password,
            **extra_fields
        )
