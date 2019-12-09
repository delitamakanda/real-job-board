from django.urls import path
from . import views

urlpatterns = [
    path('access_login', views.login_view, name='access_login'),
    path('access_register', views.register_view, name='access_register'),
    path('access_logout', views.logout_view, name='access_logout'),
    path('user', views.profile, name='access_profile'),
    path('preview_email', views.preview_email, name='preview_email'),
    path('notifications', views.NotificationListView.as_view(), name='notifications'),
]
