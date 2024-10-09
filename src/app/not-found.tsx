import 'server-only';
import { type NextPage } from 'next';

export interface Props {
}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className='uk-flex uk-flex-center uk-text-center uk-padding-large uk-margin-large-top'>
      <section className='uk-section uk-padding uk-padding-remove-top'>
        <h1 className='uk-animation-scale-up'>Oops!</h1>
        <h2 className='uk-animation-fade uk-text-lighter'>The page you are looking for does not exist...</h2>
      </section>
    </div>
  );
};

export default Page;
