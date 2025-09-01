import { client } from './sanity';

// Define types for our blog data
export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  author: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
    bio?: string;
  };
  thumbnail: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  tags: string[];
  categories: Array<{
    title: string;
    slug: { current: string };
  }>;
  featured: boolean;
  readTime: string;
  publishedAt: string;
  sections: Array<{
    title: string;
    content: Array<{
      _type: string;
      children?: Array<{
        _type: string;
        text: string;
        marks?: string[];
      }>;
      style?: string;
      markDefs?: Array<{
        _type: string;
        _key: string;
      }>;
      // Image type
      asset?: {
        _ref: string;
        _type: string;
        url?: string;
      };
      alt?: string;
      caption?: string;
      // Video embed type
      url?: string;
      title?: string;
      // File type
      description?: string;
      originalFilename?: string;
    }>;
  }>; // Section-based content
}

export interface SanityAuthor {
  _id: string;
  name: string;
  slug: { current: string };
  image?: {
    asset: {
      url: string;
    };
  };
  bio?: string;
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
}

// Functions to fetch data
export async function getAllPosts(): Promise<SanityPost[]> {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "author": author->{
        name,
        "image": image,
        bio
      },
      "thumbnail": thumbnail,
      tags,
      "categories": categories[]->{
        title,
        "slug": slug.current
      },
      featured,
      readTime,
      publishedAt
    }
  `;
  
  return client.fetch(query);
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  const query = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      "author": author->{
        name,
        "image": image,
        bio
      },
      "thumbnail": thumbnail,
      tags,
      "categories": categories[]->{
        title,
        "slug": slug.current
      },
      featured,
      readTime,
      publishedAt,
      sections[]{
        title,
        content[]{
          ...,
          asset->,
          "url": asset->url
        }
      }
    }`;
  
  return client.fetch(query, { slug });
}

export async function getAllAuthors(): Promise<SanityAuthor[]> {
  const query = `
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "image": image.asset->url,
      bio
    }
  `;
  
  return client.fetch(query);
}

export async function getAllCategories(): Promise<SanityCategory[]> {
  const query = `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }
  `;
  
  return client.fetch(query);
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<SanityPost[]> {
  const query = `
    *[_type == "post" && defined(publishedAt) && $tag in tags] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "author": author->{
        name,
        "image": image,
        bio
      },
      "thumbnail": thumbnail,
      tags,
      "categories": categories[]->{
        title,
        "slug": slug.current
      },
      featured,
      readTime,
      publishedAt
    }
  `;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client as any).fetch(query, { tag });
}

// Get related posts (excluding current post)
export async function getRelatedPosts(currentPostId: string, tags: string[], limit: number = 3): Promise<SanityPost[]> {
  const query = `
    *[_type == "post" && defined(publishedAt) && _id != $currentPostId && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      "slug": slug.current,
      description,
      "author": author->{
        name,
        "image": image,
        bio
      },
      "thumbnail": thumbnail,
      tags,
      "categories": categories[]->{
        title,
        "slug": slug.current
      },
      featured,
      readTime,
      publishedAt
    }
  `;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client as any).fetch(query, { currentPostId, tags, limit });
}