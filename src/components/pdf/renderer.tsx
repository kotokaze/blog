import { useEffect, useRef, useState } from 'react'
import type {
  PDFDocumentProxy,
  RenderParameters,
  RenderTask,
} from 'pdfjs-dist/types/src/display/api'

interface RenderOptions {
  width: number
  rotation?: number
}

interface Props extends RenderOptions {
  pdfDoc: PDFDocumentProxy
  pageNum: number
}

const DocumentRenderer: React.VFC<Props> = ({
  pdfDoc,
  pageNum,
  width,
  rotation = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderRef = useRef<boolean>(false)
  const [pageNumPending, setPageNumPending] = useState<number>(-1)
  const [prevTask, setTask] = useState<RenderTask>()

  useEffect(() => {
    const renderPage = (idx: number) => {
      // Cancel previous unfinished render task
      if (prevTask) prevTask.cancel()
      setTask(undefined)

      // Start new render
      renderRef.current = true

      // Get page by index and render it
      pdfDoc.getPage(idx).then((pdfPage) => {
        // Set canvas dimensions
        let viewport = pdfPage.getViewport({ scale: 1, rotation })
        const scale = width / viewport.width
        const canvas = canvasRef.current!
        canvas.height = viewport.height * scale
        canvas.width = width
        canvas.id = `pdf-page-${idx}`

        // Prepare canvas for rendering
        const ctx = canvas.getContext('2d')!
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.beginPath()

        // Scale to the canvas size
        viewport = pdfPage.getViewport({ scale, rotation })
        const params: RenderParameters = {
          canvasContext: ctx,
          viewport: viewport,
        }

        // Set render task
        const renderTask: RenderTask = pdfPage.render(params)

        // Cache render task
        setTask(renderTask)

        // Render PDF page into canvas context
        renderTask.promise.then(() => {
          renderRef.current = false

          // Render next page if there is one
          if (pageNumPending !== -1) {
            renderPage(pageNumPending)
            setPageNumPending(-1)
          }
        })
      })
    }

    const queryRenderPage = (idx: number) => {
      if (renderRef.current) setPageNumPending(pageNumPending)
      else renderPage(idx)
    }

    queryRenderPage(pageNum)
    document.getElementById('page-num')!.textContent = pageNum.toString()
  }, [pdfDoc, pageNum, prevTask, rotation, width, pageNumPending])

  return pug`
    canvas(ref=canvasRef)
  `
}

export type { RenderOptions }
export default DocumentRenderer
