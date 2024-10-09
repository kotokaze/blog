import { Suspense } from 'react';
import Card from '@/components/elements/Card';
import {
  type Article as ArticleType,
  type Slide as SlideType,
} from '@/lib/microcms';
import { type MicroCMSListContent } from 'microcms-js-sdk';

interface Props {
  readonly items: ((ArticleType | SlideType) & MicroCMSListContent)[];
}

const CardList: React.FC<Props> = ({ items }) => {
  return (
    <Suspense>
      {items.map((item) => (
        <Card item={item} key={item.id} />
      ))}
    </Suspense>
  );
};

export default CardList;
