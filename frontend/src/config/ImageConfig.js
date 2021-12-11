import PdfLogo from '../assets/pdf/pdf-logo.png';
import AbodeAcrobatLogo from '../assets/pdf/adobe-acrobat.png';
import AbodeReaderLogo from '../assets/pdf/adobe-reader.png';
import GoogleChromeLogo from '../assets/pdf/google-chrome.png';
import MozillaFirefoxLogo from '../assets/pdf/mozilla-firefox.png';

import XmlLogo from '../assets/xml/xml-logo.png';
import VstLogo from '../assets/xml/microsoft-visual-studio.png';
import NotepadTextEditorLogo from '../assets/xml/notepad-text-editor.png';
import XmlWriter from '../assets/xml/xmlwriter.png';

import fileDefault from '../assets/file-blank-solid-240.png';
import fileCSS from '../assets/file-css-solid-240.png';
import filePdf from '../assets/file-pdf-solid-240.png';
import filePng from '../assets/file-png-solid-240.png';


export const ImageConfig = {
    pdf: {
        name: 'Portable Document Format',
        logo: PdfLogo,
        logos: {
            adobe_acrobat: AbodeAcrobatLogo,
            adobe_reader: AbodeReaderLogo,
            google_chrome: GoogleChromeLogo,
            mozilla_firefox: MozillaFirefoxLogo
        }
    },
    xml: {
        name: 'XML Format',
        logo: XmlLogo,
        logos: {
            visual_studio: VstLogo,
            notepad_text_editor: NotepadTextEditorLogo,
            xmlwriter: XmlWriter
        },
    },
    default: fileDefault,
    pdf: filePdf,
    png: filePng,
    css: fileCSS
}