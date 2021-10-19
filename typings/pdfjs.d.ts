/**
 * Allows controlling of the rendering tasks.
 */
declare class RenderTask {
  constructor(internalRenderTask: any);
  _internalRenderTask: any;
  /**
   * Callback for incremental rendering -- a function that will be called
   * each time the rendering is paused.  To continue rendering call the
   * function that is the first argument to the callback.
   * @type {function}
   */
  onContinue: Function;
  /**
   * Promise for rendering task completion.
   * @type {Promise<void>}
   */
  get promise(): Promise<void>;
  /**
   * Cancels the rendering task. If the task is currently rendering it will
   * not be cancelled until graphics pauses with a timeout. The promise that
   * this object extends will be rejected when cancelled.
   */
  cancel(): void;
}
