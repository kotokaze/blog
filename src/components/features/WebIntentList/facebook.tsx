import IconLink from '@/components/elements/IconLink';

export interface Props {
  readonly url: string;
}

const FacebookIntent: React.FC<Props> = ({ url }) => {
  const href = new URL('http://www.facebook.com/share/share.php');
  href.searchParams.append('u', encodeURIComponent(url));

  return (
    <IconLink
      href={href}
      icon='facebook; ratio: 1.75'
      target='_blank'
      rel='noopener noreferrer'
      data-uk-tooltip='title: Share on Facebook; pos: bottom-right'
    />
  );
};

export default FacebookIntent;
