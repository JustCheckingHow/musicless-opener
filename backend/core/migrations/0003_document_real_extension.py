# Generated by Django 3.2.9 on 2021-12-11 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_document_valid'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='real_extension',
            field=models.CharField(blank=True, max_length=512),
        ),
    ]