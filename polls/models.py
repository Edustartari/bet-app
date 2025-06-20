from django.db import models

# Create your models here.
class user(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=100)
    image = models.CharField(max_length=200, default='')
    hash_id = models.CharField(max_length=200, null=True)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

class bet(models.Model):
    bet_title = models.CharField(max_length=150, default='')
    bet_description = models.CharField(max_length=500, default='')
    bet_type = models.CharField(max_length=200, default='')
    bet_data = models.TextField(default='')
    hash_id = models.CharField(max_length=200, null=True)
    image = models.CharField(max_length=200, default='', null=True)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    poll_id = models.IntegerField(default=0)
    answer = models.CharField(max_length=200, default='')
    is_active = models.IntegerField(default=0)
    finish_date = models.DateField(auto_now=False, null=True)

class poll(models.Model):
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=200, default='', null=True)
    hash_id = models.CharField(max_length=200, null=True)
    poll_data = models.TextField(default='')
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    is_active = models.IntegerField(default=0)
    is_private = models.IntegerField(default=0)
    password = models.CharField(max_length=200)
    poll_type = models.CharField(max_length=200)
    finish_date = models.DateField(auto_now=False, null=True)

class poll_admins(models.Model):
    poll_id = models.IntegerField(default=0)
    user_id = models.IntegerField(default=0)
    hash_id = models.CharField(max_length=200, null=True)
    is_admin = models.IntegerField(default=0)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

class session(models.Model):
	user_id = models.IntegerField(default=0)
	hash_id = models.CharField(max_length=200, default=None)
	created_at = models.DateTimeField(auto_now=False, auto_now_add=True)
	origin_ip = models.CharField(max_length=200, default='')
	location = models.CharField(max_length=200, default='')

class user_bet(models.Model):
    user_id = models.IntegerField(default=0)
    bet_id = models.IntegerField(default=0)
    answer = models.CharField(max_length=200, default='')
    bet_data = models.TextField(default='')
    hash_id = models.CharField(max_length=200, null=True)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    is_active = models.IntegerField(default=0)