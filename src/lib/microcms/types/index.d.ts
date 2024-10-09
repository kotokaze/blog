import type {
  MicroCMSImage,
  MicroCMSListContent,
} from 'microcms-js-sdk';
import type { Category } from './category';
import type { Tag } from './tag';


export interface MicroCMSCustomBasicPost extends MicroCMSListContent {
  title: string;
  subtitle?: string;
  category: Category;
  description?: string;
  tags?: Tag[];
  thumbnail?: MicroCMSImage;
  related: this[];
}

export interface MicroCMSCustomField {
  fieldId: string;
}

export type {
  GetObjectData,
  GetAllContentIds,
  GetList,
  GetListDetail,
} from './client';

export type { Article } from './article';
export type { Category } from './category';
export type { Site } from './site-data';
export type { Slide } from './slide';
export type { Tag } from './tag';
