from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from treeckle.common import organisations, user_types, api_responses
from treeckle.common.api_responses import (
    create_ok_response,
    create_bad_request_response,
    create_custom_positive_response,
)
from .models import User
from .serializers import UserSerializer, createLocalAccountSerializer, loginAccountSerializer
from .jwt_functions import get_tokens_for_user
from .user_manager import UserManager
from .models import User

class createLocalAccount(APIView):
    def post(self, request):
        serializer = createLocalAccountSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            full_name = serializer.validated_data.get('full_name')
            password = serializer.validated_data.get('password')
            organisation = serializer.validated_data.get('organisation')

            User.objects.create_user(
                email=email,
                password=password,
                full_name=full_name,
                organisation=organisation if organisation else organisations.UNASSIGNED,
                user_type=user_types.CUSTOM,
            )
            return create_custom_positive_response(response_status=status.HTTP_201_CREATED)
        else:
            return create_bad_request_response()


class localLogin(APIView):
    def post(self, request):
        serializer = loginAccountSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')

            try:
                user = User.objects.get(email=email)
                if user.check_password(password):
                    return create_ok_response({ "tokens": get_tokens_for_user(user) })
                else:
                    return create_bad_request_response()
            except User.DoesNotExist:
                return create_bad_request_response()


            return create_ok_response({
                "errors": serializer.errors
            })
        else:
            return create_bad_request_response()


# Just an example of a protected route, remove once real ones are implemented
class tokenTest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return create_ok_response()