from django.views.generic import View
from django.http import JsonResponse, response
from chunked_upload.views import ChunkedUploadView
from django.core.files.storage import FileSystemStorage
# from core.forms import UploadForm
from core.utils import is_schema_correct
import magic
import os


class Opener(View):

    def post(self, request):
        myfile = next(request.FILES.values())

        if not myfile:
            return JsonResponse({'error': 'No file was uploaded'})

        resp = {}
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        path = os.path.join(fs.location, filename)
        magic_data = magic.from_file(path)

        resp['extension'] = magic_data
        if magic_data.split()[0].lower() == 'xml':
            resp['valid_schema'] = is_schema_correct(path)
        fs.delete(path)

        return JsonResponse(resp)


class ChunkedUpload(ChunkedUploadView):

    def on_completion(self, uploaded_file, request):
        print(uploaded_file)
        return JsonResponse({'status': 'ok'})
