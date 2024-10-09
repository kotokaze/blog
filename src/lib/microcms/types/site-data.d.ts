import {
  type MicroCMSImage,
  type MicroCMSObjectContent,
} from 'microcms-js-sdk';
import {
  type Article as ArticleType,
  type Slide as SlideType,
  type Tag as TagType,
  type MicroCMSCustomField,
} from '.';

export interface Account extends MicroCMSCustomField {
  fieldId: 'account';
  label: string;
  icon?: string;
  url: string;
  uid?: string;
}

export interface Publisher extends MicroCMSCustomField {
  fieldId: 'author';
  name: string;
  description: string;
  thumbnail: MicroCMSImage;
  accounts: Account[];
}

export interface Article extends MicroCMSCustomField {
  fieldId: 'article';
  item: ArticleType;
}

export interface Slide extends MicroCMSCustomField {
  fieldId: 'slide';
  item: SlideType;
}

export interface Pickups extends MicroCMSCustomField {
  fieldId: 'pickups';
  items: (Article | Slide)[];
}

export interface Site extends MicroCMSObjectContent {
  title: string;
  url: string;
  repo: string;
  description: string;
  tags: TagType[];
  pickups: Pickups;
  publisher: Publisher;
}
