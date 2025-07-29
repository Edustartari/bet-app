import os, sys, requests, json
import pytest
from polls.views import *
from rest_framework.test import APIClient

client = APIClient()

@pytest.mark.django_db
def test_index():
    response = client.get('')
    assert response.status_code == 200

def test_login():
    response = client.get('/login')
    assert response.status_code == 200

def test_my_polls():
    response = client.get('/my-polls')
    assert response.status_code == 200

def test_search_polls():
    response = client.get('/search-polls')
    assert response.status_code == 200

def test_settings():
    response = client.get('/settings')
    assert response.status_code == 200

# def test_poll_info():
#     response = client.get('/poll-info')
#     assert response.status_code == 200

# def test_create_poll():
#     response = client.get('/create-poll')
#     assert response.status_code == 200

# def test_save_bet():
#     response = client.get('/save-bet')
#     assert response.status_code == 200