import 'server-only';
import { type NextPage } from 'next';
import Wrapper from '@/components/layouts/Wrapper';
import WithSidebar from '@/components/layouts/WithSidebar';
import { getSiteData } from '@/lib/microcms';
import { type Props } from './lib';

const Home: NextPage<Props> = async ({}) => {
  const site = await getSiteData();

  return (
    <Wrapper>
      <WithSidebar publisher={site.publisher} tags={site.tags}>
        <div className='uk-text-center uk-container-expand uk-section-xlarge uk-margin'>
          <h1 className='uk-animation-scale-up'>{site.title}</h1>
          <h2 className='uk-animation-fade'>Welcome to our site!</h2>
        </div>
      </WithSidebar>
    </Wrapper>
  );
};

export default Home;
