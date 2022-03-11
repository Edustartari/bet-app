import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
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

@csrf_exempt
def search_polls(request):
    print('')
    print('search_polls')
    print(request.user.id)
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

@csrf_exempt
def create_poll(request):
    print('')
    print('create_poll')
    poll_info = request.POST['poll_info']
    print(poll_info)
    print(type(poll_info))
    poll_info = json.loads(poll_info)
    print(poll_info)
    print(type(poll_info))

    users_objects = user.objects.all()

    new_poll = pool(
        name = poll_info['poll_name'],
        is_active = 1,
        type = poll_info['poll_type'],
        finish_date = poll_info['finish_date'] if poll_info['finish_date'] != 'false' or poll_info['finish_date'] != False else '',
        password = poll_info['password'] if len(poll_info['password']) > 0 else 0
    )
    new_poll.save()

    for bet_dict in poll_info['bets']:
        new_question = questions(
            question_title = bet_dict['question_title'],
            question_description = bet_dict['question_description'],
            question_data = json.dumps(bet_dict['question_data']),
            question_type = bet_dict['question_type'],
            pool_id = new_poll.id,
            answer = bet_dict['correct_answer'],
            is_active = 1
        )
        new_question.save()

        new_bet = bet(
            pool_id = new_poll.id,
            question_id = new_question.id,
            user_id = users_objects[0].id
        )
        new_bet.save()

    new_pool_admin = pool_admins(
        pool_id = new_poll.id,
        is_admin = 1,
        user_id = users_objects[0].id
    )
    new_pool_admin.save()

    response_dict = {
        'status': 'success'
    }
    return JsonResponse(response_dict, safe=False)