import Link from 'next/link';
import { type Route } from 'next';

export interface Props extends React.ComponentPropsWithoutRef<typeof Link<Route>> {
  readonly icon?: string;
  readonly 'data-uk-tooltip'?: string;
}

const IconLink: React.FC<Props> = ({ href, icon, className, ...props }) => {
  const noPrefetch = (href instanceof URL) || (typeof href === 'string' && href.startsWith('http'));
  const commonProps = {
    ...props,
    className: 'uk-icon-link' + ((className != null) ? ` ${className}` : ''),
    'aria-label': props['aria-label'] ?? 'Open link',
    'data-uk-icon': `icon: ${icon ?? 'link'}`,
    'data-uk-tooltip': props['data-uk-tooltip'] ?? 'title: Open link; pos: bottom-right',
  };

  return (
    <>
      {(noPrefetch)
        ? <a {...commonProps} href={href.toString()} target='_blank' rel='noopener noreferrer' ></a>
        : <Link {...commonProps} href={href} prefetch={true} />
      }
    </>
  );
};

export default IconLink;
