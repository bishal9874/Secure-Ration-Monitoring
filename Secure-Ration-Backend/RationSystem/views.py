from rest_framework.exceptions import ValidationError
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from RationSystem.serializer import * 
# from django.contrib.auth import authenticate,get_user_model
from RationSystem.customAuthenticationBackend import RationUserAuthenticationBackend
from  RationSystem.renderer import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from deepface import DeepFace
from django.shortcuts import get_object_or_404
from rest_framework import generics
from datetime import datetime, timedelta
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
import datetime
# access_token_lifetime = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME']

# Create your views here.
# 




#generate Token Manually

# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)

#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }

from django.conf import settings

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    access_token = refresh.access_token
    access_token_lifetime = access_token.lifetime.total_seconds() * 1000  # Convert seconds to milliseconds
    current_time = datetime.datetime.now().timestamp() * 1000  # Current time in milliseconds
    expiration_time = current_time + access_token_lifetime

    return {
        'refresh': str(refresh),
        'access': str(access_token),
        'access_token_expiration': expiration_time,
    }

#create User Registration

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request,format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception = True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({
                'token':token,
                'msg':"User Registration Successful"
            },status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
#create USer Login
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            rationId = serializer.data.get('rationId')
            password = serializer.data.get('password')
            user = RationUserAuthenticationBackend.authenticate(self,request,
                                                                email=email,
                                                                rationId=rationId,
                                                                password=password)
            print(user)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({
                    'token': token,
                    "msg": "Login Successful"
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "errors": {
                        'none_field_errors':
                            ['email or rationId or password is not valid']
                    }
                }, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#create USer Face Authentication
class FaceAuthenticationView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    
    
    def post(self, request, format=None):
        serializer = FaceAuthenticationSerializer(data=request.data)
        if serializer.is_valid():
            face_image = serializer.validated_data['face_image']
            # Load the user from the database based on the email or ration ID
            email_or_ration_id = request.user.rationId if request.user.is_authenticated else request.session.get('email_or_ration_id')
            try:
                user = RationUser.objects.get(email=email_or_ration_id) if '@' in email_or_ration_id else RationUser.objects.get(rationId=email_or_ration_id)
            except RationUser.DoesNotExist:
                return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

            # Use face_recognition library to check if the uploaded image matches the user's face
            try:
                user_image = face_recognition.load_image_file(user.face_image.path)
                user_face_encoding = face_recognition.face_encodings(user_image)[0]
                uploaded_image = face_recognition.load_image_file(face_image)
                uploaded_face_encoding = face_recognition.face_encodings(uploaded_image)[0]
                face_distances = face_recognition.face_distance([user_face_encoding], uploaded_face_encoding)
                face_match = face_distances[0] < 0.6
                # perform face recognition
                result = DeepFace.verify(user_image, uploaded_image, model_name="Facenet")
                if not face_match or not result["verified"]:
                    return Response({'detail': 'Face not matched @@@@@@ authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)
            except:
                return Response({'detail': 'Failed to process the uploaded image or it is not a face'}, status=status.HTTP_400_BAD_REQUEST)

            # Authenticate the user if not already authenticated
            if not request.user.is_authenticated:
                user = authenticate(request, email=email_or_ration_id, password=request.session.get('password'))
                if user is None:
                    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


            return Response({
                    'detail': 'Face authentication succeeded',
                    'isfaceVerify':True,
                    'token':get_tokens_for_user(user)
                }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#create User KYC 
class RationKYCCreateAPIView(generics.CreateAPIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    serializer_class = RationKYCSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if RationKYC.objects.filter(user=user).exists():
            raise ValidationError('RationKYC data already exists for this user')
        ration_kyc = serializer.save(user=user)

        # Create and save RationDetails
        ration_details = RationDetails.objects.create(user=user)
        ration_details.save()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            token = get_tokens_for_user(request.user)
            return Response({
                'token': token,
                'msg': 'User KYC Succeeded'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#get users profile 

class RationUserAndKYCAndDetailsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user = self.request.user
        try:
            ration_kyc = RationKYC.objects.get(user=user)
        except RationKYC.DoesNotExist:
            raise ValidationError("RationKYC instance does not exist for this user")
        return ration_kyc
    
    def get_details_object(self):
        user = self.request.user
        try:
            ration_details = RationDetails.objects.get(user=user)
        except RationDetails.DoesNotExist:
            raise ValidationError("RationDetails instance does not exist for this user")
        return ration_details
    
    def get(self, request, format=None):
        user = request.user
        ration_kyc = self.get_object()
        ration_details = self.get_details_object()
        user_serializer = RationUserSerializer(user)
        kyc_serializer = RationKYCSerializer(ration_kyc)
        details_serializer = RationDetailsSerializer(ration_details)
        response_data = {
            'user': user_serializer.data,
            'kyc': kyc_serializer.data,
            'details': details_serializer.data,
        }
        return Response(response_data, status=status.HTTP_200_OK)

# password change
    
class UserChangePasswordView(APIView):
  renderer_classes = [UserRenderer]
  permission_classes = [IsAuthenticated]
  def post(self, request, format=None):
    serializer = UserChangePasswordSerializer(data=request.data, context={'user':request.user})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Changed Successfully'}, status=status.HTTP_200_OK)
  
class SendPasswordResetEmailView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, format=None):
    serializer = SendPasswordResetEmailSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)

class UserPasswordResetView(APIView):
  renderer_classes = [UserRenderer]
  def post(self, request, uid, token, format=None):
    serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid, 'token':token})
    serializer.is_valid(raise_exception=True)
    return Response({'msg':'Password Reset Successfully'}, status=status.HTTP_200_OK)
