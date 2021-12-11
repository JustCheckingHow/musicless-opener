from django.views.generic import View
from django.http import JsonResponse
from chunked_upload.views import ChunkedUploadView
from django.core.files.storage import FileSystemStorage
# from core.forms import UploadForm
from core.utils import is_schema_correct
from core.forms import DocumentForm
import magic
import os
from core.models import Document


class Opener(View):

    def post(self, request):
        filename, myfile = list(request.FILES.items())[0]
        if not myfile:
            return JsonResponse({'error': 'No file was uploaded'})

        document = Document.objects.create(title=filename, document=myfile)
        path = document.document.path

        # Reading from file, due to buffer size concerns
        magic_data = magic.from_file(path)
        document.real_extension = magic_data

        if magic_data.split()[0].lower() == 'xml':
            document.valid = is_schema_correct(path)

        document.save()
        # fs.delete(path)

        return JsonResponse({'file_pk': document.pk})


class Files(View):

    def get(self, request, file_pk):
        doc = Document.objects.get(pk=file_pk)
        return JsonResponse({
            'pk': doc.pk,
            'title': doc.title,
            # 'document': doc.document,
            'uploaded_at': doc.uploaded_at,
            'valid': doc.valid,
            'real_extension': doc.real_extension,
        })


class ChunkedUpload(ChunkedUploadView):

    def on_completion(self, uploaded_file, request):
        print(uploaded_file)
        return JsonResponse({'status': 'ok'})
