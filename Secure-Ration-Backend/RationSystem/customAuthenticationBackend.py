from django.contrib.auth.backends import BaseBackend
from .models import RationUser
from django.db.models import Q

from django.contrib.auth import get_user_model

class RationUserAuthenticationBackend(BaseBackend):
    def authenticate(self, request, email=None, rationId=None, password=None, **kwargs):
        try:
            # Check if email exists in database
            user_model = get_user_model()
            try:
                user = user_model.objects.get(email=email)
            except user_model.DoesNotExist:
                return None

            # Retrieve RationUser object with provided email and ration ID
            try:
                user = user_model.objects.get(email=email, rationId=rationId)
            except user_model.DoesNotExist:
                return None
            
            if user.check_password(password):
                return user
        except RationUser.DoesNotExist:
            return None

