import { revalidatePath } from 'next/cache';
import {
  type NextRequest,
  type NextResponse,
} from 'next/server';
import {
  createHmac,
  timingSafeEqual,
} from 'crypto';
import {
  badRequest,
  internalServerError,
  jsonResponse,
  Status,
  succeeded,
  unauthorized,
} from '@/app/api/lib';

export const dynamic = 'force-dynamic';
export const revalidate = false;
export const POST = async (req: NextRequest): Promise<NextResponse<Status>> => {
  if (process.env.REVALIDATE_SECRET == null) {
    return jsonResponse(internalServerError);
  }

  const signature = req.headers.get('X-MICROCMS-Signature') ?? '';
  if (!signature) {
    return jsonResponse(badRequest);
  }

  const hmac = createHmac('sha256', process.env.REVALIDATE_SECRET);
  const body = await req.text();
  const expected = hmac.update(body).digest('hex');

  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
      return jsonResponse(unauthorized);
    }
  }
 catch {
    return jsonResponse(internalServerError);
  }

  const basePathMap = {
    site: '/info',
    blogs: '/posts',
    slides: '/slides',
  };

  const json = JSON.parse(body) as {
    id?: string;
    api: keyof typeof basePathMap;
    type: 'new' | 'edit' | 'delete';
  };

  const path = basePathMap[json.api] + (json.id != null ? `/${json.id}` : '');
  if (!path) {
    return jsonResponse(badRequest);
  }

  // Revalidate the segments recursively
  const segments = path.split('/').filter((seg) => seg.length);
  for (let i = segments.length; 0 < i; i--) {
    const target = `/${segments.slice(0, i).join('/')}`;
    console.log('revalidatePath: ', target);
    revalidatePath(target, 'page');
  }

  return jsonResponse(succeeded);
};
