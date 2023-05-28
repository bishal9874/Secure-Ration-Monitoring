
from xml.dom import ValidationErr
from RationSystem.utils import Util
from rest_framework import serializers
from RationSystem.models import RationDetails, RationKYC, RationUser
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import face_recognition
import base64
from django.contrib.auth import get_user_model
User = get_user_model()
# user creation Serializer


class UserRegistrationSerializer(serializers.ModelSerializer):
    # we are writing this because we need comfrim password field in outr Ragistration Request
    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)
    face_image = serializers.ImageField()

    class Meta:
        model = RationUser
        fields = ['email', 'rationId', 'name', 'tc',
                  'password', 'password2', 'face_image']

        extra_kwargs = {
            'password': {'write_only': True}
        }

    # Validation Password and Comfrim password while registration

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError(
                'Password and Confrim Password does not match')

        face_image = attrs.get('face_image')
        # Use face_recognition library to check if the image is a face image
        try:
            image = face_recognition.load_image_file(face_image)
            face_locations = face_recognition.face_locations(image)
            if len(face_locations) == 0:
                raise serializers.ValidationError(
                    'The uploaded image is not a face image')
        except:
            raise serializers.ValidationError(
                'Failed to process the uploaded image')
        return attrs

    def create(self, validate_data):
        return RationUser.objects.create_user(**validate_data)


# User Login  Serializer

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    rationId = serializers.CharField(max_length=255)

    class Meta:
        model = RationUser
        fields = ['email', 'rationId', 'password']
# User face Authentication


class FaceAuthenticationSerializer(serializers.Serializer):
    face_image = serializers.ImageField()

    class Meta:
        model = RationUser
        fields = ['face_image']

    def validate(self, attrs):
        # Use face_recognition library to check if the image is a face image
        try:
            image = face_recognition.load_image_file(attrs['face_image'])
            face_encodings = face_recognition.face_encodings(image)
            face_locations = face_recognition.face_locations(image)
            if len(face_encodings and face_locations) == 0:
                raise serializers.ValidationError(
                    'The uploaded image is not a face image')
        except:
            raise serializers.ValidationError(
                'Failed to process the uploaded image here face is not detected')
        return attrs


# user Get profile Serializer


class RationKYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = RationKYC
        fields = '__all__'


class RationDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RationDetails
        fields = '__all__'


class RationUserSerializer(serializers.ModelSerializer):
    face_image_base64 = serializers.SerializerMethodField()

    class Meta:
        model = RationUser
        fields = ('id', 'email', 'rationId', 'name', 'tc', 'face_image_base64')

    def get_face_image_base64(self, obj):
        if obj.face_image:
            with open(obj.face_image.path, "rb") as image_file:
                return base64.b64encode(image_file.read()).decode('utf-8')
        else:
            return None


# User Password Change Serializer
class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password doesn't match")
        user.set_password(password)
        user.save()
        return attrs

# user password reset


class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            print('User ID:', user.id)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print('Encoded UID:', uid)

            token = PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token:', token)
            link = 'http://localhost:5173/api/user/reset/' + uid + '/' + token
            print('Password Reset Link:', link)
            # Send Email

            body = 'Click the following link to reset your password: ' + link
            data = {
                'subject': 'Reset Your Password',
                'body': body,
                'to_email': user.email
            }

            Util.send_email(data)

            return attrs
        else:
            raise serializers.ValidationError('You are not a registered user')


class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(
        max_length=255, style={'input_type': 'password'}, write_only=True)

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError(
                    "Password and Confirm Password don't match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError(
                    'Token is not valid or has expired')
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError(
                'Token is not valid or has expired')


class RationKYCSerializer(serializers.ModelSerializer):
    # user_id = serializers.PrimaryKeyRelatedField(queryset=RationUser.objects.all())
    user_email = serializers.EmailField(
        source='rationId.email', read_only=True)
    user_name = serializers.CharField(source='rationId.name', read_only=True)
    user_rationId = serializers.CharField(
        source='rationId.rationId', read_only=True)
    user_face_image = serializers.ImageField(
        source='rationId.face_image', read_only=True)

    class Meta:
        model = RationKYC
        fields = ('user_email', 'user_name', 'user_rationId', 'user_face_image', 'houseNo', 'village', 'post_office',
                  'pin', 'Annual_income', 'aadharcardNo', 'phoneNo', 'dateofbirth', 'gender', 'state', 'district', 'fpsCode')
