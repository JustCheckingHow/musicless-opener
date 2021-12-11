from django.views.generic import View
from django.http import JsonResponse, response
from chunked_upload.views import ChunkedUploadView
from django.core.files.storage import FileSystemStorage
# from core.forms import UploadForm
from core.utils import schema_check
import magic
import os


class Opener(View):

    def post(self, request):
        if myfile := next(request.FILES.values()):
            fs = FileSystemStorage()
            filename = fs.save(myfile.name, myfile)
            path = os.path.join(fs.location, filename)
            magic_data = magic.from_file(path)

            # if magic_data.split()[0].lower() == 'xml':
            #     schema_check(xml_file=path)

            # fs.delete(path)

        return JsonResponse({
            'extension': magic_data,
        })


class ChunkedUpload(ChunkedUploadView):

    def on_completion(self, uploaded_file, request):
        print(uploaded_file)
        return JsonResponse({'status': 'ok'})
