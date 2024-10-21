import 'server-only';
import { type NextPage } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import WebIntentList from '@/components/features/WebIntentList';
import WithSidebar from '@/components/layouts/WithSidebar';
import Wrapper from '@/components/layouts/Wrapper';
import { pickTwitterUid } from '@/components/features/WebIntentList/twitter';
import {
  getArticleBySlug,
  getSiteData,
} from '@/lib/microcms';
import { type Props } from './lib';

const Page: NextPage<Props> = async ({ params, searchParams }) => {
  const { isEnabled } = draftMode();
  if (isEnabled && !Boolean(searchParams.dk)) {
    return notFound();
  }

  const data = await getArticleBySlug(params.slug, {
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
        {data.fields.map((item, idx) => {
          if (item.fieldId !== 'ad') {
            return <div key={idx} dangerouslySetInnerHTML={{ __html: item.value }} />;
          }

          return (
            <div key={idx}>
              {item.value && (
                <div className='uk-margin'>
                  <div className='uk-card uk-card-default uk-card-body'>
                    <p className='uk-card-title'>Advertisement</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </WithSidebar>
    </Wrapper>
  );
};

export { generateMetadata, generateStaticParams } from './lib';
export default Page;
