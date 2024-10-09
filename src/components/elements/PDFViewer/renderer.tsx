import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  type PDFPageProxy,
  type RenderTask,
} from 'pdfjs-dist';

export interface RendererHandle {
  render: (page: PDFPageProxy) => Promise<void>;
}

export interface Props {
  readonly width: number;
  readonly rotation?: number;
  readonly loadRatio: number;
  readonly inTransition: boolean;
}

const Renderer: React.ForwardRefRenderFunction<RendererHandle, Props> = (({ width, rotation = 0, loadRatio, inTransition }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);

  useImperativeHandle(ref, () => ({
    render: async (page: PDFPageProxy) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      // Cancel the previous render task if it exists
      renderTaskRef.current?.cancel();

      const viewport = page.getViewport({ scale: 1, rotation });
      const scale = width / viewport.width;
      ctx.canvas.height = viewport.height * scale;
      ctx.canvas.width = width;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.beginPath();

      renderTaskRef.current = page.render({
        canvasContext: ctx,
        viewport: page.getViewport({ scale, rotation }), // Scale to fit in the canvas
      });
      await renderTaskRef.current.promise.then(() => (renderTaskRef.current = null));
    },
  }), [width, rotation]);

  return (
    <>
      {(inTransition || loadRatio < 100)
        ? (
          <div className='uk-flex uk-flex-center uk-flex-middle uk-height-large'>
            <progress className='uk-progress uk-progress-primary' value={loadRatio} max='100' />
          </div>
        )
        : (
          <canvas aria-label='PDF Slideshow' ref={canvasRef} >PDF</canvas>
        )}
    </>
  );
});

export default forwardRef(Renderer);
