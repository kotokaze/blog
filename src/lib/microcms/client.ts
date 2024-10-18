import 'server-only';
import { createClient } from 'microcms-js-sdk';
import type {
  GetAllContentIds,
  GetObjectData,
  GetList,
  GetListDetail,
  Article,
  Category,
  Site,
  Slide,
  Tag,
} from './types';

const client = function () {
  const { MICROCMS_SERVICE_DOMAIN, MICROCMS_API_KEY } = process.env;

  if (!MICROCMS_SERVICE_DOMAIN) {
    throw new Error('Please define MICROCMS_SERVICE_DOMAIN');
  }

  if (!MICROCMS_API_KEY) {
    throw new Error('Please define MICROCMS_API_KEY');
  }

  return createClient({
    serviceDomain: MICROCMS_SERVICE_DOMAIN,
    apiKey: MICROCMS_API_KEY,
  });
}();

/* common api */
const _getAllIds: GetAllContentIds = async ({ ...args }) => {
  return await client.getAllContentIds({ ...args });
};

/* `site` endpoint */
export const getSiteData: GetObjectData<Site> = async ({ ...args } = {}) => {
  return await client.getObject<Site>({
    endpoint: 'site',
    ...args,
  });
};

/* `articles` endpoint */
export const getAllArticleIds: GetAllContentIds<Article> = async ({ ...args } = {}) => {
  return await _getAllIds({
    endpoint: 'articles',
    ...args,
  });
};

export const getArticleList: GetList<Article> = async ({ ...args } = {}) => {
  return await client.getList<Article>({
    endpoint: 'articles',
    ...args,
  });
};

export const getArticleBySlug: GetListDetail<Article> = async (contentId, { ...args } = {}) => {
  return await client.getListDetail<Article>({
    endpoint: 'articles',
    contentId: contentId,
    ...args,
  });
};

/* `slides` endpoint */
export const getAllSlideIds: GetAllContentIds<Slide> = async ({ ...args } = {}) => {
  return await _getAllIds({
    endpoint: 'slides',
    ...args,
  });
};

export const getSlideList: GetList<Slide> = async ({ ...args } = {}) => {
  return await client.getList<Slide>({
    endpoint: 'slides',
    ...args,
  });
};

export const getSlideBySlug: GetListDetail<Slide> = async (contentId, { ...args } = {}) => {
  return await client.getListDetail<Slide>({
    endpoint: 'slides',
    contentId: contentId,
    ...args,
  });
};

/* `categories` endpoint */
export const getAllCategoryIds: GetAllContentIds<Category> = async ({ ...args } = {}) => {
  return await _getAllIds({
    endpoint: 'categories',
    ...args,
  });
};

export const getCategoryList: GetList<Category> = async ({ ...args } = {}) => {
  return await client.getList<Category>({
    endpoint: 'categories',
    ...args,
  });
};

export const getCategoryBySlug: GetListDetail<Category> = async (contentId, { ...args } = {}) => {
  return await client.getListDetail<Category>({
    endpoint: 'categories',
    contentId: contentId,
    ...args,
  });
};

/* `tags` endpoint */
export const getAllTagIds: GetAllContentIds<Tag> = async ({ ...args } = {}) => {
  return await _getAllIds({
    endpoint: 'tags',
    ...args,
  });
};

export const getTagList: GetList<Tag> = async ({ ...args } = {}) => {
  return await client.getList<Tag>({
    endpoint: 'tags',
    ...args,
  });
};

export const getTagBySlug: GetListDetail<Tag> = async (contentId, { ...args } = {}) => {
  return await client.getListDetail<Tag>({
    endpoint: 'tags',
    contentId: contentId,
    ...args,
  });
};

export default client;
