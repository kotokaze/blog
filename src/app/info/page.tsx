import 'server-only';
import { type NextPage } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import Wrapper from '@/components/layouts/Wrapper';
import WithSidebar from '@/components/layouts/WithSidebar';
import { getSiteData } from '@/lib/microcms';
import { type Props } from './lib';

const Page: NextPage<Props> = async ({ searchParams }) => {
  const { isEnabled } = draftMode();
  if (isEnabled && !Boolean(searchParams.dk)) {
    return notFound();
  }

  const data = await getSiteData({
    ...(isEnabled ? { queries: { draftKey: searchParams.dk }} : undefined),
  });

  if (!(isEnabled || Boolean(data.publishedAt))) {
    return notFound();
  }

  return (
    <Wrapper>
      <WithSidebar isPreview={isEnabled} publisher={data.publisher} tags={data.tags}>
        <h1 className='uk-heading-bullet-small'>Site Information</h1>

        <h2 id={`about-${data.title}`} className='uk-heading-bullet'>
          About {data.title}
        </h2>
        <p>{data.description}</p>

        <h2 id={`about-${data.publisher.name}`} className='uk-heading-bullet'>
          About {data.publisher.name}
        </h2>
        <div dangerouslySetInnerHTML={{ __html: data.publisher.description }}></div>

        <h2 id='links' className='uk-heading-bullet'>
          Links
        </h2>
        <ul>
          {data.publisher.accounts.map((account) => (
            <li key={account.label}>
              <a href={account.url}>{account.label}</a>
            </li>
          ))}
        </ul>
      </WithSidebar>
    </Wrapper>
  );
};

export default Page;
