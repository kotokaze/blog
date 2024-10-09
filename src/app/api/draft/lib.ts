import {
  getArticleBySlug,
  getSlideBySlug,
} from '@/lib/microcms';
import { NextResponse } from 'next/server';
import { type Status } from '../lib';

export enum PageKind {
  INFO = 'info',
  ARTICLES = 'articles',
  SLIDES = 'slides',
}

export const getValidSlug = async (type: PageKind, slug: string, dk: string): Promise<string> => {
  if (type === PageKind.ARTICLES) {
    const promise = getArticleBySlug(slug, {
      queries: { fields: 'id', draftKey: dk },
    }).then((data) => data.id);

    return await promise;
  }

  if (type === PageKind.SLIDES) {
    const promise = getSlideBySlug(slug, {
      queries: { fields: 'id', draftKey: dk },
    }).then((data) => data.id);

    return await promise;
  }

  return '';
};

export const jsonResponse = (body: Status): NextResponse<Status> => {
  const res: ResponseInit = {};
  res.headers = new Headers({
    'Content-Type': 'application/json',
  });
  res.status = body.code;
  res.statusText = body.message;

  return new NextResponse<Status>(JSON.stringify(body), res);
};
