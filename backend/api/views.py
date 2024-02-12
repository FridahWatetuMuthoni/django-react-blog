# from rest_framework.decorators import APIView
# from rest_framework import generics
# from rest_framework import mixins
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from .serializers import ArticleSerializer, UserSerializer
from .models import Article
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model

# Create your views here.

User = get_user_model()

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class ArticleViewSet(viewsets.ViewSet):
    
#     def list(self, request):
#         articles = Article.objects.all()
#         serializer = ArticleSerializer(articles, many=True)
#         return Response(serializer.data)
    
#     def create(self, request):
#         serializer = ArticleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def retrieve(self, request, pk=None):
#         queryset = Article.objects.all()
#         article = get_object_or_404(queryset,pk=pk)
#         serializer = ArticleSerializer(article)
#         return Response(serializer.data)
    
#     def update(self, request, pk=None):
#         article = Article.objects.get(pk=pk)
#         serializer = ArticleSerializer(article, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def destroy(self, request, pk=None):
#         article = Article.objects.get(pk=pk)
#         article.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

    
#     def partial_update(self, request, pk=None):
#         pass

# class ArticleList(APIView):
#     def get(self, request):
#         articles = Article.objects.all()
#         serializer = ArticleSerializer(articles, many=True)
#         return Response(serializer.data)
    
#     def post(self, request):
#         serializer = ArticleSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ArticleDetail(APIView):
#     def get_object(self, id):
#         try:
#             article = Article.objects.get(id=id)
#             return article
#         except Article.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
    
#     def get(self, request, id):
#         article = self.get_object(id=id)
#         serialiser = ArticleSerializer(article)
#         return Response(serialiser.data)
    
#     def put(self, request, id):
#         article = self.get_object(id=id)
#         serialiser = ArticleSerializer(article, data=request.data)
#         if serialiser.is_valid():
#             serialiser.save()
#             return Response(serialiser.data)
#         return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def delete(self,request, id):
#         article = self.get_object(id=id)
#         article.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)