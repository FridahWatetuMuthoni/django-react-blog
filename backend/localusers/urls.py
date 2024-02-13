from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register('user', views.UserViewSet, basename='user')


urlpatterns = [
    path('', include(router.urls)),
    path('profile/', views.profile_detail, name='profile')
]



urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)