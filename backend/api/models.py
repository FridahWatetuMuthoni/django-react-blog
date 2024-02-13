from unicodedata import category
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Categories(models.Model):
    name = models.CharField(max_length = 250)
    
    def __str__(self):
        return self.name

class Article(models.Model):
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'posts')
    title = models.CharField(max_length=250)
    description = models.CharField(max_length=250)
    content = models.TextField()
    image = models.ImageField(upload_to='article_images/',blank=False, null=False)
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Categories, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['-created', '-updated']
    
    def __str__(self):
        return self.title