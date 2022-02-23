import json
from django.shortcuts import render
from polls.models import *
import uuid

# Create your views here.
def index(request):
    print('')
    print('index')
    users_objects = user.objects.all()
    print(users_objects.count())
    users_list = []
    # for element in users_objects:
    #     users_dict = {}
    #     users_dict['name'] = element.name
    #     users_dict['email'] = element.email
    #     users_dict['hash_id'] = element.hash_id
    #     users_list.append(users_dict)
    
    # print(users_list)

    context = {
        'user': json.dumps(users_list)
    }
    return render(request, 'polls/index.html', context)

def login(request):
    context = {}
    return render(request, 'polls/login.html', context)

def my_polls(request):
    print('')
    print('my_polls')
    context = {}
    return render(request, 'polls/my-polls.html', context)

def new_poll(request):
    print('')
    print('new_poll')
    context = {}
    return render(request, 'polls/new-poll.html', context)

def search_polls(request):
    print('')
    print('search_polls')
    context = {}
    return render(request, 'polls/search-polls.html', context)

def settings(request):
    print('')
    print('settings')
    context = {}
    return render(request, 'polls/settings.html', context)

def poll(request, slug):
    print('')
    print('poll')
    context = {}
    return render(request, 'polls/poll.html', context)