import { useEffect, useState } from 'react'
import { useKey } from '@/hooks/useKey'
import { PDFWorker, getDocument } from 'pdfjs-dist'
import Renderer from './renderer'; Renderer
import type { CharMap } from './viewer'
import type { RenderOptions } from './renderer'
import type { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api'
import type {
  OnProgressParameters,
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
} from 'pdfjs-dist'

interface LoaderOptions {
  src: string | Uint8Array
  page?: number
  cMap?: CharMap
}

interface Props extends LoaderOptions {
  options: RenderOptions
}

const DocumentLoader: React.FC<Props> = ({ src, page, cMap, options }) => {
  type LoadState = 'loading' | 'loaded' | 'error'
  const [status, setStatus] = useState<LoadState>('loading')
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>()
  const [loadRate, setLoadRate] = useState<number>(0)
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNum, setPageNum] = useState<number>(page || 1)

  useEffect(() => {
    const worker = new PDFWorker()

    const params: DocumentInitParameters = {
      ...(typeof src === 'string' ? { url: src } : { data: src }),
      worker,
      ...cMap,
    }

    // Set up the loading task
    const loadingTask: PDFDocumentLoadingTask = getDocument(params)
    loadingTask.onProgress = (progress: OnProgressParameters) =>
      progress.total > 0
        ? setLoadRate(Math.min(100, (100 * progress.loaded) / progress.total))
        : setLoadRate(0)

    // Load the document
    loadingTask.promise
      .then((doc: PDFDocumentProxy) => setPdfDoc(doc))
      .catch(() => setStatus('error'))

    return () => {
      loadingTask.destroy()
      worker.destroy()
    }
  }, [src, cMap])

  useEffect(() => {
    if (loadRate !== 100 || !pdfDoc) return
    setNumPages(pdfDoc.numPages)
    setStatus('loaded')
  }, [loadRate, pdfDoc])

  useEffect(() => {
    document.getElementById('num-pages')!.textContent = numPages.toString()
  }, [numPages])

  const onPrevPage = () => {
    const current: number = pageNum
    if (current <= 1) return
    setPageNum(current - 1)
  }

  const onNextPage = () => {
    const current: number = pageNum
    if (current >= numPages) return
    setPageNum(current + 1)
  }

  // Set up keyboard listeners
  const onEnterPressed = (_: KeyboardEvent) => onNextPage()
  const onArrowRightPressed = (_: KeyboardEvent) => onNextPage()
  const onArrowLeftPressed = (_: KeyboardEvent) => onPrevPage()

  useKey('Enter', onEnterPressed)
  useKey('ArrowRight', onArrowRightPressed)
  useKey('ArrowLeft', onArrowLeftPressed)

  useEffect(() => {
    document.getElementById('prev')?.addEventListener('click', onPrevPage)
    document.getElementById('next')?.addEventListener('click', onNextPage)
    return () => {
      document.getElementById('prev')?.removeEventListener('click', onPrevPage)
      document.getElementById('next')?.removeEventListener('click', onNextPage)
    }
  })

  return pug`
    if (status === "loading")
      p loading Documents...

    else if (status === "loaded")
      Renderer(
        pdfDoc=pdfDoc
        pageNum=pageNum
        ...options
      )

    else
      p An error occered while loading
  `
}

export type { LoaderOptions }
export default DocumentLoader
