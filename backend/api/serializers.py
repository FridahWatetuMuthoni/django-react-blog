from .models import Article
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.authtoken.views import Token

User = get_user_model()



class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id','title','description']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','password']
        extra_kwargs = {
            'password':{
                'write_only':True,
                'required':True
                }
        }
    
    def create(self, validated_data):
        #creating a hashed password
        user = User.objects.create_user(**validated_data)
        #creating a token automatically when a new user is created
        Token.objects.create(user=user)
        return user


# class ArticleSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=250)
#     description = serializers.TextField()
    
    
#     def create(self, validated_data):
#         return Article.objects.create(validated_data)
    
#     def update(self, instance, validated_data):
#         instance.title = validated_data.get('title', instance.title)
#         instance.description = validated_data.get('description', instance.description)
#         instance.save()
#         return instance
