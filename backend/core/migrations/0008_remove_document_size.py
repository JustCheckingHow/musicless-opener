# Generated by Django 3.2.9 on 2021-12-12 07:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_document_size'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='document',
            name='size',
        ),
    ]