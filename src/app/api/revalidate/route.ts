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
export const revalidate = 'false';
export const POST = async (req: NextRequest): Promise<NextResponse<Status>> => {
  if (process.env.REVALIDATE_SECRET == null) {
    return jsonResponse(internalServerError);
  }

  const hmac = createHmac('sha256', process.env.REVALIDATE_SECRET);
  const body = await req.text();
  const expected = hmac.update(body).digest('hex');
  const signature = req.headers.get('X-MICROCMS-Signature') ?? '';
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return jsonResponse(unauthorized);
  }

  const { searchParams } = new URL(req.url);
  const path = decodeURIComponent(searchParams.get('path') ?? '');

  if (!path) {
    return jsonResponse(badRequest);
  }

  // Revalidate the segments recursively
  const segments = path.split('/').filter((seg) => seg.length);
  for (let i = segments.length; 0 < i; i--) {
    const target = `/${segments.slice(0, i).join('/')}`
    revalidatePath(target, 'page');
  }

  return jsonResponse(succeeded);
};
