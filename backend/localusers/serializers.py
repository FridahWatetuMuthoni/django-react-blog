from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Profile
from django.conf import settings



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
    profile_image = serializers.SerializerMethodField()
    
    def get_profile_image(self, obj):
        # If the profile image is present, return its full URL
        if obj.profile_image:
            return self.context['request'].build_absolute_uri(obj.profile_image.url)
        else:
            # If not, return the full URL of the default image
            return f"{self.context['request'].build_absolute_uri(settings.MEDIA_URL)}images/default.jpg"
    class Meta:
        model = Profile
        fields = ['id', 'profile_image', 'bio', 'gender', 'phone_number']
        depth = 1

