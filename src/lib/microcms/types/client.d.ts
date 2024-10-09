import type {
  GetAllContentIdsRequest,
  GetListDetailRequest,
  GetListRequest,
  GetObjectRequest,
  MicroCMSListResponse,
  MicroCMSDate,
} from 'microcms-js-sdk';

type OmitEndpoint<T> = Omit<Readonly<T>, 'endpoint'>;

export declare type GetAllContentIds<T = null> = T extends null
  ? (args?: GetAllContentIdsRequest) => Promise<string[]>
  : (args?: OmitEndpoint<GetAllContentIdsRequest>) => Promise<string[]>;

export declare type GetObjectData<T> = (args?: OmitEndpoint<GetObjectRequest>) => Promise<T & MicroCMSDate>;

export declare type GetList<T> = (args?: OmitEndpoint<GetListRequest>) => Promise<MicroCMSListResponse<T>>;

export declare type GetListDetail<T> = (
  contentId: readonly string,
  args?: Omit<OmitEndpoint<GetListDetailRequest>, 'contentId'>,
) => Promise<T>;
