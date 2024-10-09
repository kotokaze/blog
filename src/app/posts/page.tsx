import 'server-only';
import { type NextPage } from 'next';
import CardList from '@/components/features/CardList';
import Wrapper from '@/components/layouts/Wrapper';
import WithSidebar from '@/components/layouts/WithSidebar';
import {
  getArticleList,
  getSiteData,
} from '@/lib/microcms';
import { type Props } from './lib';

const Page: NextPage<Props> = async ({}) => {
  const data = await getArticleList();
  const site = await getSiteData();

  return (
    <Wrapper>
      <WithSidebar publisher={site.publisher} tags={site.tags}>
        <h1 className='uk-heading-bullet-small'>Posts</h1>
        <CardList items={data.contents} />
      </WithSidebar>
    </Wrapper>
  );
};

export { generateMetadata } from './lib';
export default Page;
