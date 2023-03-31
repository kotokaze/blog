import {
  version as pdfjsVersion,
  GlobalWorkerOptions,
} from 'pdfjs-dist';

interface Props {
  src?: string;
  children: React.ReactNode;
}

const Worker: React.FC<Props> = ({
  src,
  children,
}) => {
  const cdn: string = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`
  GlobalWorkerOptions.workerSrc = (src) ? src : cdn;

  return pug`
    = children
  `;
};

export default Worker;
