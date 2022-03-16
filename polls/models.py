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
    hash_id = models.CharField(max_length=200, null=True)
    poll_id = models.IntegerField(default=0)
    user_id = models.IntegerField(default=0)
    question_id = models.IntegerField(default=0)
    bet_data = models.TextField(default='')
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

class poll(models.Model):
    name = models.CharField(max_length=200)
    image = models.CharField(max_length=200, default='', null=True)
    hash_id = models.CharField(max_length=200, null=True)
    poll_data = models.TextField(default='')
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    is_active = models.IntegerField(default=0)
    is_private = models.IntegerField(default=0)
    password = models.IntegerField(default=0)
    type = models.CharField(max_length=200)

class questions(models.Model):
    question_title = models.CharField(max_length=150)
    question_description = models.CharField(max_length=500, default='')
    question_data = models.TextField(default='')
    image = models.CharField(max_length=200, default='', null=True)
    hash_id = models.CharField(max_length=200, null=True)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    question_type = models.CharField(max_length=200)
    poll_id = models.IntegerField(default=0)
    answer = models.CharField(max_length=200)
    is_active = models.IntegerField(default=0)

class poll_admins(models.Model):
    poll_id = models.IntegerField(default=0)
    user_id = models.IntegerField(default=0)
    hash_id = models.CharField(max_length=200, null=True)
    is_admin = models.IntegerField(default=0)
    created_at = models.DateField(auto_now=False, auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

