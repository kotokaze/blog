import { type ImageLoader } from 'next/image';

const microcmsLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  const params = url.searchParams;

  params.set('fit', params.get('fit') ?? 'max');
  params.set('w', params.get('w') ?? width.toString());
  params.set('q', params.get('q') ?? (quality ?? 75).toString());
  params.set('fm', params.get('fm') ?? 'webp');
  return url.href;
};

export default microcmsLoader;
