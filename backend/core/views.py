from django.views.generic import View
from django.http import JsonResponse, response
from chunked_upload.views import ChunkedUploadView
from django.core.files.storage import FileSystemStorage
# from core.forms import UploadForm
from django.conf import settings
import magic
import os


class Opener(View):

    def post(self, request):
        if myfile := next(request.FILES.values()):
            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
            path = os.path.join(fs.location, filename)
            print(magic.from_file(path))
        return JsonResponse({
            'extension': magic.from_file(
                os.path.join(settings.MEDIA_ROOT, filename)),
            'blob': 'asd'
        })


class ChunkedUpload(ChunkedUploadView):

    def on_completion(self, uploaded_file, request):
        print(uploaded_file)
        return JsonResponse({'status': 'ok'})
