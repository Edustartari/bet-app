from django.urls import path
from polls import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('my-polls', views.my_polls, name='my_polls'),
    path('new-poll', views.new_poll, name='new_poll'),
    path('settings', views.settings, name='settings'),
    path('search-polls', views.search_polls, name='search_polls'),
    path('create-poll', views.create_poll, name='create_poll'),
    path('<slug:slug>', views.poll, name='poll'),
]