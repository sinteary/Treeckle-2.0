from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from treeckle.common import organisations, user_types, api_responses
from treeckle.common.api_responses import (
    create_ok_response,
    create_bad_request_response,
    create_custom_positive_response,
)
from django.http import HttpResponseRedirect
from rest_framework.response import Response
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


class openIDLogin(APIView):
    def get(self, request):
        url = "https://openid.nus.edu.sg/server/"
        url += "?openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select"
        url += "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select"
        url += "&openid.mode=checkid_setup"
        url += "&openid.ns=http://specs.openid.net/auth/2.0"
        url += "&openid.sreg.required=email,nickname,fullname"
        url += "&openid.identity=http://specs.openid.net/auth/2.0/identifier_select"
        url += "&openid.return_to=http://localhost:8000/gateway/nus-callback"
        return HttpResponseRedirect(url)


class openIDCallback(APIView):
    def replace_friendlymail(self, email, nickname):
        """
        This method modifies <friendlyemail>@xxxx.yyy to <nickname>@xxxx.yyy
        """
        modified_email_as_list = email.rsplit("@", 1)
        return nickname + "@" + modified_email_as_list[1]


    def get(self, request):
        # TODO: 
        # validation - fail login gracefully if these fields get weird values
        # Add cookie for jwt (research on security implications beforehand)
        email = request.query_params.get("openid.sreg.email")
        fullname = request.query_params.get("openid.sreg.fullname")
        nickname = request.query_params.get("openid.sreg.nickname")

        response = HttpResponseRedirect("/")
        response.set_cookie("fullname", fullname)
        response.set_cookie("email", self.replace_friendlymail(email, nickname))
        return response


# Just an example of a protected route, remove once real ones are implemented
class tokenTest(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        return create_ok_response()
