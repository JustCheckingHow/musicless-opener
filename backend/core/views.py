from django.views.generic import View
from django.http import JsonResponse


class open(View):

    def get(self, request):
        return JsonResponse({'status': 'ok'})
