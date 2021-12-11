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
        if link.get('href').endswith(('.xsd', '.xsl'))]
    schemas = list(map(
        lambda x: url + x[2:] if 'http' not in x else x,
        schemas))
    return schemas


def is_schema_correct(xml_file_path):
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
        return False, None

    return True, schema_url
