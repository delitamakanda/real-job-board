from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('jobs_list', views.index, name='jobs_list'),
    path('post_offer', views.post_annonce, name='post_offer'),
]
