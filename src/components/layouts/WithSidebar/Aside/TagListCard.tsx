import Tag from '@/components/elements/Tag';
import { type Tag as TagType } from '@/lib/microcms';

export interface Props extends Pick<React.ComponentPropsWithoutRef<typeof Tag>, 'withLink'> {
  readonly tags: TagType[];
}

const TagListCard: React.FC<Props> = ({ tags, withLink = false }) => {
  return (
    <div className='uk-card uk-card-default uk-border-rounded uk-margin-bottom'>
      <div className='uk-card-body'>
        <h3 className='uk-card-title'>Tags</h3>
        <ul className='uk-list uk-padding-small uk-text-truncate'>
          {tags.map((tag) => (
            <li key={tag.id}>
              <Tag tag={tag} withLink={withLink} withTooltip={true} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagListCard;
