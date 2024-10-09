import {
  type MicroCMSCustomField,
  type MicroCMSCustomBasicPost,
} from '.';

export interface Editor extends MicroCMSCustomField {
  fieldId: 'rich' | 'rich-2' | 'html';
  value: string;
}

export interface Ad extends MicroCMSCustomField {
  fieldId: 'ad';
  value: boolean;
}

declare type Field = Editor | Ad;

export interface Article extends MicroCMSCustomBasicPost {
  fields: Field[];
}
