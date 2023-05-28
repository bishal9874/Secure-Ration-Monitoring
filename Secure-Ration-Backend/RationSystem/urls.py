
from django.urls import path,include
from RationSystem.views import *
urlpatterns = [
  path('register/',UserRegistrationView.as_view(),name='register'),
  path('login/',UserLoginView.as_view(),name='login'),

  path('profile/',RationUserAndKYCAndDetailsView.as_view(),name='profile'),
  # path('ration/',RationKYCRetrieveAPIView.as_view(),name='ration'),
  path('changepassword/',UserChangePasswordView.as_view(),name='changepassword'),
  path('sent-reset-password-email/',SendPasswordResetEmailView.as_view(),name='sent-reset-password-email'),
  path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
  path('faceauthentication/', FaceAuthenticationView.as_view(), name='face-authentication'),
  path('rationkyc/', RationKYCCreateAPIView.as_view(), name='ration-kyc-list'),
]