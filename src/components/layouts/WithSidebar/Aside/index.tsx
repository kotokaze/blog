import IconButtonList from '@/components/features/IconButtonList';
import MicroCMSImage from '@/components/elements/MicroCMSImage';
import TagListCard from './TagListCard';
import { type Publisher } from '@/lib/microcms/types/site-data';
import { type Tag as TagType } from '@/lib/microcms';

export interface Props extends React.PropsWithChildren<{
  readonly publisher: Publisher;
  readonly tags?: TagType[];
}> {}

const Aside: React.FC<Props> = ({ publisher, tags, children }) => {
  return (
    <aside className='uk-width-1-4 uk-visible@s' role='complementary'>
      <div className='uk-card uk-card-default tm-border-rounded-large uk-margin-bottom'>
        <div className='uk-card-header'>
          <div className='uk-grid-small uk-flex-middle' data-uk-grid>
            <div className='uk-width-auto@m'>
              <MicroCMSImage
                src={publisher.thumbnail.url}
                alt='Avatar'
                width={50}
                height={50}
                priority={false}
                className='uk-border-circle'
                data-uk-image
              />
            </div>
            <div className='uk-width-expand'>
              <h3 className='uk-card-title uk-margin-remove-bottom uk-text-bottom'>{publisher.name}</h3>
            </div>
          </div>
        </div>
        <div className='uk-card-bottom uk-padding-small'>
          <div className='uk-flex uk-flex-around'>
            <IconButtonList accounts={publisher.accounts} />
          </div>
        </div>
      </div>

      {tags?.length ? <TagListCard tags={tags} /> : null}
      {children}
    </aside>
  );
};

export default Aside;
