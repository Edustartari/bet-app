from django.urls import path
from polls import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('settings', views.settings, name='settings'),
    path('search-polls', views.search_polls, name='search_polls'),
    path('my-polls', views.my_polls, name='my_polls'),
    path('create-poll', views.create_poll, name='create_poll'),
    path('poll-info', views.poll_info, name='poll_info'),
    # path('<slug:hash_id>', views.poll_view, name='poll_view'),
    # path('bet-page', views.bet_page, name='bet_page'),
    # path('save-bet', views.save_bet, name='save_bet'),
]