import type { ToolCategory } from "@/lib/tool-types";

export type BlogRegion = "US" | "UK" | "EU";

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogCover = {
  src: string;
  alt: string;
  credit: string;
  creditUrl: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  toolSlug: string;
  category: ToolCategory;
  regions: BlogRegion[];
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
  author: string;
  cover: BlogCover;
  sections: BlogSection[];
  takeaways: string[];
  ctaLabel: string;
  keywords: string[];
  featured?: boolean;
};

export type BlogListItem = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "excerpt"
  | "toolSlug"
  | "category"
  | "regions"
  | "readingMinutes"
  | "publishedAt"
  | "updatedAt"
  | "featured"
  | "keywords"
  | "cover"
>;

export type BlogListResponse = {
  posts: BlogListItem[];
  total: number;
  page: number;
  pageSize: number;
  categories: ToolCategory[];
};
