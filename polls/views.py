import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from polls.models import *
import uuid

# Create your procedures here.
def hash_id_generator():
    return str(uuid.uuid1()).replace('-', '')

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
    user_id = 1

    poll_admin_object = poll_admins.objects.filter(user_id=user_id)
    polls_ids = [poll.poll_id for poll in poll_admin_object]  
    poll_objects = poll.objects.filter(id__in=polls_ids)

    poll_list = []
    for element in poll_objects:
        poll_dict = {}
        poll_dict['name'] = element.name
        poll_dict['image'] = element.image
        poll_dict['hash_id'] = element.hash_id
        poll_data_json = json.loads(element.poll_data)
        if len(poll_data_json['ranking']) > 0:
            for e in poll_data_json['ranking']:
                if e['user_id'] == user_id:
                    poll_dict['position'] = e['position']
                    break
        else:
            poll_dict['position'] = False
        poll_dict['created_at'] = element.created_at.strftime('%Y/%m/%d')
        poll_dict['updated_at'] = element.updated_at.strftime('%Y/%m/%d')
        poll_dict['is_active'] = element.is_active
        poll_dict['is_private'] = element.is_private
        poll_dict['password'] = element.password
        poll_dict['type'] = element.type
        poll_list.append(poll_dict)

    context = {
        'poll_list': json.dumps(poll_list)
    }
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

def poll_view(request, hash_id):
    print('')
    print('poll')
    poll_object = poll.objects.filter(hash_id=hash_id)
    print(poll_object.count())

    poll_exists = False
    poll_dict = {}
    if poll_object.count() > 0:
        poll_object = poll_object[0]
        print('if')
        poll_dict['name'] = poll_object.name
        poll_dict['image'] = poll_object.image
        poll_dict['hash_id'] = poll_object.hash_id
        poll_data_json = json.loads(poll_object.poll_data)
        poll_dict['ranking'] = poll_data_json['ranking']
        poll_dict['created_at'] = poll_object.created_at.strftime('%Y/%m/%d')
        poll_dict['updated_at'] = poll_object.updated_at.strftime('%Y/%m/%d')
        poll_dict['is_active'] = poll_object.is_active
        poll_dict['is_private'] = poll_object.is_private
        poll_dict['password'] = poll_object.password
        poll_dict['type'] = poll_object.type
        poll_exists = True

    context = {
        'poll_dict': json.dumps(poll_dict),
        'poll_exists': json.dumps(poll_exists)
    }

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

    new_poll = poll(
        name = poll_info['poll_name'],
        hash_id = hash_id_generator(),
        is_active = 1,
        type = poll_info['poll_type'],
        password = poll_info['password'] if len(poll_info['password']) > 0 else 0,
        poll_data = json.dumps({'finish_date': poll_info['finish_date'], 'ranking': []})
    )
    new_poll.save()

    for bet_dict in poll_info['bets']:
        new_bet = bet(
            bet_title = bet_dict['bet_title'],
            hash_id = hash_id_generator(),
            bet_description = bet_dict['bet_description'],
            bet_data = json.dumps(bet_dict['bet_data']),
            bet_type = bet_dict['bet_type'],
            poll_id = new_poll.id,
            answer = bet_dict['correct_answer'],
            is_active = 1
        )
        new_bet.save()

    new_poll_admin = poll_admins(
        poll_id = new_poll.id,
        hash_id = hash_id_generator(),
        is_admin = 1,
        user_id = users_objects[0].id
    )
    new_poll_admin.save()

    response_dict = {
        'status': 'success',
        'new_poll_hash': new_poll.hash_id
    }
    return JsonResponse(response_dict, safe=False)


def bet_page(request):
    print('')
    print('bet_page')
    context = {}
    return render(request, 'polls/bet-page.html', context)