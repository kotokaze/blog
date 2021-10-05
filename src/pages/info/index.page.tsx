import React from 'react'; React
import type { NextPage } from 'next'
import Head from 'next/head'; Head
import Image from 'next/image'; Image
import Link from 'next/link'; Link
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { Props } from './index.hook'

const InfoPage: NextPage<Props> = ({ site }) => pug`
  Head
    title Info | #{site.title}
  WithSidebar(site=site)
    section.uk-section.uk-section-default.uk-margin-remove-vertical
      h1(id='about-' + site.title).uk-heading-bullet About #{site.title}
      div(dangerouslySetInnerHTML={ __html: site.description })

    section.uk-section.uk-section-default.uk-margin-remove-vertical
      h1(id='about-' + site.author.name).uk-heading-bullet About #{site.author.name}
      div(dangerouslySetInnerHTML={ __html: site.author.description })

    section.uk-section.uk-section-default.uk-margin-remove-vertical
      h1(id='inks').uk-heading-bullet Links
      ul
        if site.author.accounts.github
          li
            a(href=site.author.accounts.github, target='_blank') GitHub

        if site.author.accounts.twitter
          li
            a(href=site.author.accounts.twitter, target='_blank') Twitter

        if site.author.accounts.zenn
          li
            a(href=site.author.accounts.zenn, target='_blank') Zenn

        if site.author.accounts.qiita
          li
            a(href=site.author.accounts.qiita, target='_blank') Qiita

        if site.author.accounts.speakerdeck
          li
            a(href=site.author.accounts.speakerdeck, target='_blank') Speaker Deck

        if site.author.accounts.wordpress
          li
            a(href=site.author.accounts.wordpress, target='_blank') WordPress
`

export { getStaticProps } from './index.hook'
export default InfoPage
