import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from polls.models import *
import uuid
from datetime import datetime
import base64
import os
from django.contrib.auth import authenticate, login, logout
from django.db import connections, connection, transaction

# Middlewares
def session_middleware(get_response):
	# One-time configuration and initialization.

	def middleware(request):
		# Code to be executed for each request before
		# the view (and later middleware) are called.

		# Check if the session has an active session_hash and create one otheriwse
		if 'session_hash' not in request.session:

			# Create session entity in the DB assync via celery
			session_hash = hash_id_generator()
			request.session['session_hash'] = session_hash

			new_session = session(hash_id = session_hash)
			new_session.save()

		response = get_response(request)

		# Code to be executed for each request/response after
		# the view is called.
		return response

	return middleware

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

	# Set current session to have user_id = 1
	current_session = session.objects.get(hash_id = request.session['session_hash'])
	current_session.user_id = 1
	current_session.save()

	context = {
		'user': json.dumps(users_list)
	}
	return render(request, 'polls/index.html', context)

def login(request):
	context = {}

	new_user = user(
		name = 'Edward',
		email = 'edu@mail.com',
		hash_id = hash_id_generator()
	)
	new_user.save()

	new_user = user(
		name = 'John Lennon',
		email = 'john@mail.com',
		hash_id = hash_id_generator()
	)
	new_user.save()

	return render(request, 'polls/login.html', context)

def my_polls(request):
	print('')
	print('my_polls')
	print(hash_id_generator())
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
		poll_dict['type'] = element.poll_type
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
	print('poll_view')

	try:
		# Get the current session
		session_hash = request.session['session_hash']
		current_session = session.objects.get(hash_id = session_hash)
		users_object = user.objects.get(id = current_session.user_id)
		user_id = users_object.id
	except Exception as e:
		print(e)
		user_id = 1

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
		poll_dict['finish_date'] = poll_data_json['finish_date']
		poll_dict['created_at'] = poll_object.created_at.strftime('%Y/%m/%d')
		poll_dict['updated_at'] = poll_object.updated_at.strftime('%Y/%m/%d')
		poll_dict['is_active'] = poll_object.is_active
		poll_dict['is_private'] = poll_object.is_private
		poll_dict['password'] = poll_object.password
		poll_dict['type'] = poll_object.poll_type
		poll_dict['user_id'] = user_id
		poll_exists = True

		bet_objects = bet.objects.filter(poll_id=poll_object.id) 
		print(bet_objects.count())
		bets_list = []
		for bet_info in bet_objects:
			bet_dict = {}
			bet_dict['hash_id'] = bet_info.hash_id
			bet_data = json.loads(bet_info.bet_data)
			bet_dict['answers'] = bet_data['answer_options']
			bet_dict['is_active'] = bet_info.is_active
			bet_dict['created_at'] = bet_info.created_at.strftime('%-d, %b - %Y')
			bet_dict['updated_at'] = bet_info.updated_at.strftime('%Y/%m/%d')
			bet_dict['description'] = bet_info.bet_description
			bet_dict['title'] = bet_info.bet_title
			bet_dict['type'] = bet_info.bet_type

			bet_dict['finish_date'] = False
			if bet_info.finish_date:
				bet_dict['finish_date'] = bet_info.finish_date.strftime('%-d, %b - %Y')

			bet_dict['users_answers'] = []
			if 'users_answers' in bet_data:
				bet_dict['users_answers'] = bet_data['users_answers']

			bet_dict['image'] = bet_info.image
			bets_list.append(bet_dict)
		
		poll_dict['bets'] = bets_list


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
	# print(poll_info)
	print(type(poll_info))
	poll_info = json.loads(poll_info)
	print(poll_info)
	print(type(poll_info))

	# Get current path
	current_path = os.path.dirname(os.path.realpath(__file__))
	poll_hash_id = hash_id_generator()

	try:
		poll_image_hash = poll_hash_id
		image_base64 = poll_info['image'][0]['data_url'].replace('data:image/png;base64,', '')
		image_base64 = image_base64.replace('data:image/jpeg;base64,', '')

		with open(current_path + "/static/img/" + poll_image_hash + ".jpg", "wb") as fh:
			fh.write(base64.b64decode(image_base64))
	except:
		poll_image_hash = ''

	finish_date = None
	if poll_info['finish_date']:
		finish_date = datetime.strptime(poll_info['finish_date'], '%Y-%m-%dT%H:%M:%S.%fZ') # 2023-06-23T22:35:12.226Z

	users_objects = user.objects.all()

	new_poll = poll(
		name = poll_info['poll_name'],
		hash_id = poll_hash_id,
		is_active = 1,
		image = poll_image_hash,
		poll_type = poll_info['poll_type'],
		is_private = 1 if poll_info['is_private'] else 0,
		password = poll_info['password'] if len(poll_info['password']) > 0 else 0,
		poll_data = json.dumps({'finish_date': poll_info['finish_date'], 'ranking': []}),
		finish_date = finish_date
	)
	new_poll.save()

	for bet_dict in poll_info['bets']:
		finish_date = None
		if 'finish_date' in bet_dict['bet_data'] and bet_dict['bet_data']['finish_date']:
			finish_date = datetime.strptime(bet_dict['bet_data']['finish_date'], '%Y-%m-%dT%H:%M:%S.%fZ')
		new_bet = bet(
			bet_title = bet_dict['bet_title'],
			hash_id = hash_id_generator(),
			bet_description = bet_dict['bet_description'],
			bet_data = json.dumps(bet_dict['bet_data']),
			bet_type = bet_dict['bet_type'],
			poll_id = new_poll.id,
			answer = bet_dict['correct_answer'],
			is_active = 1,
			finish_date = finish_date
		)
		new_bet.save()

	new_poll_admin = poll_admins(
		poll_id = new_poll.id,
		hash_id = hash_id_generator(),
		is_admin = 1,
		# user_id = users_objects[0].id
		user_id = 1
	)
	new_poll_admin.save()

	response_dict = {
		'status': 'success',
		'new_poll_hash': new_poll.hash_id
	}
	return JsonResponse(response_dict, safe=False)


# def bet_page(request, hash_id):
def bet_page(request):
	print('')
	print('bet_page')

	# poll_object = poll.objects.filter(hash_id=hash_id)
	# print(poll_object.count())
	context = {}
	return render(request, 'polls/bet-page.html', context)



"""
poll table
poll_data field with json example:
{
	"finish_date": false,
	"ranking": [
		{
			"user_id": 1,
			"user_hash": 1,
			"position": 1,
			"profile_picture_1": "",
			"user_name": "Name 1",
			"total_points": 9
		},
		{
			"user_id": 2,
			"user_hash": 2,
			"position": 2,
			"profile_picture_2": "",
			"user_name": "Name 2",
			"total_points": 6
		},
		{
			"user_id": 3,
			"user_hash": 3,
			"position": 3,
			"profile_picture_3": "",
			"user_name": "Name 3",
			"total_points": 3
		},
		{
			"user_id": 4,
			"user_hash": 4,
			"position": 4,
			"profile_picture_4": "",
			"user_name": "Name 4",
			"total_points": 0
		}
	]
}
"""

"""
bet table
bet_data field with json example:
{
  "answer_options": ["1", "2"],
  "finish_date": "2023-11-15T23:57:49.263Z",
  "users_answers": [
	{
	  "user_id": 1,
	  "answer": "string1"
	},
	{
	  "user_id": 2,
	  "answer": "string2"
	},
	{
	  "user_id": 3,
	  "answer": "string3"
	},
	{
	  "user_id": 4,
	  "answer": "string4"
	}
  ]
}

"""
