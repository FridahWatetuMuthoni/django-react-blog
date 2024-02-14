from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('user', views.UserViewSet, basename='user')


urlpatterns = [
    path('', include(router.urls)),
    path('profile/', views.profile_detail, name='profile')
]



