from django import template

register = template.Library()


@register.filter(name='sanitize_app_name')
def sanitize_app_name(value):
    if value:
        return value.replace('_', '')
    return '-'
