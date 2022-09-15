import { pdfjsApi } from "@/modules/pdfjs";

interface Props {
  src: string;
  children: React.ReactNode;
}

const Worker: React.FC<Props> = ({
  src,
  children,
}) => {
  const cdn: string = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsApi.version}/build/pdf.worker.min.js`
  pdfjsApi.GlobalWorkerOptions.workerSrc = (src === '') ? cdn : src;

  return pug`
    = children
  `;
};

export default Worker;
