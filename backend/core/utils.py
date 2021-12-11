import requests
from bs4 import BeautifulSoup as soup
import xml.etree.ElementTree as ET
import codecs


def _get_schemas(url):
    # requests directory listing from http server provided in url
    response = requests.get(url)
    # parse directory listing
    soup = BeautifulSoup(response.text, 'html.parser')
    # find all links to schemas
    links = soup.find_all('a')
    # extract links to schemas
    schemas = [link.get('href') for link in links if link.get('href').endswith('.xsd')]
    return schemas


def _get_schema_links(xml_file):
    # find all links to schemas in xml file
    tree = ET.parse(xml_file)
    root = tree.getroot()
    schemas = root.findall('.//{http://www.w3.org/2001/XMLSchema-instance}schemaLocation')
    # extract links to schemas
    schema_links = [schema.text for schema in schemas]
    print(schema_links)
    
    return schema_links



    # with open(xml_file, 'r', encoding='iso-8859-1') as f:
    #     xml = f.read()
    # root = ET.fromstring(xml)

    # # find values in xmls:ed tags
    # schemas = root.findall('.//xmlns:etd', namespaces={'ed': 'http://crd.gov.pl/xml/schematy'})
    # print(schemas)

    # # etd_ns = root.findall('./Deklaracja[@class="xmlns:etd"]')
    # # etd_ns = root.findall('xmlns:etd')

    # print(etd_ns)

    # return etd_ns


def schema_check(xml_file):
    aux = _get_schema_links(xml_file)

    # # split link into schema and location
    # schema, location = schema_link.split()
    # # check if schema is valid
    # try:
    #     xml_file.schema = location
    #     xml_file.validate()
    # except Exception as e:
    #     print('Schema validation failed: {}'.format(e))
    #     return False
    # return True
