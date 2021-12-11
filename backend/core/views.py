from django.views.generic import View
from django.http import JsonResponse
from chunked_upload.views import ChunkedUploadView
# from core.forms import UploadForm
from core.utils import is_schema_correct
import magic
from core.models import Document
from django.shortcuts import get_object_or_404
from django.http import FileResponse
from core.signature_validator import SignatureValidator


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
        doc = get_object_or_404(Document, pk=file_pk)
        return JsonResponse({
            'pk': doc.pk,
            'title': doc.title,
            'uploaded_at': doc.uploaded_at,
            'valid': doc.valid,
            'real_extension': doc.real_extension,
        })

class Signature(View):
    def get(self, request, file_pk):
        response = {}
        doc = Document.objects.get(pk=file_pk)
        try:
            data = SignatureValidator.run(doc)
            if data:
                response['signature_status'] = 'OK'
                response['signature_reports'] = response
            else:
                response['signature_status'] = 'Not signed'
        except Exception as e:
            response['error'] = str(e)
        return JsonResponse(response)


class FileContents(View):

    def get(self, request, file_pk):
        doc = get_object_or_404(Document, pk=file_pk)
        return FileResponse(doc.document, content_type='application/xml')


class ChunkedUpload(ChunkedUploadView):
    authentication_classes = []
    permission_classes = []

    def check_permissions(self, request):
        pass

    def on_completion(self, uploaded_file, request):
        doc = Document.objects.create(title=uploaded_file.name, document=uploaded_file)
        return JsonResponse({'file_pk': doc.pk})
