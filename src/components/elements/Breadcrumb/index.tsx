'use client';
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface Props {
  title?: string;
}

const Breadcrumb: React.FC<Props> = ({ title = '' }) => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((item) => item !== '');
  if (paths.length <= 1) return null;

  return (
    <nav aria-label='Breadcrumb'>
      <ul className='uk-breadcrumb uk-text-nowrap uk-text-truncate'>
        {paths.map((item, idx) => (
          <li key={idx}>
            {(idx < paths.length - 1)
              ? (
                <Link href={`/${item}` as Route}>{item}</Link>
              )
              : (
                // The last item is slug and should be displayed as title string
                <span aria-current='page'>{title}</span>
              )
            }
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
