import { PageKind } from '@/app/api/lib';
import {
  getArticleBySlug,
  getSlideBySlug,
} from '@/lib/microcms';

export const isValidSlug = async (type: PageKind, slug: string, dk: string): Promise<boolean> => {
  if (type === PageKind.ARTICLES) {
    const promise = getArticleBySlug(slug, {
      queries: { fields: 'id', draftKey: dk },
    })
      .then((_) => true)
      .catch(() => false);

    return await promise;
  }

  if (type === PageKind.SLIDES) {
    const promise = getSlideBySlug(slug, {
      queries: { fields: 'id', draftKey: dk },
    })
      .then((_) => true)
      .catch(() => false);

    return await promise;
  }

  return false;
};
