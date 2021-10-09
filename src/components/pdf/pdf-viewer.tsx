import React, { useState, useRef } from 'react'; React
import PageController from './pdf-controller'; PageController
import { useWidth } from '@/hooks/useWidth'
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'
pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min')
Document
Page

interface Props {
  src: string | File
  page?: number
  slides: boolean
}

const PDFViewer: React.VFC<Props> = ({
  page,
  src = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
  slides = false,
}) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(page || 1)

  const ref = useRef<HTMLDivElement>()
  const width = useWidth(ref)

  const onDocumentLoadSuccess = ({ numPages }: any): void =>
    setNumPages(numPages)

  const onItemClicked = ({ pageNumber: itemPageNumber }: any): void =>
    setPageNumber(itemPageNumber)

  const onChangePage = (offset: number): void =>
    setPageNumber((prev) => prev + offset)

  const prevPage = (): void =>
    onChangePage(-1)

  const nextPage = (): void =>
    onChangePage(1)

  const loading = (): React.ReactElement => pug`
    .uk-flex.uk-flex-center(data-uk-spinner='ratio: 5')
  `

  return pug`
    Document(
      file=src
      inputRef=ref
      className='uk-background-muted'
      options={ cMapUrl: 'cmaps/', cMapPacked: true }
      loading=loading
      onLoadSuccess=onDocumentLoadSuccess
      onItemClicked=onItemClicked
      externalLinkTarget='_blank'
    )

      if (!slides && !page)
        for i in [...Array(numPages).keys()]
          .uk-flex.uk-flex-center(key=('pdf-' + i))
            if (i === 0)
              Page(
                width=width * 95e-2
                className='uk-margin-top uk-margin'
                loading=loading
                pageNumber=(i + 1)
              )
            else
              Page(
                width=width * 95e-2
                className='uk-margin'
                loading=loading
                pageNumber=(i + 1)
              )

      else
        .uk-flex.uk-flex-center
          Page(
            width=width * 95e-2
            className='uk-margin-top uk-margin-bottom'
            loading=loading
            pageNumber=pageNumber
          )

        if (slides)
          PageController(
            isPrevDisabled=(pageNumber <= 1)
            isNextDisabled=(pageNumber >= numPages)
            prevPage=prevPage
            nextPage=nextPage
          )
  `
}

export default PDFViewer
