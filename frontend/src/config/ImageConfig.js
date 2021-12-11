import AsicLogo from '../assets/extensions/asic-logo.png';
import Pandadoc from '../assets/extensions/sublime-text.png';
import AviLogo from '../assets/extensions/avi-logo.png';
import Allplayer from '../assets/extensions/allplayer.png';
import Ffmpeg from '../assets/extensions/ffmpeg.png';
import VlcMediaPlayer from '../assets/extensions/vlc-media-player.png';
import WindowsMediaPlayer from '../assets/extensions/windows-media-player.png';
import PdfLogo from '../assets/extensions/pdf-logo.png';
import AbodeAcrobatLogo from '../assets/extensions/adobe-acrobat.png';
import AbodeReaderLogo from '../assets/extensions/adobe-reader.png';
import GoogleChromeLogo from '../assets/extensions/google-chrome.png';
import MozillaFirefoxLogo from '../assets/extensions/mozilla-firefox.png';
import XmlLogo from '../assets/extensions/xml-logo.png';
import VstLogo from '../assets/extensions/microsoft-visual-studio.png';
import NotepadTextEditorLogo from '../assets/extensions/notepad-text-editor.png';
import XmlWriter from '../assets/extensions/xmlwriter.png';
import TxtLogo from '../assets/extensions/txt-logo.png';
import MicrosoftWord from '../assets/extensions/microsoft-word.png';
import NotepadTextEditor from '../assets/extensions/notepad-text-editor.png';
import Vim from '../assets/extensions/vim.png';
import WindowsNotepad from '../assets/extensions/windows-notepad.png';
import RtfLogo from '../assets/extensions/rtf.png';
import ApacheOpenOffice from '../assets/extensions/apache-openoffice.png';
import XpsLogo from '../assets/extensions/xps-logo.png';
import MicrosoftExcel from '../assets/extensions/microsoft-excel.png';
import MicrosoftPowerPoint from '../assets/extensions/microsoft-powerpoint.png';
import OdtLogo from '../assets/extensions/odt-logo.png';
import LibreOffice from '../assets/extensions/libreoffice.png';
import OdsLogo from '../assets/extensions/ods-logo.png';
import OpdLogo from '../assets/extensions/odp-logo.png';
import DocLogo from '../assets/extensions/doc-logo.png';
import XlsLogo from '../assets/extensions/xls-logo.png';
import PptLogo from '../assets/extensions/ppt-logo.png';
import Canvas from '../assets/extensions/canvas.png';
import DocxLogo from '../assets/extensions/docx-logo.png';
import XlsxLogo from '../assets/extensions/xlsx-logo.png';
import PptxLogo from '../assets/extensions/pptx-logo.png';
import CsvLogo from '../assets/extensions/csv-logo.png';
import JpgLogo from '../assets/extensions/jpg-logo.png';
import IrfanView from '../assets/extensions/irfanview.png';
import GooglePicasa from '../assets/extensions/google-picasa.png';
import TifLogo from '../assets/extensions/tif-logo.png';
import PngLogo from '../assets/extensions/png-logo.png';
import SvgLogo from '../assets/extensions/svg-logo.png';
import AdobeFlashPlayer from '../assets/extensions/adobe-flash-player.png';
import CorelDraw from '../assets/extensions/coreldraw.png';
import WavLogo from '../assets/extensions/wav-logo.png';
import QuickTimePlayer from '../assets/extensions/quicktime-player.png';
import Mp3Logo from '../assets/extensions/mp3-logo.png';
import MpgLogo from '../assets/extensions/mpg-logo.png';
import Mp4Logo from '../assets/extensions/mp4-logo.png';
import OggLogo from '../assets/extensions/ogg-logo.png';
import OgvLogo from '../assets/extensions/ogv-logo.png';
import ZipLogo from '../assets/extensions/zip-logo.png';
import SevenZip from '../assets/extensions/sevenzip.png';
import Winrar from '../assets/extensions/winrar.png';
import TarLogo from '../assets/extensions/tar-logo.png';
import GzLogo from '../assets/extensions/gz-logo.png';
import SevenzipLogo from '../assets/extensions/sevenzip-logo.png';
import HtmlLogo from '../assets/extensions/html-logo.png';
import XhtmlLogo from '../assets/extensions/xhtml-logo.png';
import CssLogo from '../assets/extensions/css-logo.png';
import XsdLogo from '../assets/extensions/xsd-logo.png';
import GmlLogo from '../assets/extensions/gml-logo.png';
import FmeDesktop from '../assets/extensions/fme-desktop.png';
import Merkaartor from '../assets/extensions/merkaartor.png';
import RngLogo from '../assets/extensions/rng-logo.png';
import Default from '../assets/extensions/default.png';
import XslLogo from '../assets/extensions/xsl-logo.png';
import XsltLogo from '../assets/extensions/xslt-logo.png';
import SigLogo from '../assets/extensions/sig-logo.png';
import MicrosoftOfice from '../assets/extensions/microsoft-office.png';
import MicrosoftOutlook from '../assets/extensions/microsoft-outlook.png';

export const ImageConfig = {
    asic: {
        name: 'ASiC ',
        category: 'Kontener podpiswów elektronicznych',
        logo: AsicLogo,
        logos: {
            pandadoc: Pandadoc
        }
    },
    pdf: {
        name: 'Portable Document Format',
        logo: PdfLogo,
        category: 'Layout Files',
        logos: {
            adobe_acrobat: AbodeAcrobatLogo,
            adobe_reader: AbodeReaderLogo,
            google_chrome: GoogleChromeLogo,
            mozilla_firefox: MozillaFirefoxLogo
        }
    },
    txt: {
        name: 'Plain Text Format',
        category: 'Text files',
        logo: TxtLogo,
        logos: {
            microsoft_word: MicrosoftWord,
            notepad_text_editor: NotepadTextEditor,
            vim: Vim,
            windows_notepad: WindowsNotepad
        }
    },
    rtf: {
        name: 'Rich Text Format',
        category: 'Text Files',
        logo: RtfLogo,
        logos: {
            microsoft_word: MicrosoftWord,
            apache_openoffice: ApacheOpenOffice
        }
    },
    xps: {
        name: 'XML Paper Specification Format',
        category: 'Layout Files',
        logo: XpsLogo,
        logos: {
            microsoft_word: MicrosoftWord,
            microsoft_excel: MicrosoftExcel,
            microsoft_powerpoint: MicrosoftPowerPoint
        }
    },
    odt: {
        name: 'OpenDocument Text Document',
        category: 'Text Files',
        logo: OdtLogo,
        logos: {
            apache_openoffice: ApacheOpenOffice,
            microsoft_word: MicrosoftWord,
            libreoffice: LibreOffice
        }
    },
    ods: {
        name: 'OpenDocument Spreadsheet',
        category: 'Spreadsheet Files',
        logo: OdsLogo,
        logos: {
            microsoft_excel: MicrosoftExcel,
            libreoffice: LibreOffice,
            apache_openoffice: ApacheOpenOffice
        }
    },
    odp: {
        name: 'OpenDocument Presentation',
        category: 'Data Files',
        logo: OpdLogo,
        logos: {
            microsoft_powerpoint: MicrosoftPowerPoint,
            apache_openoffice: ApacheOpenOffice,
            libreoffice: LibreOffice
        }
    },
    doc: {
        name: 'Microsoft Word Document',
        category: 'Text Files',
        logo: DocLogo,
        logos: {
            apache_openoffice: ApacheOpenOffice,
            microsoft_word: MicrosoftWord,
            libreoffice: LibreOffice,
        }
    },
    xls: {
        name: 'Excel Spreadsheet',
        category: 'Spreadsheet Files',
        logo: XlsLogo,
        logos: {
            microsoft_excel: MicrosoftExcel,
            apache_openoffice: ApacheOpenOffice
        }
    },
    ppt: {
        name: 'PowerPoint Presentation',
        category: 'Data Files',
        logo: PptLogo,
        logos: {
            microsoft_powerpoint: MicrosoftPowerPoint,
            apache_openoffice: ApacheOpenOffice,
            canvas: Canvas
        }
    },
    docx: {
        name: 'Microsoft Word Open XML Document',
        category: 'Text Files',
        logo: DocxLogo,
        logos: {
            apache_openoffice: ApacheOpenOffice,
            microsoft_word: MicrosoftWord,
            libreoffice: LibreOffice,
        }
    },
    xslx: {
        name: 'Microsoft Excel Open XML Spreadsheet',
        category: 'Spreadsheet Files',
        logo: XlsxLogo,
        logos: {
            microsoft_excel: MicrosoftExcel,
            apache_openoffice: ApacheOpenOffice
        }
    },
    pptx: {
        name: 'PowerPoint Open XML Presentation',
        category: 'Data Files',
        logo: PptxLogo,
        logos: {
            microsoft_powerpoint: MicrosoftPowerPoint,
            apache_openoffice: ApacheOpenOffice,
            canvas: Canvas
        }
    },
    csv: {
        name: 'Comma Separated Values Format',
        category: 'Data Files',
        logo: CsvLogo,
        logos: {
            microsoft_excel: MicrosoftExcel,
            libreoffice: LibreOffice,
            windows_notepad: WindowsNotepad
        }
    },
    jpg: {
        name: 'JPEG Image',
        category: 'Raster Image Files',
        logo: JpgLogo,
        logos: {
            irfanview: IrfanView,
            google_picasa: GooglePicasa
        }
    },
    tif: {
        name: 'Tagged Image Format',
        category: 'Raster Image Files',
        logo: TifLogo,
        logos: {
            irfanview: IrfanView,
            google_picasa: GooglePicasa
        }
    },
    geotiff: {
        name: 'Geo Tagged Image File Format',
        category: 'Raster Image Files',
        logo: TifLogo,
        logos: {
            irfanview: IrfanView,
            google_picasa: GooglePicasa
        }
    },
    png: {
        name: 'Portable Network Graphic',
        category: 'Raster Image Files',
        logo: PngLogo,
        logos: {
            irfanview: IrfanView,
            google_picasa: GooglePicasa
        }
    },
    svg: {
        name: 'Scalable Vector Graphics Format',
        category: 'Vector Image Files',
        logo: SvgLogo,
        logos: {
            adobe_flash_player: AdobeFlashPlayer,
            corelDraw: CorelDraw
        }
    },
    wav: {
        name: 'WAVE Audio Format',
        category: 'Audio Files',
        logo: WavLogo,
        logos: {
            quicktime_player: QuickTimePlayer,
            vlc_media_player: VlcMediaPlayer
        }
    },
    mp3: {
        name: 'MP3 Audio Format',
        category: 'Audio Files',
        logo: Mp3Logo,
        logos: {
            windows_media_player: WindowsMediaPlayer,
            vlc_media_player: VlcMediaPlayer
        }
    },
    avi: {
        name: 'Audio Video Interleave Format',
        category: 'Video Files',
        logo: AviLogo,
        logos: {
            allplayer: Allplayer,
            ffmpeg: Ffmpeg,
            vlc_media_player: VlcMediaPlayer,
            windows_media_player: WindowsMediaPlayer
        }
    },
    mpg: {
        name: 'MPEG Video Format',
        category: 'Video Files',
        logo: MpgLogo,
        logos: {
            allplayer: Allplayer,
            vlc_media_player: VlcMediaPlayer,
            quicktime_player: QuickTimePlayer
        }
    },
    mp4: {
        name: 'MPEG-4 Video Format',
        category: 'Video Files',
        logo: Mp4Logo,
        logos: {
            allplayer: Allplayer,
            vlc_media_player: VlcMediaPlayer,
            quicktime_player: QuickTimePlayer,
            windows_media_player: WindowsMediaPlayer
        }
    },
    ogg: {
        name: 'Ogg Vorbis Audio Format',
        category: 'Audio Files',
        logo: OggLogo,
        logos: {
            windows_media_player: WindowsMediaPlayer,
            vlc_media_player: VlcMediaPlayer
        }
    },
    ogv: {
        name: 'Ogg Video Format',
        category: 'Video Files',
        logo: OgvLogo,
        logos: {
            vlc_media_player: VlcMediaPlayer,
            windows_media_player: WindowsMediaPlayer
        }
    },
    zip: {
        name: 'Zipped format',
        category: 'Copressed Files',
        logo: ZipLogo,
        logos: {
            sevenzip: SevenZip,
            winrar: Winrar
        }
    },
    tar: {
        name: 'Zipped format',
        category: 'Consolidated Unix Format Archive',
        logo: TarLogo,
        logos: {
            sevenzip: SevenZip,
            winrar: Winrar
        }
    },
    gz: {
        name: 'Zipped format',
        category: 'Consolidated Unix Format Archive',
        logo: GzLogo,
        logos: {
            sevenzip: SevenZip,
            winrar: Winrar
        }
    },
    sevenzip: {
        name: 'Zipped format',
        category: 'Consolidated Unix Format Archive',
        logo: SevenzipLogo,
        logos: {
            sevenzip: SevenZip,
            winrar: Winrar
        }
    },
    html: {
        name: 'Hypertext Markup Language Format',
        category: 'Web Files',
        logo: HtmlLogo,
        logos: {
            google_chrome: GoogleChromeLogo,
            mozilla_firefox: MozillaFirefoxLogo,
            notepad_text_editor: NotepadTextEditor
        }
    },
    xhtml: {
        name: 'Extensible Hypertext Markup Language Format',
        category: 'Web Files',
        logo: XhtmlLogo,
        logos: {
            google_chrome: GoogleChromeLogo,
            mozilla_firefox: MozillaFirefoxLogo,
            notepad_text_editor: NotepadTextEditor
        }
    },
    css: {
        name: 'Cascading Style Sheet',
        category: 'Web Files',
        logo: CssLogo,
        logos: {
            mozilla_firefox: MozillaFirefoxLogo,
            google_chrome: GoogleChromeLogo,
            notepad_text_editor: NotepadTextEditor
        }
    },
    xml: {
        name: 'XML Format',
        logo: XmlLogo,
        category: 'Data Files',
        logos: {
            visual_studio: VstLogo,
            notepad_text_editor: NotepadTextEditorLogo,
            xmlwriter: XmlWriter
        },
    },
    xsd: {
        name: 'XML Schema Definition',
        category: 'Developer Files',
        logo: XsdLogo,
        logos: {
            notepad_text_editor: NotepadTextEditor,
            visual_studio: VstLogo
        }
    },
    gml: {
        name: 'Geography Markup Language Format',
        category: 'GIS Files',
        logo: GmlLogo,
        logos: {
            fme_desktop: FmeDesktop,
            merkaartor: Merkaartor
        }
    },
    rng: {
        name: 'Random Number Generator Data Format',
        category: 'Data Files',
        logo: RngLogo,
        logos: {
            default: Default
        }
    },
    xsl: {
        name: 'Microsoft SharePoint WorkSpace Groove Database Format',
        category: 'Database Files',
        logo: XslLogo,
        logos: {
            visual_studio: VstLogo,
            notepad_text_editor: NotepadTextEditor,
            NotepadTextEditor: NotepadTextEditor
        }
    },
    xslt: {
        name: 'XSL Transformation Format',
        category: 'Data Files',
        logo: XsltLogo,
        logos: {
            visual_studio: VstLogo,
            notepad_text_editor: NotepadTextEditor,
            NotepadTextEditor: NotepadTextEditor
        }
    },
    tsl: {
        name: 'Tracker Status Log',
        category: 'Data Files',
        logo: Default,
        logos: {
            default: Default
        }
    },
    xmlsig: {
        name: 'Signature Format',
        category: 'Text files',
        logo: SigLogo,
        logos: {
            microsoft_outlook: MicrosoftOutlook,
            microsoft_office: MicrosoftOfice
        }
    },
    xades: {
        name: 'XAdES',
        category: 'Eletronical signature',
        logo: Default,
        logos: {
            sigillum_sign: Default
        }
    },
    pades: {
        name: 'PAdES',
        category: 'Eletronical signature',
        logo: Default,
        logos: {
            default: Default
        }
    },
    cades: {
        name: 'CAdES',
        category: 'Eletronical signature',
        logo: Default,
        logos: {
            default: Default
        }
    },
    asic: {
        name: 'ASiC',
        category: 'Eletronical signature',
        logo: Default,
        logos: {
            default: Default
        }
    },
    xmlenc: {
        name: 'XMLenc',
        category: 'Eletronical signature',
        logo: Default,
        logos: {
            default: Default
        }
    },
}
