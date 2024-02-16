from django.shortcuts import get_object_or_404, render
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .models import Profile
from .serializers import UserSerializer, ProfileSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes



# Create your views here.

User = get_user_model()


class UserViewSet(viewsets.ViewSet):
    
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk=None):
        user = request.user
        queryset = User.objects.all()
        owner = get_object_or_404(queryset,user=user)
        serializer = UserSerializer(owner)
        return Response(serializer.data)
    
    def update(self, request, pk=None):
        user = request.user
        queryset = User.objects.all()
        owner = get_object_or_404(queryset,user=user)
        serializer = UserSerializer(owner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT','PATCH'])
@permission_classes([IsAuthenticated])
def profile_detail(request):
    user = request.user
    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ProfileSerializer(profile, context={'request':request})
        return Response(serializer.data)
    
    elif request.method in ['PUT', 'PATCH']:
        serializer = ProfileSerializer(profile, data=request.data,context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


# class ProfileViewSet(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
    
#     def retrieve(self, request, pk=None):
#         queryset = Profile.objects.all()
#         user = request.user
#         profile = get_object_or_404(queryset,user=user)
#         serializer = ProfileSerializer(profile)
#         return Response(serializer.data)
    
#     def update(self, request, pk=None):
#         user = request.user
#         queryset = Profile.objects.all()
#         profile= get_object_or_404(queryset, user=user)
#         serializer = ProfileSerializer(profile, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
