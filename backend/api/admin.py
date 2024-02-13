from django.contrib import admin
from .models import Article, Categories

# Register your models here.

@admin.register(Article)
class ArticleModel(admin.ModelAdmin):
    list_display = ('title', 'description')

admin.site.register(Categories)