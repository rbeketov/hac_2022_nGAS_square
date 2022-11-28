"""testapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from new_record import views as views_rec
from register import views as views_reg
from send_to_base import views as view_send

urlpatterns = [
    path('admin/', admin.site.urls),
    path('make_calendar/', view_send.make_cal, name='home'),
    path('new/new_rec/', views_rec.new_rec, name='home'),
    path('view/', views_rec.view, name='home'),
    path('newview/', views_rec.newview, name='home'),
    path('login/', views_reg.check_login, name='home'),
    path('register/new_register/', views_reg.new_register, name='home'),
    path('send_data/', view_send.send_data, name='home'),
]
