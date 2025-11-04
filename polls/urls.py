from django.urls import path
from polls import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('settings', views.settings, name='settings'),
    path('search-polls', views.search_polls, name='search_polls'),
    path('get-my-polls', views.get_my_polls, name='get_my_polls'),
    path('my-polls', views.my_polls, name='my_polls'),
    path('create-poll', views.create_poll, name='create_poll'),
    path('poll-info', views.poll_info, name='poll_info'),
    path('save-bet', views.save_bet, name='save_bet'),
    path('poll/<slug:hash_id>', views.poll_view, name='poll_view'),
    path('bet-page/<slug:hash_id>', views.bet_page, name='bet_page'),
    path('bet-manage/<slug:hash_id>', views.bet_manage, name='bet_manage'),
]