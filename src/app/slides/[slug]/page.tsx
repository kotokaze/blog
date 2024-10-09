import 'server-only';
import { type NextPage } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import PDFViewer from '@/components/elements/PDFViewer';
import WebIntentList from '@/components/features/WebIntentList';
import Wrapper from '@/components/layouts/Wrapper';
import WithSidebar from '@/components/layouts/WithSidebar';
import { pickTwitterUid } from '@/components/features/WebIntentList/twitter';
import {
  getSiteData,
  getSlideBySlug,
} from '@/lib/microcms';
import { type Props } from './lib';

export const dynamic = 'error';

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { isEnabled } = draftMode();
  if (isEnabled && !Boolean(searchParams.dk)) {
    return notFound();
  }

  const data = await getSlideBySlug(params.slug, {
    ...(isEnabled ? { queries: { draftKey: searchParams.dk }} : undefined),
  });
  if (!(isEnabled || Boolean(data.publishedAt))) {
    return notFound();
  }

  const site = await getSiteData();

  const Desc: React.FC = () => {
    if (data.description == null) return null;

    return (
      <div className='uk-card uk-card-default uk-border-rounded uk-margin-bottom'>
        <div className='uk-card-body'>
          <h3 className='uk-card-title'>概要</h3>
          <div className='uk-text-meta'>{data.description}</div>
        </div>
      </div>
    );
  };

  return (
    <Wrapper>
      <WebIntentList
        title={data.title}
        siteName={data.title}
        baseUrl={site.url}
        hashtags={data.tags?.map((tag) => tag.name)}
        via={pickTwitterUid(site.publisher.accounts)}
      />
      <WithSidebar title={data.title} publisher={site.publisher} tags={data.tags} child={<Desc />}>
        <h1 className='uk-heading-bullet-small'>{data.title}</h1>
        {data.filename != null
          ? <PDFViewer src={`/assets/slides/${data.filename}`} />
          : <p>Sorry, PDF file not available</p>
        }
      </WithSidebar>
    </Wrapper>
  );
};

export { generateMetadata, generateStaticParams } from './lib';
export default Page;
