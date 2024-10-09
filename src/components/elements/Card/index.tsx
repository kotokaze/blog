import Image from 'next/image';
import Link from 'next/link';
import MicroCMSImage from '@/components/elements/MicroCMSImage';
import {
  type Article as ArticleType,
  type Slide as SlideType,
} from '@/lib/microcms';
import {
  formatInJst,
  getElapsed,
} from '@/lib/date-time';


interface Props {
  readonly item: ArticleType | SlideType;
}

const Card: React.FC<Props> = ({ item }) => {
  const isSlide = Object.hasOwn(item, 'filename');
  const tooltip = `title: ${item.title}; delay: 200`;

  const coverWidth = 600;
  const coverHeight = 400;

  return (
    <Link
      href={`${isSlide ? '/slides' : '/posts'}/${item.id}`}
      className='uk-card uk-card-default uk-link-toggle uk-grid-collapse uk-child-width-1-2@m uk-margin'
      data-uk-tooltip={tooltip}
      data-uk-grid
    >
      {!Boolean(item.publishedAt) && (
        <div className='uk-card-badge uk-label uk-label-warning'>
          <span data-uk-icon='file-edit'></span> Draft
        </div>
      )}

      <div className='uk-card-media-left uk-cover-container'>
        {item.thumbnail
          ? (
            <MicroCMSImage
              src={item.thumbnail.url}
              alt={`Thumbnail of ${item.title}`}
              width={coverWidth}
              height={coverHeight}
              data-uk-cover
            />
          )
          : (
            <Image src='/assets/images/no_image.svg' alt='No image' width={coverWidth} height={coverHeight} data-uk-cover />
          )
        }
        <canvas width={coverWidth} height={coverHeight} />
      </div>

      <div className='uk-card-body uk-padding-small'>
        <div className='uk-article'>
          <h3 className='uk-card-title'>{item.title}</h3>

          <div className='uk-article-meta'>
            <div className='uk-child-width-auto' data-uk-grid>
              <div>
                <span data-uk-icon='calendar' />
                <span>&nbsp;</span>
                <time dateTime={item.publishedAt ?? item.updatedAt}>
                  {formatInJst(item.publishedAt ?? item.updatedAt)}
                </time>
              </div>
              {(item.revisedAt != null) && (
                <p>
                  <span data-uk-icon='clock' />
                  <span>&nbsp;</span>
                  <time dateTime={item.revisedAt}>
                    {getElapsed(item.revisedAt)}
                  </time>
                  に更新
                </p>
              )}
            </div>

            {item.tags && <div className='uk-child-width-auto uk-margin-small-top' data-uk-grid>
              <p>
                <span data-uk-icon='icon: tag'></span>&nbsp;{item.tags.map((tag) => (tag.name)).join(', ')}
              </p>
            </div>}
          </div>

          <p className='uk-text-truncate'>{item.description}</p>
          <p className='uk-text-right uk-link-text'>Read more...</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
