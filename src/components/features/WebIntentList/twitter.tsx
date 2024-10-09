import IconLink from '@/components/elements/IconLink';
import { type Account } from '@/lib/microcms/types/site-data';

export interface Props {
  readonly text: string;
  readonly url: string;
  readonly hashtags?: string[];
  readonly via?: string;
  readonly related?: string[];
  readonly inReplyTo?: string;
}

export const pickTwitterUid = (account: Account[]): string | undefined => {
  return account.find((account) => {
    return ['twitter', 'x'].some((elm) => account.label.toLowerCase().includes(elm));
  })?.uid;
};

const TwitterIntent: React.FC<Props> = ({ text, url, hashtags, via, related, inReplyTo }) => {
  const href = new URL('https://twitter.com/intent/tweet');
  const params = href.searchParams;

  params.append('url', encodeURIComponent(url));

  params.append('text', encodeURIComponent(text));

  if (hashtags?.length) {
    params.append('hashtags', encodeURIComponent(hashtags.join(',')));
  }

  if (via) {
    params.append('via', encodeURIComponent(via));
  }

  if (related?.length) {
    params.append('related', encodeURIComponent(related.join(',')));
  }

  if (inReplyTo) {
    params.append('in-reply-to', encodeURIComponent(inReplyTo));
  }

  return (
    <IconLink
      href={href}
      icon='x; ratio: 1.75'
      target='_blank'
      rel='noopener noreferrer'
      data-uk-tooltip='title: Share on X (Twitter); pos: bottom-right'
    />
  );
};

export default TwitterIntent;
