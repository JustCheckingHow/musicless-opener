from core.filetypes import extension_data, app_icons
from django.conf import settings
from bs4 import BeautifulSoup
import requests
# import xml.etree.ElementTree as ET
import xmlschema
import re
import os


def _get_schema_links(xml_file_path):
    try:
        with open(xml_file_path, 'r') as f:
            content = f.readlines()

        urls = re.findall(
            r'http[s]?://(?:[a-zA-Z]|[0-9]|'
            r'[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+',
            str(content))
    except UnicodeDecodeError:
        return []

    return urls


def _get_schemas(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    links = soup.find_all('a')

    schemas = [
        link.get('href')
        for link in links
        if  link.get('href') and link.get('href').endswith('.xsd')]
    schemas = list(map(
        lambda x: url + x[2:] if 'http' not in x else x,
        schemas))

    return schemas


def is_schema_correct(xml_file_path):
    def _generate_xsl_link(url):
        return url.replace('.xsd', '.xsl')

    schemas = []
    for url in _get_schema_links(xml_file_path):
        schemas = [*schemas, *_get_schemas(url)]

    for schema_url in schemas:
        schema_response = requests.get(schema_url)
        schema_path = os.path.join(settings.MEDIA_ROOT, 'schema.xsd')
        open(schema_path, 'wb').write(schema_response.content)

        try:
            xmlschema.validate(xml_file_path, schema_path)
            break
        except Exception:
            pass
    else:
        return False, None, None

    return True, schema_url, _generate_xsl_link(schema_url)


def get_openable_by_info(doc):
    ext_list = doc.real_extension.lower().split('/')
    aux = None
    for ext in ext_list:
        aux = extension_data.get(ext)
        if aux:
            break

    return aux['logo'], list(aux['logos'].keys())
