import 'server-only';
import { type Metadata } from 'next';
import UIkitIcons from '@/components/elements/UIkitIcons';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { getSiteData } from '@/lib/microcms';
import { pickTwitterUid } from '@/components/features/WebIntentList/twitter';
import '@/styles/site.scss';

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await getSiteData();

  return {
    metadataBase: new URL(data.url),
    title: { absolute: data.title, template: `%s | ${data.title}` },
    description: data.description,
    applicationName: data.title,
    keywords: data.tags.map((tag) => tag.name).join(','),
    creator: data.publisher.name,
    icons: `/favicon.ico`,
    openGraph: {
      type: 'website',
      url: data.url,
      title: { absolute: data.title, template: `%s | ${data.title}` },
      description: data.description,
      siteName: data.title,
      images: `${data.url}/favicon.ico`,
    },
    twitter: {
      card: 'summary_large_image',
      creator: pickTwitterUid(data.publisher.accounts),
      title: { absolute: data.title, template: `%s | ${data.title}` },
      description: data.description,
      images: `${data.url}/favicon.ico`,
    },
  };
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const site = await getSiteData();

  return (
    <html lang='ja'>
      <body>
        <UIkitIcons />
        <Header title={site.title} />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
