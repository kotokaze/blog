import { Fragment } from 'react'; Fragment
import type { NextPage } from 'next'
import Link from 'next/link'; Link
import Meta from '@/components/meta'; Meta
import WithSidebar from '@/components/layouts/with-sidebar'; WithSidebar
import type { Props } from './index.hook'

const InfoPage: NextPage<Props> = ({ site, preview }) => {
  const kw: string = site.categories.map((cat) => cat?.name).join(',')

  return pug`
    Fragment
      Meta(title=('Info | ' + site.title), desc=site.description, kw=kw)
      WithSidebar(site=site)
        if preview
          Fragment
            .uk-alert-danger(data-uk-alert)
              a.uk-alert-close(data-uk-close)
              p プレビューモードで表示中
            a(href='/api/deactivate').uk-button.uk-button-default.uk-position-bottom-right.uk-position-fixed
              | #[span(data-uk-icon='trash')] Cookie 削除

        // section.uk-section.uk-section-default.uk-margin-remove-vertical
          h1(id='about-' + site.title).uk-heading-bullet About #{site.title}
          div
            p.uk-comment-body #{site.description}

        section.uk-section.uk-section-default.uk-margin-remove-vertical
          h1(id='about-' + site.author.name).uk-heading-bullet About #{site.author.name}
          div(dangerouslySetInnerHTML={ __html: site.author.description })

        section.uk-section.uk-section-default.uk-margin-remove-vertical
          h1(id='inks').uk-heading-bullet Links
          ul
            if site.author.accounts.github
              li
                Link(href=site.author.accounts.github)
                  a(target='_blank') GitHub

            if site.author.accounts.twitter
              li
                Link(href=site.author.accounts.twitter)
                  a(target='_blank') Twitter

            if site.author.accounts.zenn
              li
                Link(href=site.author.accounts.zenn)
                  a(target='_blank') Zenn

            if site.author.accounts.qiita
              li
                Link(href=site.author.accounts.qiita)
                  a(target='_blank') Qiita

            if site.author.accounts.speakerdeck
              li
                Link(href=site.author.accounts.speakerdeck)
                  a(target='_blank') Speaker Deck

            if site.author.accounts.wordpress
              li
                Link(href=site.author.accounts.wordpress)
                  a(target='_blank') WordPress
  `
}

export { getStaticProps } from './index.hook'
export default InfoPage
