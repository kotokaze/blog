import React, { useState } from 'react'; React
import PageController from './pdf-controller'; PageController
import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack'
pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min')
Document
Page

interface Props {
  src: string
  page?: number
  slides: boolean
}

const PDFViewer: React.VFC<Props> = ({
  page,
  src = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf',
  slides = false,
}) => {
  const [file, setFile] = useState<string>(src)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(page || 1)

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
    div(data-uk-spinner='ratio: 5')
  `

  return pug`
    Document(
        file=file
        options={ cMapUrl: 'cmaps/', cMapPacked: true }
        loading=loading
        onLoadSuccess=onDocumentLoadSuccess
        onItemClicked=onItemClicked
        externalLinkTarget='_blank'
      )

      if slides
        Page(
          loading=loading
          pageNumber=pageNumber
        )
        PageController(
          isPrevDisabled=(pageNumber <= 1)
          isNextDisabled=(pageNumber >= numPages)
          prevPage=prevPage
          nextPage=nextPage
        )

      else if page
        Page(
          loading=loading
          pageNumber=pageNumber
        )

      else
        for i in [...Array(numPages).keys()]
          Page(
            loading=loading
            pageNumber=(i + 1)
            key=('pdf-' + i)
          )
  `
}

export default PDFViewer
