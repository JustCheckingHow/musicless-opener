import requests
from bs4 import BeautifulSoup

class SignatureValidator:

        API_URL = "https://ec.europa.eu/cefdigital/DSS/webapp-demo/validation"

        @classmethod
        def request_validation(cls, file):

            get_resp = requests.get(
                cls.API_URL,
                headers = {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Upgrade-Insecure-Requests": "1",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "cross-site",
                    "Cache-Control": "max-age=0"
                }
            )

            soup = BeautifulSoup(get_resp.content, 'html.parser')


            csrf_tag = soup.find('meta', attrs={'name': '_csrf'}).get('content')
            csrf = csrf_tag

            # TODO: more filters are available
            files = {
                '_csrf': (None, csrf),
                'signedFile': ('test.xml', file, 'text/xml'),
                'validationLevel': (None, 'ARCHIVAL_DATA'),
            }

            post_resp = requests.post(
                cls.API_URL,
                cookies=get_resp.cookies,
                # tag: {filename, fileobj, content_type, headers}
                files=files,
                headers= {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:94.0) Gecko/20100101 Firefox/94.0",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Upgrade-Insecure-Requests": "1",
                    "Sec-Fetch-Dest": "document",
                    "Sec-Fetch-Mode": "navigate",
                    "Sec-Fetch-Site": "same-origin",
                    "Sec-Fetch-User": "?1"
                }
            )

            return post_resp

        @staticmethod
        def parse_response(resp):  # Returns raport 

            soup = BeautifulSoup(resp.content, 'html.parser')
            data = soup.find_all('pre')
            data = list(map(lambda x: x.text, data))

            return data

        @staticmethod
        def is_signed(data):
            if data.find('<ds:Signature') == -1:
                return False
            return True

        @classmethod
        def run(cls, file):
            """Returns signature reports or None

            Args:
                file (TextIoWrapper): input file

            Returns:
                list|None: list of two xml reports or None if file isn't signed
            
            Raises:
                A lot of stuff, execute only in try block
            """
            if cls.is_signed(file.read()):
                response = cls.request_validation(file)
                parsed = cls.parse_response(response)
                return parsed
            else:
                return None
