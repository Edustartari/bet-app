# Generated by Django 4.0.2 on 2022-03-11 00:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0006_pool_password_alter_bet_hash_id_alter_pool_hash_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='hash_id',
            field=models.CharField(default='8a895a72a0d411ec8af224f5aa5b0c45', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='pool',
            name='hash_id',
            field=models.CharField(default='8a895a73a0d411ec82c424f5aa5b0c45', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='pool',
            name='image',
            field=models.CharField(default='', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='pool_admins',
            name='hash_id',
            field=models.CharField(default='8a89a880a0d411ec95e124f5aa5b0c45', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='questions',
            name='hash_id',
            field=models.CharField(default='8a898179a0d411eca25a24f5aa5b0c45', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='questions',
            name='image',
            field=models.CharField(default='8a898178a0d411ecbad424f5aa5b0c45', max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='hash_id',
            field=models.CharField(default='8a893340a0d411ec92b924f5aa5b0c45', max_length=200, null=True),
        ),
    ]
