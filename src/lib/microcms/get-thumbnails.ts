import { type MicroCMSImage } from 'microcms-js-sdk';

export const getThumbnails = (image: MicroCMSImage) => {
  return [
    {
      url: `${image.url}?fm=avif`,
      width: image.width,
      height: image.height,
    },
    {
      url: `${image.url}?fm=webp`,
      width: image.width,
      height: image.height,
    },
    {
      url: image.url,
      width: image.width,
      height: image.height,
    },
  ];
};
