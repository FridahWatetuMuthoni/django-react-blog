from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Profile


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['id','username','email', 'password', 'posts']
        extra_kwargs = {
            'password':{
                'write_only':True,
                'required':True
                }
            }
    def create(self, validated_data):
        #creating a hashed password
        user = User.objects.create_user(**validated_data)
        print(user)
        #creating a token automatically when a new user is created
        Token.objects.create(user=user)
        print(user)
        print("##########################")
        print(validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        #depth = 1

