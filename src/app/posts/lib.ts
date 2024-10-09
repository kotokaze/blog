import { type Metadata } from 'next';
import { getSiteData } from '@/lib/microcms';
import { pickTwitterUid } from '@/components/features/WebIntentList/twitter';

export interface Props {
}

export const generateMetadata = async ({}: Props): Promise<Metadata> => {
  const site = await getSiteData();

  return {
    title: 'Posts',
    description: `List of Posts | ${site.description}`,
    keywords: 'Blog Posts',
    openGraph: {
      type: 'website',
      title: `Posts`,
      description: `List of Posts | ${site.description}`,
      siteName: site.title,
      locale: 'ja_JP',
      images: `${site.url}/favicon.ico`,
      url: `${site.url}/posts/`,
      countryName: 'JP',
    },
    twitter: {
      card: 'summary_large_image',
      creator: pickTwitterUid(site.publisher.accounts),
      description: `List of Posts | ${site.description}`,
      title: 'Posts',
      images: `${site.url}/favicon.ico`,
    },
  };
};
