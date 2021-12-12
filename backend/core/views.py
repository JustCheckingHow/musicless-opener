from django.views.generic import View
from django.http import JsonResponse
from chunked_upload.views import ChunkedUploadView
from core.utils import (
    is_schema_correct,
    get_openable_by_info,
    get_filename_extension
)
import magic
from core.models import Document
from django.shortcuts import get_object_or_404
from django.http import FileResponse
from core.signature_validator import SignatureValidator
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django_renderpdf.views import PDFView


from django.views.generic.base import TemplateView


class Opener(View):

    def post(self, request):
        res = {}

        for file_pk, myfile in request.FILES.items():

            document = Document.objects.create(title=myfile.name, document=myfile)
            path = document.document.path

            # Reading from file, due to buffer size concerns
            magic_data = magic.from_file(path, mime=True)
            document.real_extension = magic_data

            if 'xml' in magic_data:
                document.valid, document.template_url, document.xsl_url = is_schema_correct(path)

            document.save()

            res[file_pk] = document.pk

        if not res:
            return JsonResponse({'error': 'No file was uploaded'})

        return JsonResponse(res)


class Files(View):

    def get(self, request, file_pk):
        doc = get_object_or_404(Document, pk=file_pk)

        extension_logo, openable_by = get_openable_by_info(doc)

        return JsonResponse({
            'pk': doc.pk,
            'title': doc.title,
            'uploaded_at': doc.uploaded_at,
            'size': doc.document.size,
            'valid': doc.valid,
            'schema_url': doc.template_url,
            'real_extension': doc.real_extension,
            'extension_logo': extension_logo,
            'openable_by': openable_by
        })


class Signature(View):
    def get(self, request, file_pk):
        response = {}
        doc = Document.objects.get(pk=file_pk)
        try:
            if doc.real_extension == 'pdf':
                pdf_status = SignatureValidator.validate_pdf(doc.document)
                response['signature_status'] = pdf_status
            elif doc.real_extension == 'xml':
                data = SignatureValidator.validate_xml(doc.document)  # I'm not entirely sure whether this is a correct way to get file
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
                response = {'file': f'error: {str(e)}'}
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


# class ReportPDF(TemplateView):
#     template_name = 'report.html'

#     def get_context_data(self, *args, **kwargs):
#         context = super().get_context_data(*args, **kwargs)
#         doc = get_object_or_404(Document, pk=self.kwargs['pk'])
#         context['doc'] = doc

#         extension_logo, openable_by = get_openable_by_info(doc)

#         context['openable_by'] = ' | '.join(list(map(lambda x: x.replace('_', ' '), openable_by)))
#         declared_ext = get_filename_extension(doc.title)
#         context['extension_diff'] = declared_ext if declared_ext else '(no extension)' + ' vs ' + doc.real_extension

#         return context


class ReportPDF(PDFView):
    template_name = 'report.html'
    prompt_download = True

    @property
    def download_name(self) -> str:
        doc = get_object_or_404(Document, pk=self.kwargs['pk'])
        return f'{doc.title}_report.pdf'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        doc = get_object_or_404(Document, pk=self.kwargs['pk'])
        context['doc'] = doc

        extension_logo, openable_by = get_openable_by_info(doc)

        context['openable_by'] = ' | '.join(list(map(lambda x: x.replace('_', ' '), openable_by)))
        declared_ext = get_filename_extension(doc.title)
        context['extension_diff'] = declared_ext if declared_ext else '(no extension)' + ' vs ' + doc.real_extension

        return context
