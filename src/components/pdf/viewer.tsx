import { useRef } from 'react'
import { useWidth } from '@/hooks/useWidth'
import Worker from './worker'; Worker
import DocumentLoader from './loader'; DocumentLoader
import type { RenderOptions } from './renderer'
import type { LoaderOptions } from './loader'

interface CharMap {
  cMapUrl: string
  cMapPacked: boolean
}

interface Props extends RenderOptions, LoaderOptions {
  workerSrc?: string
}

const Viewer: React.VFC<Props> = ({
  src,
  cMap,
  workerSrc,
  page,
  rotation,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const width = useWidth(ref)
  const options: RenderOptions = {
    width,
    rotation,
  }

  return pug`
    #pdf-viewer.uk-margin-top
      Worker(src=workerSrc)
        #pdf-viewer-container(ref=ref)
          DocumentLoader(
            src=src
            page=page
            cMap=cMap
            options=options
          )
        #pdf-controller.uk-margin-top
          .uk-flex.uk-flex-center
            button(
              id='prev'
              type='button'
              data-uk-icon='icon: chevron-double-left'
              data-uk-tooltip='title: Previous page; pos: bottom; delay: 200'
            ).uk-button.uk-active.uk-margin-small-right
            p #[span#page-num] / #[span#num-pages]
            button(
              id='next'
              type='button'
              data-uk-icon='icon: chevron-double-right'
              data-uk-tooltip='title: Next page; pos: bottom; delay: 200'
            ).uk-button.uk-active.uk-margin-small-left

          div(className='uk-visible@s').uk-flex.uk-flex-right.uk-margin-remove-top.uk-margin-small-bottom
            button(
              type='button'
              data-uk-icon='icon: info'
              data-uk-tooltip='title: [←] Previous Page<br/>[→ / Enter] Next Page; pos: bottom; delay: 200'
            ).uk-button.uk-active

  `
}

export type { CharMap }
export default Viewer
