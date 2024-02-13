from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('users/',include('localusers.urls')),
    path('auth/', obtain_auth_token),
    #for login/logout with browsable api
    path('api-auth/', include('rest_framework.urls'))
]
