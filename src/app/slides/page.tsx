import 'server-only';
import CardList from '@/components/features/CardList';
import Wrapper from '@/components/layouts/Wrapper';
import WithSidebar from '@/components/layouts/WithSidebar';
import {
  getSiteData,
  getSlideList,
} from '@/lib/microcms';
import { type NextPage } from 'next';
import { type Props } from './lib';

const Page: NextPage<Props> = async ({ }) => {
  const data = await getSlideList();
  const site = await getSiteData();

  return (
    <Wrapper>
      <WithSidebar publisher={site.publisher} tags={site.tags}>
        <h1 className='uk-heading-bullet-small'>Slides</h1>
        <CardList items={data.contents} />
      </WithSidebar>
    </Wrapper>
  );
};

export { generateMetadata } from './lib';
export default Page;
