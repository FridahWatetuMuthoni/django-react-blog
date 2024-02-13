from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register('articles', views.ArticleViewSet, basename='articles')
router.register('categories', views.CategoryViewSet, basename='categories')

urlpatterns = [
    path('', include(router.urls))
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)