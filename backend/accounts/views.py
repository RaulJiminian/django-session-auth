from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib import auth
from django.contrib.auth.models import User
from user_profile.models import UserProfile
from .serializers import UserSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

@method_decorator(csrf_protect, name="dispatch")
class CheckAuthenticatedView(APIView):
  def get(self, request, format=None):
    try:
      isAuthenticated = User.is_authenticated

      if isAuthenticated:
        return Response({'isAuthenticated': 'success'})
      else:
        return Response({'isAuthenticated': 'error'})
    except:
        return Response({'error': 'Something went wrong when checking authentication status'})



@method_decorator(csrf_protect, name="dispatch")
class LoginView(APIView):
  permission_classes = (permissions.AllowAny,)

  def post(self, request, format=None):
    data = self.request.data

    username = data['username']
    password = data['password']

    try:
      user = auth.authenticate(username=username, password=password)

      if user is not None:
        auth.login(request, user)
        return Response({'success': 'User authenticated', 'username': username})
      else:
        return Response({'error': 'Error Authenticating'})
    except:
        return Response({'error': 'Something went wrong when logging in'})



class LogoutView(APIView):
  def post(self, request, format=None):
    try:
      auth.logout(request)
      return Response({'success': 'Logged Out'})
    except:
      return Response({'error': 'Something went wrong when logging out'})


# Create your views here.
@method_decorator(csrf_protect, name="dispatch")
class SignupView(APIView):
  permission_classes = (permissions.AllowAny,)

  def post(self, request, format=None):
    data = self.request.data

    username = data['username']
    password = data['password']
    re_password = data['re_password']

    try:
      if password == re_password:
        if User.objects.filter(username=username).exists():
          return Response({"error": "Username already exists"})
        else:
            if len(password) < 6:
              return Response({"error": "Password must be at least 6 characters"})
            else:
              user = User.objects.create_user(username=username, password=password)
              user.save()

              user = User.objects.get(id=user.id)

              user_profile = UserProfile(user=user, first_name='', last_name='', phone='', city='')
              user_profile.save()

              return Response({ 'success': "User created successfully"})
      else:
        return Response({'error': "Passwords do not match"})
    except:
      return Response({"error": "Something went wrong signing up"})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
  permission_classes = (permissions.AllowAny,)

  def get(self, request, format=None):
    return Response({'success': 'CSRF cookie set'})


class DeleteAccountView(APIView):
  def delete(self, request, format=None):
    user = self.request.user
    
    try:
      user = User.objects.filter(id=user.id).delete()

      return Response({'success': 'User deleted successfully'})
    except:
      return Response({'error': 'Something went wrong when trying to delete user'})


class GetUsersView(APIView):
  permission_classes = (permissions.AllowAny,)

  def get(self, request, format=None):
    users = User.objects.all()

    users = UserSerializer(users, many=True)
    return Response(users.data)