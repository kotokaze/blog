import Image, { type ImageProps } from 'next/image';
import loader from '@/lib/microcms/loader';

export interface Props extends Omit<ImageProps, 'loader'> {
  readonly src: string;
  readonly width: number;
  readonly height: number;
}

const MicroCMSImage: React.FC<Props> = ({ src, alt, ...args }) => {
  const url = new URL(src);
  const { searchParams } = url;
  searchParams.set('w', args.width.toString());
  searchParams.set('h', args.height.toString());

  searchParams.set('fit', searchParams.get('fit') ?? 'max');

  const Sources_: React.FC<
    {
      sources: React.ComponentPropsWithoutRef<'source'>[];
    } & Pick<ImageProps, 'sizes' | 'priority'>
  > = ({ sources }) => {
    return (
      <>
        {sources.map((props) => (
          <source key={props.srcSet} {...props} />
        ))}
      </>
    );
  };

  return (
    <picture>
      <Sources_
        sources={[
          {
            srcSet: (() => {
              searchParams.set('fm', 'avif');
              return url.href;
            })(),
            type: 'image/avif',
          },
          {
            srcSet: (() => {
              searchParams.set('fm', 'webp');
              return url.href;
            })(),
            type: 'image/webp',
          },
        ]}
      />
      <Image
        src={url.href}
        alt={alt}
        blurDataURL={loader({
          src,
          width: 8,
          quality: 10,
        })}
        {...args}
      />
    </picture>
  );
};

export default MicroCMSImage;
