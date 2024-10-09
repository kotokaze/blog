import { type Metadata } from 'next';
import { getSiteData } from '@/lib/microcms';
import { pickTwitterUid } from '@/components/features/WebIntentList/twitter';

export interface Props {
}

export const generateMetadata = async ({}: Props): Promise<Metadata> => {
  const site = await getSiteData();

  return {
    title: 'Slides',
    description: `List of Slides | ${site.description}`,
    keywords: 'Slideshows',
    openGraph: {
      type: 'website',
      title: `Slides`,
      description: `List of Slides | ${site.description}`,
      siteName: site.title,
      locale: 'ja_JP',
      images: `${site.url}/favicon.ico`,
      url: `${site.url}/slides/`,
      countryName: 'JP',
    },
    twitter: {
      card: 'summary_large_image',
      creator: pickTwitterUid(site.publisher.accounts),
      description: `List of Slides | ${site.description}`,
      title: 'Slides',
      images: `${site.url}/favicon.ico`,
    },
  };
};
