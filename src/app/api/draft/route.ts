import { draftMode } from 'next/headers';
import {
  type NextRequest,
  type NextResponse,
} from 'next/server';
import {
  RedirectType,
  redirect,
} from 'next/navigation';
import {
  badRequest,
  unauthorized,
  notFound,
  internalServerError,
  jsonResponse,
  PageKind,
  Status,
} from '@/app/api/lib';
import { isValidSlug } from './lib';

export const GET = async (req: NextRequest): Promise<NextResponse<Status>> => {
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

  if (process.env.MICROCMS_SECRET == null) {
    return jsonResponse(internalServerError);
  }

  if (secret !== process.env.MICROCMS_SECRET) {
    return jsonResponse(unauthorized);
  }

  if (type === PageKind.INFO) {
    draftMode().enable();
    redirect(`/${type.toString()}?dk=${draftKey}`, RedirectType.replace);
  }

  const slug = params.get('slug') ?? '';
  if (!(await isValidSlug(type, slug, draftKey))) {
    return jsonResponse(notFound);
  }

  draftMode().enable();
  redirect(`/${type === PageKind.ARTICLES ? 'posts' : type}/${slug}?dk=${draftKey}`, RedirectType.replace);
};
