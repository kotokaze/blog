import { type Route } from 'next';
import Link from 'next/link';
import { type Tag as TagType } from '@/lib/microcms';

interface Props {
  readonly tag: TagType;
  readonly withLink?: boolean;
  readonly withTooltip?: boolean;
}

const Tag: React.FC<Props> = ({ tag, withLink = false, withTooltip = false }) => {
  const tooltip = withTooltip
    ? `title: ${tag.name}; delay: 200; pos: right`
    : undefined;

  if (!withLink) {
    return (
      <>
        <p data-uk-tooltip={tooltip}>
          <span data-uk-icon='icon: tag'></span>&nbsp;{tag.name}
        </p>
      </>
    );
  }

  return (
    <>
      <Link
        href={`/tags/${tag.id}` as Route}
        className='uk-link-text'
        aria-label={`Tag: ${tag.name}`}
        data-uk-tooltip={tooltip}
      >
        <span data-uk-icon='icon: tag'></span>&nbsp;{tag.name}
      </Link>
    </>
  );
};

export default Tag;
