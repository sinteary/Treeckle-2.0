'''
Serializers are used for request data validation.
Try to use ModelSerializer where possible.
Reference: https://www.django-rest-framework.org/api-guide/serializers/
'''

from authentication.models import User
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['full_name', 'email', 'organisation', 'groups']

class createLocalAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'full_name', 'organisation', 'password']

class loginAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password']

    email = serializers.EmailField()