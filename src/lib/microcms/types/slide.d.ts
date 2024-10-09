import { MicroCMSListResponse } from 'microcms-js-sdk';
import { MicroCMSCustomBasicPost } from '.';

export interface Slide extends MicroCMSCustomBasicPost {
  filename?: string;
}

export declare type SlideListResponse = MicroCMSListResponse<Slide>;
