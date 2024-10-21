import { draftMode } from 'next/headers';
import { type NextRequest } from 'next/server';
import {
  RedirectType,
  redirect,
} from 'next/navigation';
import { type Status } from '../lib';
import {
  PageKind,
  jsonResponse,
  getValidSlug,
} from './lib';

const badRequest: Status = { code: 400, message: 'Bad Request' };
const unauthorized: Status = { code: 401, message: 'Unauthorized' };
const internalServerError: Status = { code: 500, message: 'Internal Server Error' };

export const GET = async (req: NextRequest) => {
  const params = new URL(req.url).searchParams;
  const type_ = params.get('type') ?? '';
  const secret = params.get('secret') ?? '';
  const draftKey = params.get('draftKey') ?? '';

  if (!(type_ && secret && draftKey)) {
    return jsonResponse(badRequest);
  }

  if (!(Object.values(PageKind) as string[]).includes(type_)) {
    return jsonResponse(badRequest);
  }

  const type = PageKind[type_.toUpperCase() as keyof typeof PageKind];

  if (!process.env.MICROCMS_SECRET) {
    return jsonResponse(internalServerError);
  }

  if (secret !== process.env.MICROCMS_SECRET) {
    return jsonResponse(unauthorized);
  }

  if (type === PageKind.INFO) {
    draftMode().enable();
    redirect(`/${type.toString()}?dk=${draftKey}`, RedirectType.replace);
  }

  const slug_ = params.get('slug') ?? '';
  const slug = await getValidSlug(type, slug_, draftKey);
  if (!slug) {
    return jsonResponse({ code: 404, message: 'Not Found' });
  }

  draftMode().enable();
  redirect(`/${type === PageKind.ARTICLES ? 'posts' : type.toString()}/${slug}?dk=${draftKey}`, RedirectType.replace);
};
