'use client';
import { usePathname } from 'next/navigation';
import TwitterIntent from './twitter';
import FacebookIntent from './facebook';

export interface Props extends Pick<React.ComponentPropsWithoutRef<typeof TwitterIntent>, 'hashtags' | 'via'> {
  readonly title?: string;
  readonly baseUrl: string;
  readonly siteName: string;
}

const WebIntentList: React.FC<Props> = ({ title, baseUrl, siteName, ...props }) => {
  const text = (title != null) ? `${title} | ${siteName}` : siteName;

  const pathname = usePathname();
  const url = new URL(pathname, baseUrl).href;

  return (
    <div className='uk-padding-small uk-visible@l'>
      <ul className='uk-iconnav uk-iconnav-vertical' data-uk-sticky='end: #oversized; offset: 100'>
        <li className='uk-margin-bottom'>
          <TwitterIntent text={text} url={url} {...props} />
        </li>
        <li>
          <FacebookIntent url={url} />
        </li>
      </ul>
    </div>
  );
};

export default WebIntentList;
