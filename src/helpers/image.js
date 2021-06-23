/* eslint-disable camelcase */
import file_doc from '../../public/images/icon/doc.png';
import file_pdf from '../../public/images/icon/pdf.png';
import file_error from '../../public/images/icon/error-image-generic.png';

const imgExt = [
  'jpg',
  'jpeg',
  'png',
  'bmp',
  'svg',
  'JPG',
  'JPEG',
  'PNG',
  'BMP',
  'SVG'
];

export function getImage(path) {
  const params = path || '';
  if (params.includes('pdf')) {
    return file_pdf;
  }
  if (params.includes('doc')) {
    return file_doc;
  }

  const temp = imgExt.find(x => params.toLowerCase().includes(x));

  return temp ? params : file_error;
}

export function cekImageExt(ext) {
  if (ext && ext !== '') {
    const data = ext.path.split('.');
    return !!imgExt.includes(data[data.length - 1].toLowerCase());
  }
  return null;
}

export function validateImage(data) {
  return !!imgExt.includes(data);
}
