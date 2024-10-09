'use client';
import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import {
  type PDFDocumentProxy,
  getDocument,
  GlobalWorkerOptions,
  type OnProgressParameters,
  PDFWorker,
  version as pdfjsVersion,
} from 'pdfjs-dist';
import { useKey } from '@/hooks/useKey';
import Renderer from './renderer';

interface Props {
  readonly src: string | Uint8Array;
  readonly useCdn?: boolean;
  readonly index?: number;
}

const PDFViewer: React.FC<Props> = ({ src, useCdn = false, index }) => {
  let workerSrc: string;
  // workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`;
  workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.mjs`;
  if (!useCdn) {
    workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).href;
  }
  GlobalWorkerOptions.workerSrc = workerSrc;

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(375); // Default width
  useEffect(() => {
    if (!containerRef.current) return;
    setWidth(containerRef.current.getBoundingClientRect().width);
  }, [containerRef]);

  const [pageNum, setPageNum] = useState<number>(index ?? 1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loadRatio, setLoadRatio] = useState<number>(0);

  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const pdfWorkerRef = useRef<PDFWorker | null>(null);
  const rendererRef = useRef<React.ComponentRef<typeof Renderer>>(null);
  const [inTransition, startTransition] = useTransition();

  useEffect(() => {
    const renderPage = async (page: number) => {
      if (!(pdfRef.current && pdfWorkerRef.current)) return;

      await pdfRef.current.getPage(page).then(async (pdfPage) => {
        await rendererRef.current?.render(pdfPage);
      });
    };

    pdfWorkerRef.current = new PDFWorker();
    const loadingTask = getDocument({
      ...(src instanceof Uint8Array ? { data: src } : { url: src }),
      cMapPacked: true,
      enableHWA: true,
      enableXfa: true,
      worker: pdfWorkerRef.current,
    });

    loadingTask.onProgress = (params: Readonly<OnProgressParameters>): void => {
      if (params.total <= 0) return void setLoadRatio(0);

      // Load ratio can be more than 100%
      setLoadRatio(Math.min(100, (100 * params.loaded) / params.total));
    };

    loadingTask.promise
      .then(async (pdf) => {
        pdfRef.current = pdf;
        setTotalPages(pdf.numPages);
        await renderPage(pageNum);
      })
      .catch((e: unknown) => {
        console.error(e);
      });

    return () => {
      void (async (): Promise<void> => (void await loadingTask.destroy()))();
      pdfWorkerRef.current?.destroy();
    };
  }, [src, pageNum]);

  // Set up keyboard listeners
  useKey('Enter', () => void toNextPage());
  useKey('ArrowRight', () => void toNextPage());
  useKey('ArrowLeft', () => void toPrevPage());

  const isValidPageNum = (page: number): boolean => {
    if (page < 1) return false;
    if (totalPages < page) return false;
    return true;
  };

  const toPrevPage = () => {
    const prev = pageNum - 1;

    if (!isValidPageNum(prev)) return;
    startTransition(() => void setPageNum(prev));
  };

  const toNextPage = () => {
    const next = pageNum + 1;

    if (!isValidPageNum(next)) return;
    startTransition(() => void setPageNum(next));
  };

  return (
    <>
      <div ref={containerRef} aria-label='pdf-viewer' data-uk-height-viewport='offset-top: true; offset-bottom: 15'>
        <Renderer ref={rendererRef} width={width} loadRatio={loadRatio} inTransition={inTransition} />
      </div>

      <div aria-label='pdf-controller' className='uk-remove-margin-top'>
        <div className='uk-flex uk-flex-center'>
          <button
            type='button'
            onClick={toPrevPage}
            disabled={pageNum <= 1}
            className='uk-button uk-active uk-margin-small-right'
            aria-label='To Previous Page'
            data-uk-icon='icon: chevron-double-left; ratio: 1.5'
            data-uk-tooltip='title: Previous page; pos: bottom; delay: 200'
          />
          <p>
            {pageNum} / {totalPages}
          </p>
          <button
            type='button'
            onClick={toNextPage}
            disabled={totalPages <= pageNum}
            className='uk-button uk-active uk-margin-small-right'
            aria-label='To Next Page'
            data-uk-icon='icon: chevron-double-right; ratio: 1.5'
            data-uk-tooltip='title: Next page; pos: bottom; delay: 200'
          />

          <div className='uk-flex uk-flex-right uk-visible@m'>
            <button
              type='button'
              className='uk-button uk-active'
              aria-label='Usage Information'
              data-uk-icon='icon: info'
              data-uk-tooltip='title: [←] Previous Page<br/>[→ / Enter] Next Page; pos: bottom; delay: 200'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFViewer;
