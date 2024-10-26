import { NextResponse } from 'next/server';

export enum PageKind {
  INFO = 'info',
  ARTICLES = 'articles',
  SLIDES = 'slides',
}

export interface Status {
  readonly code: number;
  readonly message: string;
}

export const succeeded: Status = { code: 200, message: 'OK' };

export const badRequest: Status = { code: 400, message: 'Bad Request' };
export const unauthorized: Status = { code: 401, message: 'Unauthorized' };
export const notFound: Status = { code: 404, message: 'Not Found' };
export const internalServerError: Status = { code: 500, message: 'Internal Server Error' };

export const jsonResponse = (body: Status): NextResponse<Status> => {
  const res: ResponseInit = {};
  res.headers = new Headers({
    'Content-Type': 'application/json',
  });
  res.status = body.code;
  res.statusText = body.message;

  return new NextResponse<Status>(JSON.stringify(body), res);
};
