# Generated by Django 3.1.5 on 2021-01-15 18:39

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sale',
            name='created_date',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='sale',
            name='quantity',
            field=models.IntegerField(null=True),
        ),
    ]
