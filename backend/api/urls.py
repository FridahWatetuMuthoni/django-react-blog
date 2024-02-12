from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('articles', views.ArticleViewSet, basename='articles')
router.register('users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls))
]


# urlpatterns = [
#     path('articles/',views.ArticleList.as_view(), name='articles'),
#     path('articles/<int:id>/', views.ArticleDetail.as_view(), name='article_detail')
# ]