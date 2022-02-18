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