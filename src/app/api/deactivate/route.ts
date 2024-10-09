import { draftMode } from 'next/headers';
import {
  RedirectType,
  redirect,
} from 'next/navigation';
import { NextRequest } from 'next/server';

export const GET = (_: NextRequest): void => {
  draftMode().disable();
  redirect('/', RedirectType.replace);
};
