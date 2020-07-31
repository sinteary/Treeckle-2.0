from authentication.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from authentication.serializers import UserSerializer
from authentication.jwt_functions import get_tokens_for_user
from authentication.user_manager import UserManager
from treeckle.common import organisations, user_types
from authentication.models import User
from rest_framework import status


class UserDetail(APIView):
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404
    
    def get(self, request, user_id):
        user = get_user(user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class createLocalAccount(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        email = request.data.get('email')
        full_name = request.data.get('full_name')
        password = request.data.get('password')
        organisation = request.data.get('organisation')

        user_exists = User.objects.filter(email=email).exists()

        if not serializer.is_valid():
            print("hello")
        
        if not serializer.is_valid() or user_exists:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            User.objects.create_user(
                email=email,
                password=password,
                full_name=full_name,
                organisation=organisation,
                user_type=user_types.CUSTOM,
            )
            return Response({ "error": 0 }, status=status.HTTP_201_CREATED)


class localLogin(APIView):
    def get(self, request, format=None):
        print(request)
        return Response("hi2")


class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = { 'message': 'hello world' }
        return Response(content)