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
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt



class Opener(View):

    def get(self, request):
        return JsonResponse({'token': get_token(request)})

    def post(self, request):
        try:
            filename, myfile = list(request.FILES.items())[0]
        except IndexError:
            return JsonResponse({'error': 'No filename was provided'})

        if not myfile:
            return JsonResponse({'error': 'No file was uploaded'})

        document = Document.objects.create(title=filename, document=myfile)
        path = document.document.path

        # Reading from file, due to buffer size concerns
        magic_data = magic.from_file(path)
        document.real_extension = magic_data

        if magic_data.split()[0].lower() == 'xml':
            document.valid, document.template_url = is_schema_correct(path)

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
            'schema_url': doc.template_url,
            'real_extension': doc.real_extension,
        })


class Signature(View):
    def get(self, request, file_pk):
        response = {}
        doc = Document.objects.get(pk=file_pk)
        try:
            data = SignatureValidator.run(doc.document)  # I'm not entirely sure whether this is a correct way to get file
            if data:
                response['signature_status'] = 'OK'
                response['signature_reports'] = response
            else:
                response['signature_status'] = 'Not signed'
        except Exception as e:
            response['error'] = str(e)
        if data:
            try:
                file = SignatureValidator.rip_file_from_xml(doc.document)
                response['rip_status'] = 'OK'
                if file:
                    response['rip_id'] = file
            except Exception as e:
                response['file': f'error: {str(e)}']
        return JsonResponse(response)


class FileContents(View):

    def get(self, request, file_pk):
        doc = get_object_or_404(Document, pk=file_pk)
        return FileResponse(doc.document, content_type='application/xml')


@method_decorator(csrf_exempt, name='dispatch')
class ChunkedUpload(ChunkedUploadView):
    authentication_classes = []
    permission_classes = []

    def check_permissions(self, request):
        pass

    def on_completion(self, uploaded_file, request):
        doc = Document.objects.create(title=uploaded_file.name, document=uploaded_file)
        return JsonResponse({'file_pk': doc.pk})
