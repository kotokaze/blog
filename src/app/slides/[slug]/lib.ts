import { type Metadata } from 'next';
import { draftMode } from 'next/headers';
import {
  getAllSlideIds,
  getSiteData,
  getSlideBySlug,
} from '@/lib/microcms';
import { pickTwitterUid } from '@/components/features/WebIntentList/twitter';

export interface Props {
  readonly params: Readonly<{ slug: string }>;
  readonly searchParams: Readonly<{ dk?: string }>;
}

export const generateMetadata = async ({ params, searchParams }: Props): Promise<Metadata> => {
  const { isEnabled } = draftMode();

  const data = await getSlideBySlug(params.slug, {
    ...(isEnabled ? { queries: { draftKey: searchParams.dk }} : undefined),
  });
  const site = await getSiteData();

  return {
    title: data.title,
    description: data.description,
    keywords: data.tags?.map((tag) => tag.name),
    openGraph: {
      type: 'article',
      publishedTime: data.publishedAt,
      modifiedTime: data.revisedAt,
      authors: site.publisher.name,
      tags: data.tags?.map((tag) => tag.name),
      title: `${data.title} | ${site.title}`,
      description: data.description,
      siteName: site.title,
      images: data.thumbnail?.url ?? `${site.url}/favicon.ico`,
      url: `${site.url}/slides/${data.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      creator: pickTwitterUid(site.publisher.accounts),
      description: data.description,
      title: `${data.title} | ${site.title}`,
      images: data.thumbnail?.url ?? `${site.url}/favicon.ico`,
    },
    category: data.category.name,
  };
};

export const generateStaticParams = async (): Promise<Pick<Props['params'], 'slug'>[]> => {
  const promise = getAllSlideIds()
    .then((ids) => ids.map((id) => ({ slug: id })));
  return await promise;
};
