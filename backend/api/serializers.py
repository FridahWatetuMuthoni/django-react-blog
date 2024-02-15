from .models import Article,Categories
from rest_framework import serializers


class ArticleSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    category = serializers.CharField()
    class Meta:
        model = Article
        fields = ['id','author','title','description', 'content','image', 'created','updated','category']
        depth=1
    
    def create(self, validated_data):
        category = validated_data.pop('category')
        category_instance,created = Categories.objects.get_or_create(name=category)
        article_instance = Article.objects.create(**validated_data, category=category_instance)
        return article_instance
    
    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.image = validated_data.get('image', instance.image)
        instance.description = validated_data.get('description', instance.description)
        instance.content = validated_data.get('content',instance.content)
        
        category = validated_data.pop('category')
        category_instance,created = Categories.objects.get_or_create(name=category)
        instance.category = category_instance
        instance.save()
        return instance

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ['id','name']

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
