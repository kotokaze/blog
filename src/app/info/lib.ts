import { type Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getSiteData } from '@/lib/microcms';
import { pickTwitterUid } from '@/components/features/WebIntentList/twitter';

export interface Props {
  readonly searchParams: Readonly<{ dk?: string }>;
}

export const generateMetadata = async ({ searchParams }: Props): Promise<Metadata> => {
  const { isEnabled } = draftMode();
  const data = await getSiteData({
    ...(isEnabled ? { queries: { draftKey: searchParams.dk }} : undefined),
  });

  return {
    title: `Info | ${data.title}`,
    keywords: 'Info',
    openGraph: {
      type: 'profile',
      username: data.publisher.name,
      title: `Info | ${data.title}`,
      description: data.description,
      images: `${data.url}/favicon.ico`,
      siteName: data.title,
      locale: 'ja_JP',
      url: `${data.url}/info`,
      countryName: 'JP',
    },
    twitter: {
      card: 'summary_large_image',
      creator: pickTwitterUid(data.publisher.accounts),
      title: `Info | ${data.title}`,
      description: data.description,
      images: `${data.url}/favicon.ico`,
    },
  };
};
