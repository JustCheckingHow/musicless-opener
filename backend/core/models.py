from django.db import models


class Document(models.Model):
    title = models.CharField(max_length=255, blank=True)
    # Document blob
    document = models.FileField(upload_to='documents/')
    # UTF timestamp
    uploaded_at = models.DateTimeField(auto_now_add=True)
    # If valid scheme, properly formatted pdf, etc.
    valid = models.BooleanField(default=False)
    # If valid, the url of valid template, else None
    template_url = models.CharField(max_length=255, blank=True, null=True)
    # File's raw output
    real_extension = models.CharField(max_length=512, blank=True)
